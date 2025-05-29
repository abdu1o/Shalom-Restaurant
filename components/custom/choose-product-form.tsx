import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    description?: string | null;
    className?: string;
    classNameImg?: string;
    loading?: boolean;
    onSubmit?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({ imageUrl, name, description, className, classNameImg, price, loading, onSubmit }) => {
    return (
        <div className={cn('flex flex-1 gap-10')}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img src={imageUrl} alt={name} className={cn(classNameImg, "relativetop-1 z-10 transition-all duration-300 rounded-4xl")}></img>
            </div>

            <div className={cn(className, "bg-white p-7 shrink-0")}>
                <Title text={name} size='md' className='font-extrabold mb-1'></Title>

                <p className="mt-4 text-gray-500">{description}</p>

                <Button loading={loading} onClick={onSubmit} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
                    {`Add for $${price}`}
                </Button>
            </div>
        </div>
    );
    
};