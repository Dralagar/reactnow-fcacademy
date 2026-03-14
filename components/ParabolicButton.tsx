// components/ParabolicButton.tsx
"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface SharedParabolicButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "children"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragExit"
  | "onDrop"
>;

type ParabolicButtonProps = SharedParabolicButtonProps & NativeButtonProps;

const iconVariants: Variants = {
  rest: { x: 0, opacity: 1 },
  hoverLeft: {
    x: -2,
    opacity: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  hoverRight: {
    x: 2,
    opacity: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const baseClasses =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-semibold tracking-tight outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:focus-visible:ring-offset-slate-950";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-sky-600 bg-sky-600 text-white shadow-[0_12px_30px_-12px_rgba(2,132,199,0.6)] hover:border-sky-500 hover:bg-sky-500",
  secondary:
    "border border-slate-900 bg-slate-900 text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.45)] hover:bg-slate-800 dark:border-white/10 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/5",
  ghost:
    "border border-transparent bg-transparent text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 gap-2 px-4 text-sm",
  md: "min-h-11 gap-2.5 px-5 text-sm sm:px-6 sm:text-base",
  lg: "min-h-12 gap-3 px-6 text-base sm:px-7",
  xl: "min-h-14 gap-3 px-7 text-base sm:px-8 sm:text-lg",
};

function ButtonInner({
  children,
  icon,
  iconPosition,
  loading,
  variant,
}: {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition: "left" | "right";
  loading: boolean;
  variant: ButtonVariant;
}) {
  const spinnerTone =
    variant === "primary" || variant === "secondary"
      ? "text-white"
      : "text-slate-900 dark:text-white";

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "primary" &&
            "bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_40%,rgba(255,255,255,0.06))]",
          variant === "secondary" &&
            "bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.04))]",
          variant === "outline" &&
            "bg-[linear-gradient(135deg,rgba(2,132,199,0.04),transparent_45%,rgba(15,23,42,0.03))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%,rgba(255,255,255,0.02))]",
          variant === "ghost" &&
            "bg-[linear-gradient(135deg,rgba(15,23,42,0.03),transparent_45%,rgba(15,23,42,0.02))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.02))]"
        )}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70"
      />

      <span className="relative z-10 inline-flex items-center justify-center gap-inherit">
        {loading ? (
          <>
            <Loader2 className={cn("h-4 w-4 animate-spin", spinnerTone)} />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <motion.span
                variants={iconVariants}
                initial="rest"
                whileHover="hoverLeft"
                className="inline-flex shrink-0 items-center"
              >
                {icon}
              </motion.span>
            )}

            <span>{children}</span>

            {icon && iconPosition === "right" && (
              <motion.span
                variants={iconVariants}
                initial="rest"
                whileHover="hoverRight"
                className="inline-flex shrink-0 items-center"
              >
                {icon}
              </motion.span>
            )}
          </>
        )}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
      />
    </>
  );
}

export default function ParabolicButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  type = "button",
  ...props
}: ParabolicButtonProps) {
  const sharedClassName = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    const isInactive = disabled || loading;

    return (
      <motion.div
        whileHover={
          isInactive
            ? undefined
            : {
                y: -1,
                transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
              }
        }
        whileTap={isInactive ? undefined : { scale: 0.99 }}
        className={cn(fullWidth && "w-full")}
      >
        <Link
          href={isInactive ? "#" : href}
          aria-disabled={isInactive}
          tabIndex={isInactive ? -1 : 0}
          className={cn(sharedClassName, isInactive && "pointer-events-none")}
        >
          <ButtonInner
            icon={icon}
            iconPosition={iconPosition}
            loading={loading}
            variant={variant}
          >
            {children}
          </ButtonInner>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={sharedClassName}
      whileHover={
        disabled || loading
          ? undefined
          : {
              y: -1,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
      }
      whileTap={disabled || loading ? undefined : { scale: 0.99 }}
      {...props}
    >
      <ButtonInner
        icon={icon}
        iconPosition={iconPosition}
        loading={loading}
        variant={variant}
      >
        {children}
      </ButtonInner>
    </motion.button>
  );
}