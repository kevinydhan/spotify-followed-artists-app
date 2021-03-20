import type { AuthorizationCodeGrantResponse } from '@/types'

/**
 * This interface defines the account object passed as an argument to the
 * `jwt()` callback.
 */
export interface NextAuthSpotifyOAuthAccount
  extends AuthorizationCodeGrantResponse {
  provider: 'spotify'
  type: 'oauth'
  id: string
  accessToken: string
  accessTokenExpires: number | null
  refreshToken: string
  idToken?: string
}
