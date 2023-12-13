import { cn } from '@/utils/common'

export default function Title({ children, className }) {
  return <h1 className={cn('my-3 text-center text-3xl font-semibold md:my-6', className)}>{children}</h1>
}
