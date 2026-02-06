"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    IconDevices,
    IconMoonStars,
    IconSun
} from "@tabler/icons-react";

export function ThemeChanger() {

    const { setTheme, resolvedTheme, theme } = useTheme();

    useEffect(() => {
        const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
        if (savedTheme && savedTheme !== theme) {
            setTheme(savedTheme);
        }
    }, [setTheme, theme]);

    const [Icon, setIcon] = useState(() => IconDevices);

    useEffect(() => {
        if (resolvedTheme === "light" && theme !== "system") {
            setIcon(() => IconSun);
        } else if (resolvedTheme === "dark" && theme !== "system") {
            setIcon(() => IconMoonStars);
        } else if (theme === "system") {
            setIcon(() => IconDevices);
        } else {
            setIcon(() => IconDevices);
        }
    }, [resolvedTheme, theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outlined" size="icon" radius="large">
                    <Icon />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" defaultValue={theme}>
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    aria-label="Light Theme"
                    aria-checked={resolvedTheme === "light" && theme !== "system"}
                    className={resolvedTheme === "light" && theme !== "system" ? "font-medium bg-muted/70 text-foreground" : ""}>
                    <IconSun className="mr-2 h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    aria-label="Dark Theme"
                    aria-checked={resolvedTheme === "dark" && theme !== "system"}
                    className={resolvedTheme === "dark" && theme !== "system" ? "font-medium bg-muted/70 text-foreground" : ""}>
                    <IconMoonStars className="mr-2 h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    aria-label="System Theme"
                    aria-checked={theme === "system"}
                    className={theme === "system" ? "font-medium bg-muted/70 text-foreground" : ""}>
                    <IconDevices className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}