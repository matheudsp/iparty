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
        <FormItem className="grid grid-cols-4 items-center gap-x-4">
          <FormLabel className="text-right col-span-1">{label}</FormLabel>

          <FormControl className="flex-col flex">
            <>
              <Input
                {...field}
                {...rest}
                className={`${cn(fieldState.error && "border-red-500")} col-span-3`}
                disabled={isPending || disabled}
              />
              <FormMessage className="text-xs col-span-3 col-start-2 " />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
