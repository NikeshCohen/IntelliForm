"use client";

// export const metadata = {
//   title: "IntelliForm / Edit",
// };

import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { FormField, JsonForm, Table } from "@/types";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Eye, Home, Share } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "./_components/FormUi";
import toast from "react-hot-toast";
import Controller from "./_components/Controller";
import Loading from "@/components/Loading";

function EditFormPage({ params }: { params: { formId: string } }) {
  const [jsonForm, setJsonForm] = useState<JsonForm | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateTrigger, setUpdateTrigger] = useState<number>();
  const [record, setRecord] = useState<Table | undefined>(undefined);
  const [selectedTheme, setSelectedTheme] = useState();

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
        setRecord(res[0]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setError(true);
      }

      setIsLoading(false);
    };

    user && getFromData();
  }, [user, params.formId]);

  useEffect(() => {
    const updateJsonFormInDb = async () => {
      if (!record) return;

      const res = await db
        .update(forms)
        .set({
          jsonForm: JSON.stringify(jsonForm),
        })
        .where(
          and(
            eq(forms.formId, record.formId),
            eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
          )
        );
    };

    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [
    updateTrigger,
    jsonForm,
    record,
    user?.primaryEmailAddress?.emailAddress,
  ]);

  const onFieldUpdate = (
    value: { label: string; placeholder: string },
    i: number
  ) => {
    if (jsonForm) {
      jsonForm.formFields[i].label = value.label;
      jsonForm.formFields[i].placeholder = value.placeholder;
      setUpdateTrigger(Date.now());
    }
  };

  if (isLoading) return <Loading />;

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

  const deleteField = (i: number) => {
    if (jsonForm) {
      const res = jsonForm.formFields.filter(
        (item, index) => index !== i
      ) as FormField[];
      jsonForm.formFields = res;
      toast.success("Deleted successfully");
    }

    setUpdateTrigger(Date.now());
  };

  return (
    <section className="min-h-screen ">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex gap-1 hover:text-primary"
        >
          <ArrowLeft /> Go Back
        </button>

        <div className="space-x-4">
          <Button
            className=" gap-2 justify-center items-center"
            onClick={() => router.push(`/form/${record?.formId}`)}
          >
            <Eye /> Preview
          </Button>
          <Button className="gap-2 justify-center items-center">
            <Share /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 pt-8">
        <div className="p-4">
          <h1 className="text-2xl mb-5">Customise</h1>
          <Controller />
        </div>
        <div className="lg:col-span-2 shadow-lg rounded-lg md:p-4">
          <h1 className="text-2xl text-center mb-5">
            Your <span className="font-bold text-primary">IntelliForm</span>
          </h1>
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={(i) => deleteField(i)}
          />
        </div>
      </div>
    </section>
  );
}

export default EditFormPage;
