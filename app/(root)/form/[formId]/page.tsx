"use client";

import { db } from "@/configs";
import { forms, userResponses } from "@/configs/schema";
import { JsonForm, Table } from "@/types";
import { eq, is } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

type FormRecord = {
  id: number;
  formId: string;
  jsonForm: string;
  createdBy: string;
  createdAt: string;
};

function FormPage({ params }: { params: { formId: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [jsonForm, setJsonForm] = useState<JsonForm | null>(null);
  const [record, setRecord] = useState<Table | undefined>(undefined);
  const [error, setError] = useState<boolean | null>(null);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setIsLoading(true);

    const getFormData = async () => {
      try {
        const res: FormRecord[] = await db
          .select()
          .from(forms)
          .where(eq(forms.formId, params.formId));
        if (res.length > 0) {
          setRecord(res[0]);
          setJsonForm(JSON.parse(res[0].jsonForm));
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFormData();
  }, [params.formId]);

  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    setIsSubmitting(true);
    const today = new Date();
    if (data) {
      const jsonResponse = JSON.stringify(data);

      const res = await db.insert(userResponses).values({
        jsonResponse: jsonResponse,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
        createdAt: today.toUTCString(),
        formRef: record?.id ?? 0,
      });

      if (res) {
        toast.success("Submitted successfully");
        reset();
      } else {
        toast.error("Unable to submit form");
      }
    }

    setIsSubmitting(false);
  };

  {
    isLoading && <Loading />;
  }

  return (
    <section className="min-h-[90vh] flex md:w-3/4 lg:max-w-4xl mr-auto ml-auto justify-center items-center flex-col">
      <h2 className="font-bold text-3xl text-center">{jsonForm?.formTitle}</h2>
      <p className="text-center pt-2">{jsonForm?.formSubheading}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {jsonForm &&
          jsonForm.formFields.map((field, i) => (
            <div key={i} className="pt-4 flex relative flex-col">
              <label
                htmlFor={field.fieldName}
                className={`${
                  field.input === "checkbox" && "pl-6"
                } block font-medium`}
              >
                {field.label}
              </label>

              {field.input === "input" && (
                <>
                  <Input
                    id={field.fieldName}
                    type={field.type}
                    placeholder={field.placeholder || ""}
                    className="mt-2 block w-full text-sm"
                    {...register(field.fieldName, {
                      required: !field.label.includes("optional")
                        ? `${field.label} is required`
                        : false,
                      pattern:
                        field.type === "email"
                          ? {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid email address",
                            }
                          : undefined,
                    })}
                  />
                  {errors[field.fieldName] && (
                    <span className="text-red-500 text-sm mt-1">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              {field.input === "textarea" && (
                <>
                  <Textarea
                    id={field.fieldName}
                    placeholder={field.placeholder || ""}
                    className="mt-2 block w-full text-sm border p-2 rounded"
                    {...register(field.fieldName, {
                      required: !field.label.includes("optional")
                        ? `${field.label} is required`
                        : false,
                    })}
                  />
                  {errors[field.fieldName] && (
                    <span className="text-red-500 text-sm mt-1">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              {field.input === "checkbox" && (
                <>
                  <input
                    id={field.fieldName}
                    type="checkbox"
                    className="mt-2 absolute left-0 top-[14px]"
                    {...register(field.fieldName, {
                      required: !field.label.includes("optional")
                        ? `${field.label} is required`
                        : false,
                    })}
                  />
                  {errors[field.fieldName] && (
                    <span className="text-red-500 text-sm mt-1">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              {field.input === "select" && field.options && (
                <>
                  <Select>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue
                        placeholder={field.placeholder || "Select an option"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[field.fieldName] && (
                    <span className="text-red-500 text-sm mt-1">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              <div></div>
            </div>
          ))}

        <Button type="submit" disabled={isSubmitting} className="mt-6 w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </section>
  );
}

export default FormPage;
