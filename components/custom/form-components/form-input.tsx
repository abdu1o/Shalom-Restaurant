'use client';

import { Input } from "@/components/ui";
import { ClearButton, ErrorText } from "..";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, ...props }) => {

    const {
        register, 
        formState: {errors},
        watch,
        setValue
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true});
    }

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </p>
            )}

            <div className="relative">
                <Input className="h-12 text-md" {...register(name)} {...props}></Input>

                {value && <ClearButton onClick={onClickClear}></ClearButton>}
            </div>

            {errorText && <ErrorText text={errorText}></ErrorText>}
        </div>
    );
}