import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center text-center align-middle gap-x-2 whitespace-nowrap rounded-md text-sm font-normal font-label leading-none tracking-normal ransition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/80",
                elevated: "bg-surface text-secondary-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
                filled: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
                linked: "bg-transparent text-primary underline-offset-4 hover:underline",
                outlined: "border border-border bg-surface text-foreground shadow-none hover:bg-accent hover:text-accent-foreground",
                text: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
                tonal: "bg-secondary/80 text-secondary-foreground shadow-none hover:bg-secondary",
            },
            size: {
                badge: "h-7 gap-1.5 px-3 py-1 text-sm font-medium uppercase text-foreground/80 shadow-none",
                default: "h-8 md:h-9 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 gap-x-1.5 md:gap-x-2",
                natural: "h-9 px-4 py-2",
                small: "h-8 px-3 text-xs",
                large: "h-10 px-8",
                action: "h-8 px-2 py-2 text-xs shadow-none",
                icon: "h-8 w-8 px-2 py-2 shadow-none text-muted-foreground",
                social: "h-8 w-8 px-2 py-2",
                wide: "h-9 w-full px-4 py-2",
            },
            radius: {
                none: "rounded-none",
                small: "rounded-sm",
                medium: "rounded-md",
                large: "rounded-lg",
                full: "rounded-full",
            },
            align: {
                left: "justify-start text-left",
                center: "justify-center text-center",
                right: "justify-end text-right",
            },
        },
        defaultVariants: {
            variant: "filled",
            size: "natural",
            radius: "medium",
            align: "center"
        },
    }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, radius, align, asChild = false, ...props }, ref) => {
        const Element = asChild ? Slot : "button"
        return (
            <Element className={cn(buttonVariants({ className, variant, size, radius, align }))} ref={ref} {...props}/>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }