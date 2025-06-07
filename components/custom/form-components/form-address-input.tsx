'use client';

import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { autocomplete } from '@/app/actions';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import { useFormContext } from 'react-hook-form';

interface AddressInputProps {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export const FormAddressInput: React.FC<AddressInputProps> = ({
  className,
  name,
  label,
  required,
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name) || '';
  const debouncedInput = useDebounce(value, 500);
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const errorText = errors[name]?.message as string;

  useEffect(() => {
    if (!debouncedInput) {
      setPredictions([]);
      return;
    }

    const fetchPredictions = async () => {
      const predictions = await autocomplete(debouncedInput);
      setPredictions(predictions ?? []);
    };

    fetchPredictions();
  }, [debouncedInput]);

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <Command>
        <CommandInput
          placeholder="Enter your address..."
          value={value}
          onValueChange={(val) => setValue(name, val, { shouldValidate: true })}
        />
        <CommandList>
          <CommandEmpty>Nothing to suggest...</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {predictions.map((prediction) => (
              <CommandItem
                key={prediction.place_id}
                onSelect={() => {
                  setValue(name, prediction.description, { shouldValidate: true });
                  setPredictions([]);
                }}
                className="cursor-pointer"
              >
                {prediction.description}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
