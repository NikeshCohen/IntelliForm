"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { JsonForm } from "@/types";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { Edit, Share, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormRecord = {
  id: number;
  formId: string;
  jsonForm: JsonForm;
  createdBy: string;
  createdAt: string;
};

function FormList() {
  const [formList, setFormList] = useState<FormRecord[] | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState<number>(0);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getFormList = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        const res = await db
          .select()
          .from(forms)
          .where(eq(forms.createdBy, user.primaryEmailAddress.emailAddress))
          .orderBy(desc(forms.id));

        const parsedRes: FormRecord[] = res.map((form) => ({
          ...form,
          jsonForm: JSON.parse(form.jsonForm),
        }));

        setFormList(parsedRes);
        console.log(parsedRes);
      }
    };

    getFormList();
  }, [user, updateTrigger]);

  const deleteForm = async (id: number) => {
    try {
      await db.delete(forms).where(eq(forms.id, id));

      toast.success("Deleted successfully");
      setUpdateTrigger(Date.now());
    } catch (error) {
      toast.error("Failed to delete form");
      console.error("Failed to delete form:", error);
    }
  };

  return (
    <>
      {formList ? (
        <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
          {formList.map((item) => (
            <div
              key={item.id}
              className="border border-gray-600 shadow-gray-600 shadow-md rounded-lg p-4 flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-center gap-2">
                  <h3 className="font-bold">{item.jsonForm.formTitle}</h3>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash className="h-4 w-4 text-red-400 cursor-pointer" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your form and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-gray-950 hover:text-text">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-400 hover:bg-red-500"
                          onClick={() => deleteForm(item.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <p className="pt-2">{item.jsonForm.formSubheading}</p>
              </div>

              <div className="mt-2">
                <hr className="border-gray-700 " />
              </div>

              <div className="pt-4">
                <Button
                  className="flex justify-center items-center gap-2"
                  onClick={() => router.push(`/edit/${item.formId}`)}
                >
                  <Edit className="h-5 w-5" /> Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default FormList;
