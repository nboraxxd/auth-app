import { cn } from '@/utils/common'
import { memo } from 'react'

const AvatarImage = memo(function AvatarImage({ src, alt, className, ...rest }) {
  return <img src={src} alt={alt} className={cn('h-9 w-9 rounded-full object-cover', className)} {...rest} />
})

export default AvatarImage
