import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { IMAGE_MESSAGES } from '@/constants/message'
import { app } from '@/lib/firebase'
import { profileSchema } from '@/lib/validation'
import { AuthInput } from '@/components/AuthInput'
import { Title } from '@/components/Title'
import { Button } from '@/components/Button'
import { AvatarImage } from '@/components/AvatarImage'
import { AvatarInput } from '@/components/AvatarInput'

export default function Profile() {
  const [image, setImage] = useState(null)
  const [uploadImageStatus, setUploadImageStatus] = useState('idle')
  const { currentUser } = useSelector((state) => state.auth)

  const imagePreview = useMemo(() => {
    return image ? URL.createObjectURL(image) : ''
  }, [image])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: currentUser.username,
      password: '',
      confirm_password: '',
    },
  })

  function onSubmit(data) {
    if (!image) {
      console.log(data)
    } else {
      const fileName = `${image.name}${uuidv4()}`

      const storage = getStorage(app)
      const storageRef = ref(storage, `images/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setUploadImageStatus('pending')
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          setUploadImageStatus('rejected')
          setImage(null)
          toast.error(IMAGE_MESSAGES.UPLOAD_FAILED)
          throw new Error(error)
        },
        () => {
          setUploadImageStatus('successful')
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Upload success, file available at', downloadURL)
          })
          setImage(null)
        }
      )
    }
  }

  return (
    <section className={twMerge('container max-w-lg pb-4')}>
      <Title>Profile</Title>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="relative mb-6 self-center">
          <AvatarImage src={imagePreview || currentUser.photo_url} alt={currentUser.username} w={24} h={24} />
          <AvatarInput setImage={setImage} isPending={uploadImageStatus === 'pending'} />
        </div>

        <AuthInput defaultValue={currentUser.email} disabled className="text-slate-700 disabled:cursor-not-allowed" />
        <AuthInput
          placeholder="Username"
          autoComplete="off"
          name="username"
          register={register}
          errorMessage={errors.username?.message}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <AuthInput
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          name="confirm_password"
          register={register}
          errorMessage={errors.confirm_password?.message}
        />

        <Button className="mt-1">Update</Button>
      </form>

      <div className="mt-4 flex justify-between">
        <button className="p-1 text-red-500 transition-all hover:text-red-700">Delete account</button>
        <button className="p-1 text-slate-500 transition-all hover:text-slate-700">Sign out</button>
      </div>
    </section>
  )
}
