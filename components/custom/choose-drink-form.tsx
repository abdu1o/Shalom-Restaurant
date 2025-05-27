import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui";
import { VariantSelector, Title } from ".";

interface Props {
    imageUrl: string;
    name: string;
    description?: string | null;
    className?: string;
    items: any[];
    onClickAdd?: VoidFunction;
}

export const ChooseDrinkForm: React.FC<Props> = ({ imageUrl, name, description, className, items, onClickAdd }) => {

    const [size, setSize] = React.useState<string>(items.length > 0 ? "1" : "");
    const selectedItem = items[Number(size) - 1];

    return (
        <div className={cn(className, 'flex flex-1')}>
            <div className="flex items-center jistify-center flex-1 relative w-full">
                <img src={imageUrl} alt={name} className="relative left-10 top-1 z-10 transition-all w-[300px] h-[300px] duration-300 rounded-4xl"></img>
            </div>

            <div className="w-[300px] bg-white p-7">
                <Title text={name} size='md' className='font-extrabold mb-1'></Title>

                <p className="mt-4 text-gray-500">{description}</p>

                <VariantSelector
                    items={items.map((item, index) => ({
                        name: `${item.size}ml`,
                        value: String(index + 1),
                    }))}
                    selectedValue={size} onClick={setSize}>
                </VariantSelector>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
                    {`Add for $${selectedItem.price}`}
                </Button>
            </div>
        </div>
    );
    
};