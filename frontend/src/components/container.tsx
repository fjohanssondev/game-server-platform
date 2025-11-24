import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("flex container mx-auto px-4", className)}>
      {children}
    </div>
  );
}
