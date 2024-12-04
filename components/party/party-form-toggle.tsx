import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

type FormToggleProps<T extends FieldValues> = React.ComponentPropsWithRef<"button"> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    isPending?: boolean;
    description: string;
};

export const PartyFormToggle = <T extends FieldValues>(props: FormToggleProps<T>) => {
    const { control, name, label, description, isPending, ...rest } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="grid grid-cols-4 auto-rows-[0.1fr] items-center gap-x-2 ">

                    <FormLabel className="text-left col-span-4 ">
                        {label}
                    </FormLabel>


                    <div className="flex col-start-1  col-span-4 flex-row items-center justify-between rounded-md border p-2 gap-x-4">
                        <FormDescription>{description}</FormDescription>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isPending}
                                {...rest}
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    );
};
