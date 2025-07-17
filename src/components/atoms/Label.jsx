import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-surface-700 dark:text-surface-200 mb-2",
        className
      )}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;