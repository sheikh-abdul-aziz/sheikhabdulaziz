"use client";

import React from "react";
/*
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "./ui/avatar";*/
import { Button } from "./ui/button";
import {
    IconCoffee,
    IconBrandKotlin,
    IconTerminal,
    IconBrandAndroid,
    IconBrandJavascript,
    IconBrandTypescript,
    IconBrandReact,
    IconBrandTailwind,
    IconBrandNextjs,
    IconBrandVite,
} from "@tabler/icons-react";
import Link from "next/link";

export default function SkillStack() {

  //  const router = useRouter();

    //const navigateTo: (path: string) => void = (path) => router.push(path);

    const socialLinks = [
        { href: "https://www.instagram.com/shaykhabdulazeez", icon: <IconCoffee /> },
        { href: "https://www.threads.net/@shaykhabdulazeez", icon: <IconBrandKotlin /> },
        { href: "https://x.com/shekhabdulazeez", icon: <IconTerminal /> },
        { href: "https://medium.com/@sheikhabdulaziz", icon: <IconBrandAndroid /> },
    { href: "https://dribbble.com/sheikhabdulaziz", icon: <IconBrandJavascript /> },
    { href: "mailto:hello@sheikhabdulaziz.com", icon: <IconBrandTypescript /> },
        { href: "https://www.linkedin.com/in/sheikhabdulaziz", icon: <IconBrandReact /> },
        { href: "https://github.com/sheikh-abdul-aziz", icon: <IconBrandTailwind /> },
        { href: "https://www.youtube.com/@sheikhabdulaziz", icon: <IconBrandNextjs /> },
        { href: "https://www.facebook.com/sheikhabdulaziz", icon: <IconBrandVite/> }
    ];

    return (
        <div className="flex flex-col justify-start items-start gap-y-3">
            <div className="flex flex-col justify-start items-start gap-y-1">
                <h2 className="text-xl font-semibold">Skill Stack</h2>
                <p className="text-sm text-muted-foreground">Technologies I work with</p>
            </div>
            <div className="flex flex-row flex-wrap justify-start items-start gap-2">
                    {socialLinks.map(({ href, icon }) => (
                        <Link key={href} href={href}>
                            <Button variant="tonal" size="icon" radius="large">{icon}</Button>
                        </Link>
                    ))}
                </div>
        </div>
    );
}