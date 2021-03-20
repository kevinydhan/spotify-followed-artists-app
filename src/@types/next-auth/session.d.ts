import type { TokenOnAuthentication } from '@/types'

/**
 * This interface defines the object returned from GET `/api/auth/session`.
 */
export interface ActiveSession {
  user: {
    id: TokenOnAuthentication['id']
    name: TokenOnAuthentication['name']
  }
  accessToken: TokenOnAuthentication['accessToken']
  refreshToken: TokenOnAuthentication['refreshToken']
  expires: TokenOnAuthentication['expiresIn']
}
