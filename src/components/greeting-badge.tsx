"use client";

import React, { useEffect, useState } from "react";
import {
    IconSunFilled,
    IconCloudFilled,
    IconMoonFilled
} from "@tabler/icons-react";

export default function GreetingBadge() {

    const [greeting, setGreeting] = useState("Hi, Good Morning!");
    const [GreetingIcon, setGreetingIcon] = useState(() => IconSunFilled);
    const [iconClass, setIconClass] = useState("text-yellow-500");
    const [timeString, setTimeString] = useState("6:00 AM");

    useEffect(() => {
        const updateTimeAndGreeting = () => {
            const date = new Date();
            const hour24 = date.getHours();
            let hour12 = hour24 % 12;
            hour12 = hour12 === 0 ? 12 : hour12;
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const ampm = hour24 >= 12 ? "PM" : "AM";

            if (hour24 >= 4 && hour24 < 6) {
                setGreeting("Hi, Good Dawn!");
                setGreetingIcon(IconSunFilled);
                setIconClass("text-orange-400");
            } else if (hour24 >= 6 && hour24 < 12) {
                setGreeting("Hi, Good Morning!");
                setGreetingIcon(() => IconSunFilled);
                setIconClass("text-yellow-500");
            } else if (hour24 >= 12 && hour24 < 16) {
                setGreeting("Hi, Good Noon!");
                setGreetingIcon(IconCloudFilled);
                setIconClass("text-blue-400");
            } else if (hour24 >= 16 && hour24 < 18) {
                setGreeting("Hi, Good Afternoon!");
                setGreetingIcon(() => IconCloudFilled);
                setIconClass("text-blue-500");
            } else if (hour24 >= 18 && hour24 < 20) {
                setGreeting("Hi, Good Evening!");
                setGreetingIcon(IconMoonFilled);
                setIconClass("text-purple-400");
            } else if (hour24 >= 20 && hour24 < 24) {
                setGreeting("Hi, Good Night!");
                setGreetingIcon(IconMoonFilled);
                setIconClass("text-purple-500");
            } else {
                setGreeting("Hi, Good Late Night!");
                setGreetingIcon(() => IconMoonFilled);
                setIconClass("text-gray-400");
            }

            setTimeString(`${hour12}:${minutes} ${ampm}`);
        };

        updateTimeAndGreeting(); // Initial call
        const interval = setInterval(updateTimeAndGreeting, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="flex flex-row justify-start items-center gap-x-2 border border-border px-2 py-1.5 bg-muted/30 hover:bg-muted rounded-full">
            <GreetingIcon size={16} className={iconClass} />
            <h6 className="text-xs font-medium text-foreground hover:text-muted-foreground">{greeting} <span className="text-xs font-normal text-muted-foreground">({timeString})</span></h6>
        </div>
    );
}