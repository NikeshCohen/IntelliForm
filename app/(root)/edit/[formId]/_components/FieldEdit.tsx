"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

import { FormField } from "@/types";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

function FieldEdit({
  defaultValue,
  onUpdate,
  deleteField,
}: {
  defaultValue: FormField;
  deleteField: () => void;
  onUpdate: (value: { label: string; placeholder: string }) => void;
}) {
  const [label, setLabel] = useState<string>(defaultValue.label);
  const [placeholder, setPlaceholder] = useState<string | undefined>(
    defaultValue.placeholder || ""
  );

  return (
    <div className="flex w-full justify-end items-center gap-2 pt-1">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-4 w-4 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <h2 className="text-text">Edit Fields</h2>
          <div className="space-y-1">
            <label className="text-xs text-text">Label Name</label>
            <Input
              type="text"
              className="text-text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="space-y-1 mt-2">
            <label className="text-xs text-text">Placeholder</label>
            <Input
              type="text"
              className="text-text"
              value={placeholder || ""}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>

          <Button
            size="sm"
            className="mt-4"
            onClick={() => onUpdate({ label, placeholder: placeholder || "" })}
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="h4 w-4 text-red-400 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-950 hover:text-text">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400 hover:bg-red-500"
              onClick={() => deleteField()}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
