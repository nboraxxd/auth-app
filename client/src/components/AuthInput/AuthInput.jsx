import { cn } from '@/utils/common'

export default function AuthInput({ type = 'text', error, className, ...rest }) {
  return (
    <>
      <input
        type={type}
        {...rest}
        className={cn('rounded-lg bg-slate-100 p-3 outline-slate-200', className, {
          'bg-red-100 text-red-400 outline-red-200 placeholder:text-red-300': error,
        })}
      />
      <p className="mt-0.5 min-h-[1.125rem] text-xs italic text-red-500">{error}</p>
    </>
  )
}
