import type { User } from 'next-auth'
import type { SessionBase } from 'next-auth/_utils'
import type { AsyncReturnType } from 'type-fest'

import type {
  NextAuthSpotifyOAuthAccount,
  TokenOnAuthentication,
  TokenOnInitialSignIn,
} from '@/types'

/**
 * This type references the user object passed as an argument to the `jwt()`
 * callback when a user signs in for the first time.
 */
type UserWithId = User & {
  id: string
}

/**
 * This type defines the `jwt()` callback used by `next-auth`.
 */
export type CreateJwtTokenCallback = (
  token: TokenOnInitialSignIn | TokenOnAuthentication,
  /**
   * This parameter is `undefined` for users that are already signed in.
   */
  user: UserWithId | undefined,
  /**
   * This parameter is `undefined` for users that are already signed in.
   */
  account: NextAuthSpotifyOAuthAccount | undefined,
  /**
   * This parameter is `undefined` for users that are already signed in.
   */
  profile: SpotifyApi.UserObjectPublic | undefined
) => Promise<TokenOnAuthentication>

/**
 * This type defines the `session()` callback used by `next-auth`.
 */
export type CreateSessionCallback = (
  session: SessionBase,
  /**
   * This parameter is equal to the returned object from the `jwt()` callback.
   */
  token: AsyncReturnType<CreateJwtTokenCallback>
) => ActiveSession
