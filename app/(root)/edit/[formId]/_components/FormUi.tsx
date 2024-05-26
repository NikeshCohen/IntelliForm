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

interface FormField {
  fieldName: string;
  placeholder?: string;
  type: string;
  inputType: string;
  label: string;
  options?: { value: string; label: string }[];
}

function FormUi({ jsonForm }: { jsonForm: JsonForm | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
  };

  return (
    <div className="lg:w-1/2 mr-auto border p-10 rounded-lg border-gray-700 ml-auto">
      <h2 className="font-bold text-3xl text-center">{jsonForm?.formTitle}</h2>
      <p className="text-center pt-2">{jsonForm?.formSubheading}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {jsonForm &&
          jsonForm.formFields.map((field, i) => (
            <div key={i} className="pt-4">
              <label htmlFor={field.fieldName} className="block font-medium">
                {field.label}
              </label>

              {field.inputType === "input" && (
                <>
                  <Input
                    id={field.fieldName}
                    type={field.type}
                    placeholder={field.placeholder || ""}
                    className="mt-2 block w-full text-sm"
                    {...register(field.fieldName, {
                      required: `${field.label} is required`,
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
                    <span className="text-red-500 text-sm">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              {field.inputType === "textarea" && (
                <>
                  <Textarea
                    id={field.fieldName}
                    placeholder={field.placeholder || ""}
                    className="mt-2 block w-full text-sm border p-2 rounded"
                    {...register(field.fieldName, {
                      required: `${field.label} is required`,
                    })}
                  />
                  {errors[field.fieldName] && (
                    <span className="text-red-500 text-sm">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              {field.inputType === "checkbox" && (
                <>
                  <input
                    id={field.fieldName}
                    type="checkbox"
                    className="mt-2"
                    {...register(field.fieldName, {
                      required: `${field.label} is required`,
                    })}
                  />
                  {errors[field.fieldName] && (
                    <span className="text-red-500 text-sm">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
              {field.inputType === "select" && field.options && (
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
                    <span className="text-red-500 text-sm">
                      {String(errors[field.fieldName]?.message)}
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormUi;
