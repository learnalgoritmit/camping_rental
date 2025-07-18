"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Utility to omit specific keys from an object
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const clone = { ...obj };
  for (const key of keys) {
    delete clone[key];
  }
  return clone;
}

const MotionInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false)
    return (
      <motion.input
        type={props.type}
        data-slot="input"
        ref={ref}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        onFocus={e => {
          setFocused(true)
          if (props.onFocus) props.onFocus(e)
        }}
        onBlur={e => {
          setFocused(false)
          if (props.onBlur) props.onBlur(e)
        }}
        animate={focused ? { scale: 1.03, boxShadow: "0 0 0 2px #4ade80" } : { scale: 1, boxShadow: "none" }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...omit(props, [
          "onDrag", "onDragStart", "onDragEnd", "onDragOver", "onDragEnter", "onDragLeave", "onDrop",
          "onAnimationStart", "onAnimationEnd", "onTransitionEnd"
        ])}
      />
    )
  }
)
MotionInput.displayName = "Input"

export { MotionInput as Input }
