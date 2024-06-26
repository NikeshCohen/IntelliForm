import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { JsonForm } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FieldEdit from "./FieldEdit";

function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
}: {
  jsonForm: JsonForm | null;
  deleteField: (i: number) => void;
  onFieldUpdate: (
    value: { label: string; placeholder: string },
    index: number
  ) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
  };

  return (
    <div className="lg:max-w-[850px] mr-auto border md:p-10 p-5 rounded-lg border-gray-700 ml-auto">
      <h2 className="font-bold text-3xl text-center">{jsonForm?.formTitle}</h2>
      <p className="text-center pt-2">{jsonForm?.formSubheading}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
              <div>
                <FieldEdit
                  defaultValue={field}
                  onUpdate={(value) => onFieldUpdate(value, i)}
                  deleteField={() => deleteField(i)}
                />
              </div>
            </div>
          ))}

        <Button type="submit" className="mt-6 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FormUi;
