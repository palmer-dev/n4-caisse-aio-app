import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginMutation } from '@services/auth/authExtendedApi.ts'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth, setLogin } from '@services/auth/authSlice.ts'
import { Navigate } from 'react-router'
import Button from '@components/Button/Button.tsx'

type Inputs = {
  token: string
}

export default function LoginScreen(): JSX.Element {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Inputs>()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    void tryLogin(data.token)
  }

  const tryLogin = async (token): Promise<void> => {
    return login({ token: token }).then((result) => {
      if ('data' in result && result.data) {
        dispatch(setLogin(result.data))
        window.api.store.set('aio_api_key', result.data.token)
      } else {
        dispatch(logout())
        setError('token', { message: 'Invalid token' })
      }

      // Remove error
      setTimeout(() => {
        reset()
      }, 8000)
    })
  }

  useEffect(() => {
    // Retrieve saved token
    const savedToken = window.api.store.get('aio_api_key')

    // Retrieve saved token
    if (savedToken) {
      void tryLogin(savedToken)
    }
  }, [])

  // When logged in go to home page
  if (auth.token) {
    return <Navigate to={'/dashboard'} />
  }

  return (
    <div className="m-auto max-w-md w-full">
      <h1 className={'text-3xl font-bold mb-5 text-center text-black dark:text-white'}>Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 bg-white dark:bg-gray-700 dark:text-gray-200 p-6 shadow-lg rounded-md max-w-md mx-auto"
      >
        {/* Email input */}
        <div>
          <input
            placeholder="API Token"
            {...register('token')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          />
          {errors.token && (
            <span className="text-xs text-red-500 dark:text-red-400">{errors.token.message}</span>
          )}
        </div>

        {/* Submit button */}
        <Button isLoading={isLoading} isError={!!errors.token}>
          Enregistrer
        </Button>
      </form>
    </div>
  )
}
