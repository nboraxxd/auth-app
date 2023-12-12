import { cn } from '@/utils/common'

export default function Button({ children, className, isPending, ...rest }) {
  return (
    <button
      disabled={isPending}
      className={cn(
        'flex min-h-[3rem] items-center justify-center rounded-lg bg-slate-700 p-3 font-semibold uppercase text-white transition-all  disabled:cursor-not-allowed disabled:opacity-60',
        className,
        {
          'cursor-not-allowed opacity-60': isPending,
          'hover:opacity-95': !isPending,
        }
      )}
      {...rest}
    >
      {isPending === true ? (
        <span className="mr-2 inline-block h-[20px] w-[20px] animate-spin rounded-[50%] border-[3px] border-solid border-white border-b-transparent" />
      ) : (
        children
      )}
    </button>
  )
}
