"use client";

import { motion } from "framer-motion";
import React from "react";

const Transition = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

export default Transition;
