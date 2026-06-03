"use client";

import React from "react";
import * as motion from "motion/react-client";

type MotionElement = "div" | "h1" | "h2" | "p";

type MotionWrapperProps = {
  type?: MotionElement;
  children?: React.ReactNode;
  [key: string]: unknown;
};

const MotionWrapper = React.forwardRef<unknown, MotionWrapperProps>(
  ({ type, children, ...props }, ref) => {
    const Component = (
      type === "h1" ? motion.h1 : type === "h2" ? motion.h2 : type === "p" ? motion.p : motion.div
    ) as React.ElementType;
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);

MotionWrapper.displayName = "MotionWrapper";

export default MotionWrapper;
