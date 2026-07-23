"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  embedded?: boolean;
  children: React.ReactNode;
};
  const sizes = {
    sm: "max-w-xl p-14",
    md: "max-w-4xl p-16",
    lg: "max-w-6xl px-20 py-16",
  };

  export default function CeremonyLayout({
    title,
    subtitle,
    size = "md",
    embedded = false,
    children,
  }: Props) {
    const content = (
      <>
        <div className="divider mb-8" />
    
        <h1 className="display text-4xl text-center text-[var(--text)]">
          {title}
        </h1>
    
        {subtitle && (
          <p className="mt-3 body-ui text-center text-white/60">
            {subtitle}
          </p>
        )}
    
        <div className="divider" />
    
        {children}
      </>
    );
    
    if (embedded) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-4xl"
        >
          {content}
        </motion.div>
      );
    }
    
    return (
      <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">
    
        {/* copper glow */}
        <div className="absolute left-[-250px] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.05] blur-[180px]" />
    
        {/* Statue */}
        <img
          src="/statue.png"
          alt=""
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            h-[95vh]
            opacity-[0.08]
            select-none
          "
        />
    
        <div className="relative flex min-h-screen items-center justify-center px-8">
    
          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className={`panel w-full ${sizes[size]}`}
          >
            {content}
          </motion.div>
    
        </div>
    
      </div>
    );
  
}