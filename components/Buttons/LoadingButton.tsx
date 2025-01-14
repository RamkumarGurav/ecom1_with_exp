import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isLoading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  loadingText?: string;
  iconRight?: boolean;
  children: React.ReactNode;
  className?: string; // Add the className prop to the Props type
  [key: string]: any;
};

export function LoadingButton({
  isLoading = false,
  variant = "default",
  loadingText,
  children,
  iconRight = true,
  className, // Use the className prop here
  ...rest
}: Props) {
  return iconRight ? (
    <Button
      variant={`${variant}`}
      className={`${className} `} // Use the passed className
      disabled={isLoading ? true : false}
      {...rest}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loadingText ? loadingText : children}
    </Button>
  ) : (
    <Button
      variant={`${variant}`}
      className={`${className} `} // Use the passed className
      disabled={isLoading ? true : false}
      {...rest}
    >
      {loadingText ? loadingText : children}
      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
