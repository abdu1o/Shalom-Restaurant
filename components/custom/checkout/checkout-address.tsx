'use client';

import React, { useState } from 'react';
import { CartBlock } from './cart-block';
import { Textarea } from '@/components/ui/textarea';
import { FormAddressInput } from '../form-components/form-address-input';

interface Props {
    className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
    const [address, setAddress] = useState<string>('');

    return (
        <CartBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                
                <FormAddressInput
                    value={address}
                    onChange={setAddress}
                />
                <Textarea
                    rows={5}
                    className="text-base"
                    placeholder="Additional notes"
                />
            </div>
        </CartBlock>
    );
};
