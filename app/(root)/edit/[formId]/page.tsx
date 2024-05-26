"use client";

// export const metadata = {
//   title: "IntelliForm / Edit",
// };

import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { JsonForm } from "@/types";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "./_components/FormUi";

function EditFormPage({ params }: { params: { formId: string } }) {
  const [jsonForm, setJsonForm] = useState<JsonForm | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const getFromData = async () => {
      setError(false);
      setIsLoading(true);

      const res = await db
        .select()
        .from(forms)
        .where(
          and(
            eq(forms.formId, params?.formId || ""),
            eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
          )
        );

      if (res.length === 0) {
        setError(true);
        setIsLoading(false);
        return;
      }

      const outerJsonForm = res[0].jsonForm;

      try {
        const formData = JSON.parse(outerJsonForm);
        setJsonForm(formData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setError(true);
      }

      setIsLoading(false);
    };

    user && getFromData();
  }, [user, params.formId]);

  if (isLoading)
    return (
      <section className="h-[80vh] flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="lg:w-16 lg:h-16 w-12 h-12 text-background animate-spin fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </section>
    );

  if (error) {
    return (
      <section className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl pb-3">
          Whoops! | You are not allowed to edit this form
        </h1>
        <Link href="/">
          <Button className="flex justify-center items-center gap-2">
            <span className="text-lg">Home</span>
            <Home />
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen ">
      <button
        onClick={() => router.back()}
        className="flex gap-1 hover:text-primary"
      >
        <ArrowLeft /> Go Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 pt-8">
        <div className="p-4">
          <h1 className="text-2xl mb-5">Customise</h1>
        </div>
        <div className="lg:col-span-2 shadow-lg rounded-lg p-4">
          <h1 className="text-2xl text-center mb-5">
            Your <span className="font-bold text-primary">IntelliForm</span>
          </h1>
          <FormUi jsonForm={jsonForm} />
        </div>
      </div>
    </section>
  );
}

export default EditFormPage;
