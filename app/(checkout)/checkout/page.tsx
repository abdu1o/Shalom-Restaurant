import { Container, Title } from "@/components/custom";
import { CartBlock } from "@/components/custom/checkout/cart-block";
import { Input } from "@/components/ui";

export default function CheckoutPage() {
    return (
        <Container className="mt-10">
            <Title text='Checkout' className='font-extrabold mb-8 text-[36px]'></Title>

            <CartBlock title="Order summary">12312321</CartBlock>

            <CartBlock title="Personal info"></CartBlock>

            <div className="grid grid-cols-2 gap-5">
                <Input name='firstName' className="text-base" placeholder="First name"></Input>
                <Input name='lastName' className="text-base" placeholder="Last name"></Input>
                <Input name='email' className="text-base" placeholder="Email"></Input>
                <Input name='phone' className="text-base" placeholder="Phone number"></Input>
            </div>
        </Container>
    );
}