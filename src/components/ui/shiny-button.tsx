"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, type AnimationProps } from "motion/react";
import React from "react";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
} as AnimationProps;

interface ShinyButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
    children: React.ReactNode;
    className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <motion.button ref={ref} className={cn("inline-flex items-center justify-center text-center align-middle border border-border bg-background rounded-full shadow-none hover:bg-accent hover:text-accent-foreground h-7 gap-2 px-3 py-1 transition-shadow duration-300 ease-in-out", className )}
            style={{ overflow: "hidden" }}
                {...animationProps}
                {...props}>
                <span className="flex items-center justify-center align-middle text-center gap-1 text-sm uppercase tracking-wide text-foreground/80 font-semibold"
                    style={{ maskImage: "linear-gradient(-75deg, var(--primary) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary) calc(var(--x) + 100%))",}}>
                    {children}
                </span>
                <span style={{ mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))", maskComposite: "exclude",}}
                    className="inset-0 block rounded-[inherit] bg-[linear-gradient(-75deg,var(--primary)/10%_calc(var(--x)+20%),var(--primary)/50%_calc(var(--x)+25%),var(--primary)/10%_calc(var(--x)+100%))] p-px">
                </span>  
            </motion.button>
        );
    }
);

ShinyButton.displayName = "ShinyButton";