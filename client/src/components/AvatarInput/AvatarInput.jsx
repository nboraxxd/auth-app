import { memo, useRef } from 'react'
import { toast } from 'sonner'

import { IMAGE_MESSAGES } from '@/constants/message'
import camera from '@/assets/images/camera.svg'

const AvatarInput = memo(function AvatarInput({ setImage, isPending }) {
  const MAX_SIZE_UPLOAD_AVATAR = 1024 * 1024 * 2 // 2MB
  const inputRef = useRef(null)

  function onChangeAvatar(ev) {
    const imageFromLocal = ev.target.files?.[0]

    if (imageFromLocal && !imageFromLocal.type.includes('image')) {
      toast.error(IMAGE_MESSAGES.MUST_BE_AN_IMAGE)
    } else if (imageFromLocal && imageFromLocal.size >= MAX_SIZE_UPLOAD_AVATAR) {
      toast.error(IMAGE_MESSAGES.SIZE)
    } else {
      setImage(imageFromLocal)
    }

    ev.target.value = ''
  }

  return (
    <>
      <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={onChangeAvatar} />
      <button
        type="button"
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-200 object-cover p-1.5 opacity-80 transition-all hover:opacity-90 disabled:opacity-60"
        disabled={isPending}
        onClick={() => inputRef.current.click()}
      >
        <img src={camera} alt="Choose image" className="h-4 w-4" />
      </button>
    </>
  )
})

export default AvatarInput
