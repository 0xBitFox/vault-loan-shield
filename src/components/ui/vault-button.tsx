import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const vaultButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        vault: "bg-gradient-gold text-primary-foreground hover:shadow-gold transform hover:scale-[1.02] transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        connect: "bg-gradient-card border border-primary/20 text-foreground hover:border-primary hover:shadow-gold transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface VaultButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof vaultButtonVariants> {
  asChild?: boolean
}

const VaultButton = React.forwardRef<HTMLButtonElement, VaultButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(vaultButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
VaultButton.displayName = "VaultButton"

export { VaultButton, vaultButtonVariants }