'use client';

import {cn} from '@/lib/utils'
import React from 'react';
import { Search } from 'lucide-react';
import {useClickAway} from 'react-use';
import Link from 'next/link';

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [focused, setFocused] = React.useState(false);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        console.log(focused);
        setFocused(false);
    });

    return (
        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'> </div>}

                <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative bg-white h-11 border-2 border-primary z-30', className)}>

                    <Search className='absolut top-1/2 translate-y-[50%] left-5 h-5 ml-2 text-primary'></Search>
                    <input className='w-full outline-none pl-3'
                            type='text'
                            placeholder='Search'
                            onFocus={() => setFocused(true)}>
                    </input>

                    <div className={cn(
                        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12'
                    )}>
                        <Link href='' className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10">
                            <img className="rounded-sm h-8 w-8" src='https://static.wixstatic.com/media/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg/v1/fill/w_138,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a7c3_3bc1bc5093b74723ae95c92662f3106f~mv2.jpg' alt='qwe' />
                            <span className='hover:text-primary'>
                                No, I'm not ashamed
                            </span>
                        </Link>
                    </div>
                </div>
        </>
    );
};