/**
 * This interface was copied directly from `@types/spotify-web-api-node`.
 */
export interface AuthorizationCodeGrantResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}
