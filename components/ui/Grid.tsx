// components/ui/Grid.tsx
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
}

export default function Grid({ children }: GridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}