"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "./ui/avatar";
import { Button } from "./ui/button";
import {
    IconBrandInstagram,
    IconBrandThreads,
    IconBrandX,
    IconBrandMedium,
    IconMail,
    IconBrandDribbble,
    IconSparkles,
    IconChevronRight
} from "@tabler/icons-react";
import Link from "next/link";

export default function Hero() {

    const router = useRouter();

    const navigateTo: (path: string) => void = (path) => router.push(path);

    const socialLinks = [
        { href: "https://www.instagram.com/shaykhabdulazeez", icon: <IconBrandInstagram /> },
        { href: "https://www.threads.net/@shaykhabdulazeez", icon: <IconBrandThreads /> },
        { href: "https://x.com/shekhabdulazeez", icon: <IconBrandX /> },
        { href: "https://medium.com/@sheikhabdulaziz", icon: <IconBrandMedium /> },
        { href: "https://dribbble.com/sheikhabdulaziz", icon: <IconBrandDribbble /> },
        { href: "mailto:hello@entrepreneuraziz.com", icon: <IconMail /> }
    ];

    return (
        <div className="w-full h-auto px-6 py-8 bg-surface text-foreground rounded-b-2xl">
            <div className="flex flex-col justify-start items-start mt-24">
                <div className="flex flex-col justify-start items-start">
                    <div className="flex flex-col justify-start items-start gap-y-2">
                        <div className="flex flex-row justify-start items-center gap-x-4">
                            <Avatar className="w-18 h-18 border border-border rounded-xl">
                                <AvatarImage src="https://github.com/sheikh-abdul-aziz.png" />
                                <AvatarFallback>SA</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-start items-start gap-x-4">
                                <h2 className="text-3xl font-bold">Sheikh Abdul Aziz</h2>
                                <h3 className="text-sm text-muted-foreground">Frontend Developer & UI/UX Designer</h3>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-x-4">
                            <p className="text-sm text-foreground">Say Hello on:</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {socialLinks.map(({ href, icon }) => (
                                    <Link key={href} href={href}>
                                        <Button variant="outlined" size="social" radius="full" className="text-muted-foreground hover:text-foreground">{icon}</Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-lg">
                            Hi, I&apos;m Sheikh Abdul Aziz — An Entrepreneur, Frontend Developer & UI/UX Designer — helping businesses grow with elegant design and powerful development.
                        </p>

                        <div className="flex flex-row justify-start items-center gap-x-4">
                            <Button onClick={() => navigateTo("/shop")} variant="filled" size="default" radius="large">
                                <IconSparkles /> Let&apos;s Explore
                            </Button>
                            <Button onClick={() => navigateTo("/about")} variant="tonal" size="default" radius="large">
                                Learn More <IconChevronRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}