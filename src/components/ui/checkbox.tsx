"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion';

function Checkbox({
  className,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { "aria-label"?: string }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      role="checkbox"
      aria-label={ariaLabel}
      aria-checked={
        props.checked === "indeterminate"
          ? "mixed"
          : typeof props.checked === "boolean"
            ? props.checked
            : undefined
      }
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        asChild
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: props.checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
