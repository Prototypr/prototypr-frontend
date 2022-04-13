/** @return { import("next-auth/adapters").Adapter } */

import getStrapiUserByEmail from "./strapi-connectors/getStrapiUserByEmail"

export default function MyAdapter(client, options = {}) {
    return {
      async createUser(user) {
        return
      },
      async getUser(id) {
        return
      },
      async getUserByEmail(email) {
        const user = getStrapiUserByEmail(email)
        console.log(user)
        return user
      },
      async getUserByAccount({ providerAccountId, provider }) {
        return
      },
      async updateUser(user) {
        return
      },
      async deleteUser(userId) {
        return
      },
      async linkAccount(account) {
        return
      },
      async unlinkAccount({ providerAccountId, provider }) {
        return
      },
      async createSession({ sessionToken, userId, expires }) {
        return
      },
      async getSessionAndUser(sessionToken) {
        return
      },
      async updateSession({ sessionToken }) {
        return
      },
      async deleteSession(sessionToken) {
        return
      },
      async createVerificationToken({ identifier, expires, token }) {
        return
      },
      async useVerificationToken(data) {
        console.log(data)
        // console.log('identifier',identifier)
        return
      },
    }
  }