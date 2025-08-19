import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-3xl px-4",
        md: "max-w-4xl px-6",
        lg: "max-w-6xl px-8",
        xl: "max-w-7xl px-10",
        "2xl": "max-w-screen-2xl px-12",
        full: "max-w-none px-4",
      },
      padding: {
        none: "",
        sm: "py-4",
        md: "py-6",
        lg: "py-8",
        xl: "py-10",
        "2xl": "py-12",
      },
      center: {
        true: "flex items-center justify-center",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      padding: "md",
      center: false,
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, padding, center, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants }
