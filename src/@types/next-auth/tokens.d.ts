/**
 * This interface defines the token object passed as the first argument to the
 * `jwt()` callback when a user successfully signs in for the first time.
 */
export interface TokenOnInitialSignIn {
  name: string
  email: string | null
  picture?: string
  /**
   * References the user's OAuth `id`.
   */
  sub: string
}

/**
 * This interface defines the token object for authenticated users.
 */
export interface TokenOnAuthentication {
  id: string
  name: string
  accessToken: string
  refreshToken: string
  expiresIn: string
  /**
   * This property is automatically added by `next-auth`.
   */
  iat?: number
  /**
   * This property is automatically added by `next-auth`.
   */
  exp?: number
}
