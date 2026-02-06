import React, { ButtonHTMLAttributes, ElementType, forwardRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva("antialiased inline-flex items-center justify-center text-center gap-x-2 whitespace-nowrap rounded-md text-sm font-normal leading-none tracking-normal transition-colors duration-250 ease-in-out focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                alert: "bg-transparent text-destructive/80 hover:bg-destructive/10 hover:text-destructive active:bg-destructive/10 active:text-destructive",
                destructive: "bg-destructive text-primary-foreground hover:text-primary-foreground/90 active:text-primary-foreground/90 hover:bg-destructive/80 active:bg-destructive/80 shadow-xs",
                elevated: "bg-surface text-secondary-foreground shadow-xs hover:bg-secondary hover:text-secondary-foreground active:bg-secondary active:text-secondary-foreground",
                filled: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/90 shadow-xs ",
                linked: "bg-transparent text-primary underline-offset-4 hover:underline active:underline",
                outlined: "bg-surface text-foreground hover:bg-secondary active:bg-secondary hover:text-secondary-foreground active:text-secondary-foreground border border-border border-solid",
                text: "bg-transparent text-secondary-foreground/80 hover:bg-secondary hover:text-secondary-foreground active:bg-secondary active:text-secondary-foreground",
                tonal: "bg-accent hover:bg-accent/80 active:bg-accent/80 text-accent-foreground hover:text-accent-foreground active:text-accent-foreground",
            },
            size: {
                badge: "h-7 gap-1.5 px-3 py-1 text-xs font-display font-[700] items-center align-middle text- uppercase bg-surface/80 text-foreground/80 shadow-none",
                default: "h-8 md:h-9 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 gap-x-1.5 md:gap-x-2",
                natural: "h-9 px-4 py-2",
                small: "h-8 px-3 text-xs",
                large: "h-10 px-8",
                action: "h-8 px-2 py-2 text-xs shadow-none",
                icon: "h-8 w-8 px-2 py-2 shadow-none [&_svg]:text-muted-foreground hover:text-foreground active:text-foreground",
                social: "h-8 w-8 px-2 py-2 [&_svg]:text-muted-foreground hover:text-foreground active:text-foreground",
                wide: "h-9 w-full px-4 py-2",
            },
            radius: {
                none: "rounded-none",
                small: "rounded-sm",
                medium: "rounded-md",
                large: "rounded-lg",
                extraLarge: "rounded-xl",
                doubleExtraLarge: "rounded-2xl",
                tripleExtraLarge: "rounded-3xl",
                full: "rounded-full",
            },
            position: {
                left: "justify-start text-left",
                center: "justify-center text-center",
                right: "justify-end text-right",
            },
            motion: {
                expandIcon: 'group gap-0 relative',
                ringHover: 'transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2',
                shine: 'before:animate-shine relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat background-position_0s_ease',
                shineHover: 'relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] before:duration-1000',
                gooeyRight: 'relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-white/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%]',
                gooeyLeft: 'relative z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-white/40 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%]',
                underline: 'relative !no-underline after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300',
                hoverUnderline: 'relative !no-underline after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300',
                gradientSlideShow: 'bg-[size:400%] bg-[linear-gradient(-45deg,var(--gradient-lime),var(--gradient-ocean),var(--gradient-wine),var(--gradient-rust))] animate-gradient-flow',
            }
        },
        defaultVariants: {
            variant: "filled",
            size: "natural",
            radius: "medium",
            position: "center"
        },
    }
);

interface IconProps {
    icon: ElementType;
    iconPlacement: 'start' | 'end';
}

interface IconRefProps {
    icon?: never;
    iconPlacement?: undefined;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonIconProps>(
    ({ className, variant, size, radius, position, motion, icon: Icon, iconPlacement, asChild = false, ...props }, ref) => {
        const Element = asChild ? Slot : 'button';
        return (
            <Element className={cn(buttonVariants({ className, variant, size, radius, position, motion }))} ref={ref} {...props}>
                {Icon &&
                    iconPlacement === 'start' &&
                    (motion === 'expandIcon' ? (
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
                            <Icon />
                        </div>
                    ) : (
                        <Icon />
                    ))}
                <Slottable>{props.children}</Slottable>
                {Icon &&
                    iconPlacement === 'end' &&
                    (motion === 'expandIcon' ? (
                        <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            <Icon />
                        </div>
                    ) : (
                        <Icon />
                    ))}
            </Element>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };