"use client"

import { useTransition } from '@/app/context/TransitionContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';


interface DelayedLinkProps {
    href: string;
    className: string;
    children: ReactNode;
}

const DelayedLink: React.FC<DelayedLinkProps> = ({ href, className, children }) => {
    const { isTransitioning, setIsTransitioning } = useTransition();
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => {
                router.push(href);
            }, 2000); // 2000ms = 2 seconds delay

            return () => clearTimeout(timer);
        }
    }, [isClicked, href, router]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsTransitioning(true);
        setIsClicked(true);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 3000);
    };

    return (
        <Link className={className} href={href} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default DelayedLink;
