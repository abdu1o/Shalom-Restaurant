import { useSession } from "next-auth/react";
import React from "react";
import { CartButton } from "./cart-button";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {

    const {data: session} = useSession();

    return (
        <div className={className}>
            {
                !session ? (
                <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
                    <User size={18}/>
                    Log in
                </Button> ) : (
                
                <Link href="/profile">
                    <Button variant="outline" className="flex items-center gap-2">
                        <CircleUser size={18}></CircleUser>
                        Profile
                    </Button>
                </Link>
            )}
        </div>
    );
};
