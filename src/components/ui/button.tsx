"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const rippleVariants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { scale: 2, opacity: 0 },
};

type Ripple = { key: number; x: number; y: number; size: number };

function Button({
  className,
  variant,
  size,
  asChild = false,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    "aria-label"?: string
  }) {
  const Comp = asChild ? Slot : motion.button
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  function createRipple(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = buttonRef.current
    if (!button) return
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const newRipple = { key: Date.now(), x, y, size }
    setRipples((prev) => [...prev, newRipple])
  }

  React.useEffect(() => {
    if (ripples.length > 0) {
      const timeout = setTimeout(() => setRipples([]), 500)
      return () => clearTimeout(timeout)
    }
  }, [ripples])

  // If not a native button, add role and tabIndex for accessibility
  const isNativeButton = !asChild

  return (
    <Comp
      data-slot="button"
      ref={buttonRef}
      className={cn(buttonVariants({ variant, size, className }), "relative overflow-hidden focus-visible:ring-4 focus-visible:ring-green-300")}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={e => {
        if (props.onClick) props.onClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)
        if (buttonRef.current) createRipple(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)
      }}
      aria-label={ariaLabel}
      {...(!isNativeButton && { role: "button", tabIndex: 0 })}
      {...Object.fromEntries(Object.entries(props).filter(([k]) => k !== "onDrag"))}
    >
      {props.children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.key}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          variants={rippleVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </Comp>
  )
}

export { Button, buttonVariants }
