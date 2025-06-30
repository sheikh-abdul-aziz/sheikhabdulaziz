"use client"

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDevices, IconMoonStars, IconSun } from "@tabler/icons-react";

// ThemeChanger component provides a dropdown for switching between light, dark, and system themes.
export function ThemeChanger() {
    // Destructure theme management functions and values from next-themes.
    const { setTheme, resolvedTheme, theme } = useTheme()

    // Returns the appropriate icon based on the current theme.
    const getIcon = () => {
        if (theme === "system") return <IconDevices className="h-[1.2rem] w-[1.2rem]" />
        if (resolvedTheme === "dark") return <IconMoonStars className="h-[1.2rem] w-[1.2rem]" />
        return <IconSun className="h-[1.2rem] w-[1.2rem]" />
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outlined" size="icon">
                    {getIcon()}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    aria-label="Light Theme"
                    aria-checked={resolvedTheme === "light" && theme !== "system"}
                    className={
                        resolvedTheme === "light" && theme !== "system"
                            ? "font-medium bg-muted/70 text-foreground"
                            : ""
                    }
                >
                    <IconSun className="mr-2 h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    aria-label="Dark Theme"
                    aria-checked={resolvedTheme === "dark" && theme !== "system"}
                    className={
                        resolvedTheme === "dark" && theme !== "system"
                            ? "font-medium bg-muted/70 text-foreground"
                            : ""
                    }
                >
                    <IconMoonStars className="mr-2 h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    aria-label="System Theme"
                    aria-checked={theme === "system"}
                    className={
                        theme === "system"
                            ? "font-medium bg-muted/70 text-foreground"
                            : ""
                    }
                >
                    <IconDevices className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}