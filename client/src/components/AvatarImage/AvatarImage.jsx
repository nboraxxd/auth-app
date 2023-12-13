import { cn } from '@/utils/common'

export default function AvatarImage({ src, alt, w, h, className, ...rest }) {
  return <img src={src} alt={alt} className={cn(`w-${w} h-${h} rounded-full object-cover`, className)} {...rest} />
}
