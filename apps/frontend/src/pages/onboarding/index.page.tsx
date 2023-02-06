import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'ui'
import { useMutation } from 'urql'

import { TextField } from '~/components'
import { DevNote } from '~/components/general/DevNote'
import { useCurrentUser } from '~/contexts/currentUser'
import { gql } from '~/generated'
import { UserInput } from '~/generated/graphql'
import { removeEmptyFields } from '~/utils/form'

const SaveUser = gql(/* GraphQL */ `
  mutation SaveUser($user: UserInput!) {
    saveUser(user: $user) {
      id
      __typename
    }
  }
`)

function Onboarding() {
  const [, executeMutation] = useMutation(SaveUser)
  const router = useRouter()
  const { executeGetProfile } = useCurrentUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<UserInput, 'email'>>()

  const onSubmit: SubmitHandler<Omit<UserInput, 'email'>> = async (data) => {
    try {
      const res = await executeMutation({ user: removeEmptyFields(data) })

      if (res.data?.saveUser?.id) {
        console.log('saved user', res.data.saveUser.id)
        await executeGetProfile()
        router.push('/todos')
      }
      if (res.error) {
        console.log('failed to save user', res.error)
        window.alert('登録に失敗しました')
      }
    } catch (error) {
      console.log(error)
      window.alert('登録に失敗しました')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-black">
        Tell me a little about yourself
      </h1>
      <DevNote.Root>
        <DevNote.P>
          {`This page is a demo for user onboarding, where you can get some info from user and save it to your database after signing up`}
        </DevNote.P>
      </DevNote.Root>

      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={register('name').name}>Name</label>
          <TextField
            id={register('name').name}
            {...register('name', { required: true })}
          />

          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Onboarding
