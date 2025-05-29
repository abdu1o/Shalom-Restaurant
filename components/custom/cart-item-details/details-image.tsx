import { cn } from '@/lib/utils';

interface Props {
    src: string;
    className?: string;
}

export const DetailsImage: React.FC<Props> = ({ src, className }) => {
    return <img className={cn('w-[70px] h-[70px] rounded-[15px]', className)} src={src} />;
};