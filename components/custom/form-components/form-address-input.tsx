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
import { autocomplete } from '@/lib/google';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
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
  value,
  onChange,
}) => {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const debouncedInput = useDebounce(value, 500);

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
    <Command>
      <CommandInput
        placeholder="Enter your address..."
        value={value}
        onValueChange={onChange}
      />
      <CommandList>
        <CommandEmpty>Nothing to suggest...</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {predictions.map((prediction) => (
            <CommandItem
              key={prediction.place_id}
              onSelect={() => {
                onChange(prediction.description);
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
  );
};
