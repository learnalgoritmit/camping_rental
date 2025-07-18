"use client";

import * as React from "react"
import { animated } from "@react-spring/web";

// Utility to omit specific keys from an object
// function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
//   const clone = { ...obj };
//   for (const key of keys) {
//     delete clone[key];
//   }
//   return clone;
// }

const AnimatedInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => (
  <animated.input ref={ref} {...props} />
));
AnimatedInput.displayName = "Input";
export { AnimatedInput as Input };
