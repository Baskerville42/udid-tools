"use client";

import React from "react";
import * as motion from "motion/react-client";

type MotionElement = "div" | "h1" | "h2" | "p";

type MotionWrapperProps = {
  type?: MotionElement;
  children?: React.ReactNode;
  ref?: React.Ref<unknown>;
  [key: string]: unknown;
};

function MotionWrapper({ type, children, ref, ...props }: MotionWrapperProps) {
  const Component = (
    type === "h1" ? motion.h1 : type === "h2" ? motion.h2 : type === "p" ? motion.p : motion.div
  ) as React.ElementType;

  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
}

export default MotionWrapper;
