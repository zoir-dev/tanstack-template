import { cn } from "@/lib/utils";

const Loader = ({
  size = "md",
  variant = "primary",
}: {
  size?: "sm" | "md" | "lg" | "responsive";
  variant?: "primary" | "secondary" | "ghost" | "destructive";
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        size === "sm" && "w-5 h-5",
        size === "md" && "w-8 h-8",
        size === "lg" && "w-10 h-10",
        size === "responsive" && "w-8 h-8 md:w-10 md:h-10"
      )}
    >
      <div
        className={cn(
          "absolute w-full h-full rounded-full animate-[spin_0.8s_ease_infinite] border-solid border-primary border-t-transparent border-l-transparent border-r-transparent",
          size === "sm" ? "border-2" : "border-[3px]",
          variant === "secondary" && "border-b-white",
          variant === "ghost" && "border-b-accent",
          variant === "destructive" && "border-b-destructive"
        )}
      />
      <div
        className={cn(
          "absolute w-full h-full rounded-full opacity-75 animate-[spin_0.8s_linear_infinite] border-dotted border-primary border-t-transparent border-l-transparent border-r-transparent ",
          size === "sm" ? "border-2" : "border-[3px]",
          variant === "secondary" && "border-b-white",
          variant === "ghost" && "border-b-accent",
          variant === "destructive" && "border-b-destructive"
        )}
      />
    </div>
  );
};

export default Loader;
