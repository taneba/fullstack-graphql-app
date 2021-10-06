import { EnvelopError, Plugin } from '@envelop/core'
import { User } from '@prisma/client'
import { StringValueNode } from 'graphql'

import { Resolvers } from '~/api/graphql/generated/graphql'
import { GraphqlServerContext } from '~/context'

import { getDirective } from './getDirective'

const isCurrentUserAlsoOwner = async ({
  context,
  currentUserId,
  targetResourceId,
  typeName, // Todo, Query
}: {
  context: any
  currentUserId: number
  targetResourceId: number
  typeName: string // TODO Union typeにしたい！
}): Promise<boolean> => {
  const ownerIdField = 'authorId' // should be passed via directive arg
  const type = 'todo' // should be passed via directive arg
  try {
    const res = await (context as GraphqlServerContext).prisma[type].findFirst({
      where: {
        id: targetResourceId,
        [ownerIdField]: currentUserId,
      },
    })
    return !!res
  } catch (error) {
    return false
  }
}

type TypeName = keyof Resolvers

export function useOwnerCheck(
  options?:
    | {
        contextFieldName?: 'currentUser' | string
      }
    | undefined
): Plugin {
  const fieldName = options?.contextFieldName || 'currentUser'
  return {
    onExecute() {
      return {
        async onResolverCalled({ args, root, context, info }) {
          // TODO: handle isQuery, Mutation
          const directiveNode = getDirective(info, 'isOwner')
          if (directiveNode) {
            const currentUser = (context as GraphqlServerContext)[
              fieldName
            ] as User

            const parentType = info.path.typename as TypeName // ex. User
            const isMutation = parentType === 'Mutation'
            const targetResourceId: string | null = isMutation
              ? args.id
              : root.id
            const currentUserId = currentUser.id

            // if parentType is not User, ownerField should be placed
            const ownerFieldNode = directiveNode.arguments?.find(
              (arg) => arg.name.value === 'ownerField'
            )?.value as StringValueNode | undefined

            const ownerFieldName = ownerFieldNode?.value || 'userId' // default to userId

            if (!ownerFieldName) {
              console.log('ownerField is not placed')
              throw new EnvelopError('something went wrong')
            }

            const isOwner = currentUserId === root[ownerFieldName]

            if (!isOwner) {
              throw new EnvelopError(
                'request not authorized' + `, operation: ${info.fieldName}`,
                {
                  code: 'NOT_AUTHORIZED',
                }
              )
            }
          }
        },
      }
    },
  }
}
