import { cn } from "@/lib/utils"
import { motion } from "framer-motion";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}


const PartySkeleton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Skeleton className="h-[120px] w-full animate-pulse rounded-xl" />
  </motion.div>
);

export { Skeleton, PartySkeleton }
