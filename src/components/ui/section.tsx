import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-4",
        md: "py-8",
        lg: "py-12",
        xl: "py-16",
        "2xl": "py-20",
      },
      background: {
        default: "",
        muted: "bg-muted/50",
        primary: "bg-primary/5",
        secondary: "bg-secondary/50",
        accent: "bg-accent/50",
      },
      border: {
        none: "",
        top: "border-t",
        bottom: "border-b",
        both: "border-t border-b",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      spacing: "md",
      background: "default",
      border: "none",
      align: "left",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article" | "aside"
  container?: boolean
  containerSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    spacing, 
    background, 
    border, 
    align, 
    as: Component = "section",
    container = true,
    containerSize = "md",
    children,
    ...props 
  }, ref) => {
    const content = container ? (
      <div className={cn(
        "mx-auto w-full",
        containerSize === "sm" && "max-w-3xl px-4",
        containerSize === "md" && "max-w-4xl px-6",
        containerSize === "lg" && "max-w-6xl px-8",
        containerSize === "xl" && "max-w-7xl px-10",
        containerSize === "2xl" && "max-w-screen-2xl px-12",
        containerSize === "full" && "max-w-none px-4"
      )}>
        {children}
      </div>
    ) : children

    return (
      <Component
        className={cn(sectionVariants({ spacing, background, border, align, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Component>
    )
  }
)
Section.displayName = "Section"

export { Section, sectionVariants }
