import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = React.ComponentPropsWithRef<"input"> & {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isPending?: boolean;
};

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { control, name, label, isPending, disabled, ...rest } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="grid grid-cols-4 auto-rows-[0.1fr] md:auto-rows-[min-content] justify-center  items-center gap-x-2 ">
          <FormLabel className="text-left md:text-right col-span-4 md:col-span-1 ">{label}</FormLabel>

          <FormControl className="flex-col col-span-4 md:col-span-3">
            <>
              <Input
                {...field}
                {...rest}
                className={`${cn(fieldState.error && "border-red-500")} col-span-4 md:col-span-3 `}
                disabled={isPending || disabled}
              />
              
              <FormMessage className="text-xs col-span-4 md:col-span-3 md:col-start-2" />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
