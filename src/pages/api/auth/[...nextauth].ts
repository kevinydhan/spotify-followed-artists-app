import type { NextApiHandler } from 'next'
import WithAuth from 'next-auth'
import Providers from 'next-auth/providers'

import spotify from '@/modules/spotify'
import type {
  CreateJwtTokenCallback,
  CreateSessionCallback,
  TokenOnAuthentication,
} from '@/types'

const getFutureDate = (seconds: number): string => {
  const futureDate = Date.now() + seconds * 1000
  return new Date(futureDate).toISOString()
}

export const createJwtToken: CreateJwtTokenCallback = async (
  token,
  user,
  account,
  profile
) => {
  /**
   * This block triggers **only** when the user successfully signs in
   * with Spotify OAuth.
   */
  if (account) {
    return {
      id: profile.id,
      name: profile.display_name,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      expiresIn: getFutureDate(account.expires_in),
    }
  }

  const authenticatedToken = token as TokenOnAuthentication
  const { expiresIn, accessToken, refreshToken } = authenticatedToken
  const isTokenExpired = Date.now() > new Date(expiresIn).getTime()

  if (isTokenExpired) {
    spotify.setAccessToken(accessToken)
    spotify.setRefreshToken(refreshToken)
    const { body } = await spotify.refreshAccessToken()

    return {
      ...authenticatedToken,
      accessToken: body.access_token,
      expiresIn: getFutureDate(body.expires_in),
    }
  }

  return authenticatedToken
}

export const createSession: CreateSessionCallback = (session, token) => ({
  user: {
    id: token?.id,
    name: token?.name,
  },
  accessToken: token?.accessToken,
  refreshToken: token?.refreshToken,
  expires: token?.expiresIn,
})

const options = {
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: [
        /**
         * This scope is required for:
         * - Getting user's followed artists
         */
        'user-follow-read',
      ].join(' '),
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
  },
  callbacks: {
    jwt: createJwtToken,
    session: createSession,
  },
  debug: process.env.NODE_ENV !== 'production',
}

const handleAuthenticationRequests: NextApiHandler = (req, res) => {
  return WithAuth(req, res, options)
}

export default handleAuthenticationRequests
