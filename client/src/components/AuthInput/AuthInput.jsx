import { cn } from '@/utils/common'

export default function AuthInput({ type = 'text', errorMessage, className, name, register, ...rest }) {
  const registerResult = register && name ? register(name) : null

  return (
    <>
      <input
        type={type}
        {...registerResult}
        className={cn('rounded-lg bg-slate-100 p-3 outline-slate-200', className, {
          'bg-red-100 text-red-400 outline-red-200 placeholder:text-red-300': errorMessage,
        })}
        {...rest}
      />
      <p className="mx-2 mt-0.5 min-h-[1.125rem] text-xs italic text-red-500">{errorMessage}</p>
    </>
  )
}
