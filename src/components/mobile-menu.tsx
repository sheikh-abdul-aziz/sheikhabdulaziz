"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "./theme-switcher";
import { motion } from "motion/react";
import { IconAdjustments, IconComponents, IconLayoutGrid, IconShape } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { MobileNavigation } from "./mobile-navigation";
import { Label } from "./ui/label";

const data = {
    user: {
        name: "Entrepreneur Aziz",
        title: "Entrepreneur | Developer | Designer",
        description: "I am a passionate entrepreneur, developer, and designer with a keen interest in creating innovative solutions that make a difference.",
        website: "https://entrepreneuraziz.com",
        github: "https://girhub.com/sheikh-abdul-aziz",
        x: "https://x.com/@ShekhAbdulAzeez",
        dribbble: "#",
        behance: "#",
        instagram: "https://www.instagram.com/shaykhabdulazeez/",
        email: "info@entrepreneuraziz.com",
        avatar: "htpps://github.com/sheikh-abdul-aziz.png",
        avatarFallback: "SA",
        avatarAlt: "Entrepreneur Aziz",
    },
    navigationMenu: [
        {
            title: "Home",
            url: "#"
        },
        {
            title: "About",
            url: "#"
        },
        {
            title: "Porjects",
            url: "#"
        },
    ],
    projectsMenu: [
        {
            title: "All Projects",
            url: "#",
            icon: IconLayoutGrid,
            isActive: false,
            items: [
                {
                    title: "Web designs",
                    url: "#",
                },
                {
                    title: "Mobile designs",
                    url: "#",
                },
                {
                    title: "Web development",
                    url: "#",
                },
            ],
        },
        {
            title: "Icons",
            url: "#",
            icon: IconShape,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Sections",
            url: "#",
            icon: IconComponents,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: IconAdjustments,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ]
}

export default function MobileMenu() {
    const router = useRouter();
    
    const navigateTo = (path: string) => router.push(path);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <Button variant="outlined" size="icon" className="flex flex-col items-center justify-center text-muted-foreground p-[8px] gap-1.5 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary" onClick={() => {setIsOpen(!isOpen); toggleDrawer();}}>
                <motion.span className="block w-full h-0.5 bg-foreground rounded-md" animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }} transition={{ duration: 0.1 }}/>
                <motion.span className="block w-full h-0.5 bg-foreground rounded-md" animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }} transition={{ duration: 0.1 }}/>
            </Button>
            <motion.div className="flex flex-col fixed z-20 left-0 right-0 top-16 bottom-0 h-[100dvh] w-screen bg-background text-foreground px-4 py-6 gap-y-3 overflow-y-auto" initial={{ x: "-100%" }} animate={{ x: isOpen ? "0%" : "-100%" }} transition={{ duration: 0 }}>
                <div className="flex flex-col items-center justify-between gap-y-4">
                    <Button onClick={() => navigateTo("/signup")} variant="filled" size="wide" align="center">
                        Signup
                    </Button>
                    <Button onClick={() => navigateTo("/login")} variant="outlined" size="wide" align="center">
                        Login
                    </Button>
                </div>
                <Label className="text-xs font-medium normal text-muted-foreground">Preferences</Label>
                <div className="flex flex-col pl-2 gap-x-2 gap-y-3">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start gap-x-2">
                            <Label className="text-sm font-normal normal">Theme</Label>
                        </div>
                        <ThemeSwitcher />
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start gap-x-2">
                            <Label className="text-sm font-normal normal">Dashboard</Label>
                        </div>
                        <Avatar className="w-8 h-8 border border-border rounded-full">
                            <AvatarImage src="https://github.com/sheikh-abdul-aziz.png" />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <Separator orientation="horizontal" />
                <div className="flex flex-col">
                    <MobileNavigation itemFirst={data.navigationMenu} itemSecond={data.projectsMenu} />
                </div>
            </motion.div>
        </>
    );
}