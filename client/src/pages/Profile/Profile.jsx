import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { IMAGE_MESSAGES } from '@/constants/message'
import { handleInternalServerError, handleUnauthorizedError } from '@/utils/error'
import { app } from '@/lib/firebase'
import { profileSchema } from '@/lib/validation'
import { useGetMe, useUpdateMe } from '@/lib/tanstack-query/queriesAndMutations'
import { setAuth } from '@/lib/redux/auth/authSlice'
import { AuthInput } from '@/components/AuthInput'
import { Title } from '@/components/Title'
import { Button } from '@/components/Button'
import { AvatarImage } from '@/components/AvatarImage'
import { AvatarInput } from '@/components/AvatarInput'
import { SignOutBtn } from '@/components/SignOutBtn'
import { DeleteUserBtn } from '@/components/DeleteUserBtn'

export default function Profile() {
  const [image, setImage] = useState(null)
  const [uploadImageStatus, setUploadImageStatus] = useState('idle')
  const dispatch = useDispatch()

  const meQuery = useGetMe()
  const me = meQuery.data?.data.result

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: me.username,
      password: '',
      confirm_password: '',
    },
  })

  const imagePreview = useMemo(() => {
    return image ? URL.createObjectURL(image) : ''
  }, [image])

  const { mutate, isPending } = useUpdateMe()

  useEffect(() => {
    if (me) {
      setValue('username', me.username)
    }
  }, [me, setValue])

  useEffect(() => {
    meQuery.isSuccess && dispatch(setAuth({ user: me, isAuthenticated: true }))
  }, [dispatch, me, meQuery.isSuccess])

  function handleMutate(body) {
    mutate(body, {
      onSuccess: (res) => {
        toast.success(res.data.message)
        meQuery.refetch()
        dispatch(setAuth({ user: res.data.result, isAuthenticated: true }))
      },
      onError: (error) => {
        handleUnauthorizedError(error, setError)
        handleInternalServerError(error)
      },
      onSettled: () => {
        if (image) setImage(null)
      },
    })
  }

  function handleErrorUploadImage(err) {
    setUploadImageStatus('rejected')
    setImage(null)
    toast.error(IMAGE_MESSAGES.UPLOAD_FAILED)
    throw new Error(err)
  }

  function onSubmit(data) {
    const { password, confirm_password, ...rest } = data
    const body = !password || !confirm_password ? rest : data

    if (!image) {
      handleMutate(body)
    } else {
      const fileName = `${image.name}${uuidv4()}`

      const storage = getStorage(app)
      const storageRef = ref(storage, `images/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        () => {
          setUploadImageStatus('pending')
        },
        (error) => {
          handleErrorUploadImage(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setUploadImageStatus('successful')
              handleMutate({ ...body, photo_url: downloadURL })
            })
            .catch((error) => {
              handleErrorUploadImage(error)
            })
        }
      )
    }
  }

  if (meQuery.error) return null

  return (
    <section className={twMerge('container max-w-lg pb-4')}>
      <Title>Profile</Title>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="relative mb-6 self-center">
          <AvatarImage src={imagePreview || me.photo_url} alt={me.username} className="h-24 w-24" />
          <AvatarInput setImage={setImage} isPending={uploadImageStatus === 'pending' || isPending} />
        </div>

        <AuthInput defaultValue={me.email} disabled className="text-slate-700 disabled:cursor-not-allowed" />
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

        <Button className="mt-1" isPending={uploadImageStatus === 'pending' || isPending}>
          Update
        </Button>
      </form>

      <div className="mt-4 flex justify-between">
        <SignOutBtn />
        <DeleteUserBtn />
      </div>
    </section>
  )
}
