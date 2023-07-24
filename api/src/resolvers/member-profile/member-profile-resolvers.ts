import { Member } from '@jaedag/admin-portal-types'
import { Context } from '../utils/neo-types'
import {
  checkMemberExists,
  createMemberProfile,
  updateMemberProfile,
} from './member-profile-cypher'

export const memberProfileMutations = {
  CreateMemberProfile: async (
    source: unknown,
    args: {
      firstName: string
      middleName: string
      lastName: string
      gender: string
      phoneNumber: string
      whatsappNumber: string
      email: string
      dob: string
      maritalStatus: string
      occupation: string
      pictureUrl: string
      visitationArea: string
      fellowshipCode: number
    },
    context: Context
  ) => {
    const session = context.executionContext.session()

    try {
      const memberResponse = await session.executeRead((tx) =>
        tx.run(checkMemberExists, {
          email: args.email ?? null,
          whatsappNumber: args?.whatsappNumber ?? null,
        })
      )

      const member: Member =
        memberResponse.records[0]?.get('member')?.properties
      const memberExists = memberResponse.records[0]?.get('predicate')

      if (memberExists) {
        const response = await session.executeWrite((tx) =>
          tx.run(updateMemberProfile, {
            ...args,
            id: member.id,
            auth: context.auth,
          })
        )

        const updatedMember = response.records[0]?.get('member').properties
        console.log(
          '🚀 ~ file: member-profile-resolvers.ts:53 ~ updatedMember:',
          updatedMember
        )

        return updatedMember
      }

      const response = await session.executeWrite((tx) =>
        tx.run(createMemberProfile, {
          ...args,
          auth: context.auth,
        })
      )

      const createdMember = response.records[0]?.get('member').properties
      console.log(
        '🚀 ~ file: member-profile-resolvers.ts:65 ~ createdMember:',
        createdMember
      )

      return createdMember
    } catch (error) {
      throw new Error(`Error creating member profile: ${error}`)
    }
  },
}

export const memberProfileQueries = {}
