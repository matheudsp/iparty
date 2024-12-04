import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type FormTextareaProps<T extends FieldValues> = React.ComponentPropsWithRef<"input"> & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isPending?: boolean;
  
};

export const FormTextarea = <T extends FieldValues>(props: FormTextareaProps<T>) => {
  const { control, name, label, isPending, disabled, ...rest } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="grid grid-cols-4 auto-rows-[0.1fr] justify-center  items-center gap-x-2 ">
          <FormLabel className="text-left col-span-4  ">{label}</FormLabel>

          <FormControl className="flex-col col-span-4 ">
            <>

              <Textarea
                {...field}
                {...rest}
                className={`${cn(fieldState.error && "border-red-500")} col-span-4  `}
                disabled={isPending || disabled}
              />



              <FormMessage className="text-xs col-span-4" />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
