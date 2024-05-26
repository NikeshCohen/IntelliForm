"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs";
import { session } from "@/configs/aiModel";
import { forms } from "@/configs/schema";
import { randomId } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function NewForm({ sideBar }: { sideBar: boolean }) {
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();
  const { user } = useUser();

  const setTestPrompt = () => {
    setUserInput(
      "Create a registration form for a tech conference. The form should include fields for the attendee's full name, email address, phone number, job title, company name, dietary restrictions, and a checkbox for agreeing to the terms and conditions"
    );
  };

  const handleSubmitForm = async () => {
    if ((userInput && userInput?.length < 20) || userInput === "") {
      setError("Please provide a prompt longer then 20 characters");
      return;
    }

    setError(null);
    setIsLoading(true);

    const prompt = `${userInput} Please provide the form in JSON format with the following fields: formTitle, fliedType, formType formSubheading, formFields (each containing fieldName, type (ie. text, email), placeholder, the type of input(ie. input, textarea, checkbox) and label). 
    
    Follow these typescript types export interface FormField {
      fieldName: string;
      placeholder: string | null;
      type: string;
      input: string; // 'input', 'textarea', 'checkbox', 'select', etc.
      label: string;
      options?: Array<{ value: string; label: string }>; // Optional for select fields
    }
    
    export interface JsonForm {
      formId: string;
      formTitle: string;
      formSubheading: string;
      formFields: FormField[];
    }`;
    const formData = await session.sendMessage(prompt);

    if (formData.response.text()) {
      const today = new Date();
      const res = await db
        .insert(forms)
        .values({
          formId: randomId(),
          jsonForm: formData.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress ?? "unknown",
          createdAt: today.toUTCString(),
        })
        .returning({ formId: forms.formId });
      if (res[0].formId) {
        route.push(`/edit/${res[0].formId}`);
      } else {
        setError("Unable to generate form. Please try again");
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${sideBar && "w-[220px]"}`}>New Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New AI Form</DialogTitle>
          <DialogDescription>
            Easily generate a custom form with our AI-powered tool. Provide a
            prompt, and IntelliForm will handle the rest.
            <button
              onClick={setTestPrompt}
              className="text-primary pl-1 underline"
            >
              Example prompt.
            </button>
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Type your prompt here..."
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button
          onClick={handleSubmitForm}
          disabled={isLoading}
          className="w-1/3 ml-auto"
        >
          {isLoading ? "Generating..." : "Generate Form"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default NewForm;
