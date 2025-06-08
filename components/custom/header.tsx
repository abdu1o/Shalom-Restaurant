'use client'

import {cn} from '@/lib/utils'
import { Container } from './container';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton, ProfileButton } from '.';
import { Button } from '../ui';
import { User } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { useSearchParam } from 'react-use';
import { Auth } from './modals/auth';

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({hasSearch = true, hasCart = true, className }) => {

    const [openAuth, setOpenAuth] = React.useState(false);

    // const searchParams = useSearchParam();

    return (
        <header className ={cn('border border-b', className)}>
            <div>
                <Container className='flex items-center justify-between py-8'>

                    <Link href='/'>
                        <div className='flex items-center gap-4'>
                            <Image src="/logo.png" alt="Logo" width={65} height={65}/>
                            <div>
                                <h1 className="text-3xl uppercase font-black">Shalom</h1>
                            </div>
                        </div>
                    </Link>

                    {hasSearch && <div className='mx-10 flex-1'>
                        <SearchInput></SearchInput>
                    </div>}

                    <div className='flex items-center gap-3'>
                        <Auth open={openAuth} onClose={() => setOpenAuth(false)} ></Auth>

                        <ProfileButton onClickSignIn={() => setOpenAuth(true)}></ProfileButton>

                        {hasCart && <CartButton></CartButton>}
                    </div> 

                </Container>
                
            </div>
        </header>
    );
};