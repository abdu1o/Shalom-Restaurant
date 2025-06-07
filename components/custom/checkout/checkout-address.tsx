'use client';

import React, { useState } from 'react';
import { CartBlock } from './cart-block';
import { FormAddressInput } from '../form-components/form-address-input';
import { FormTextarea } from '../form-components/form-text-area';

interface Props {
    className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {

    return (
        <CartBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                
                <FormAddressInput
                    name={'address'}
                />
                <FormTextarea
                    name="comment"
                    rows={5}
                    className="text-base"
                    placeholder="Additional notes"
                />
            </div>
        </CartBlock>
    );
};
