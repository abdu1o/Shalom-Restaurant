import React from 'react';
import { CartBlock } from './cart-block';
import { FormInput } from '../form-components/form-input';

interface Props {
    className?: string;
}

export const CheckoutInfo: React.FC<Props> = ({ className }) => {
    return (
        <CartBlock title="2. Personal info" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput name='firstName' className="text-base" placeholder="First name"></FormInput>
                <FormInput name='lastName' className="text-base" placeholder="Last name"></FormInput>
                <FormInput name='email' className="text-base" placeholder="Email"></FormInput>
                <FormInput name='phone' className="text-base" placeholder="Phone number"></FormInput>
            </div>
        </CartBlock>
    );
};
