import { EnvelopError, Plugin } from '@envelop/core'
import { User } from '@prisma/client'

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
          const directiveNode = getDirective(info, 'isOwner')
          if (directiveNode) {
            const currentUser = (context as GraphqlServerContext)[
              fieldName
            ] as User

            const parentType = info.path.typename as TypeName // ex. User
            const isQuery = parentType === 'Query'
            const targetResourceId: string | null = isQuery ? args.id : root.id
            const currentUserId = currentUser.id
            const isOwner =
              parentType === 'User'
                ? currentUserId === Number(targetResourceId)
                : await isCurrentUserAlsoOwner({
                    context,
                    currentUserId,
                    targetResourceId: Number(targetResourceId),
                    typeName: parentType,
                  })

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
