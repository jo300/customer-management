export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  sub: string; // user id
  email: string;
  exp: number; // unix seconds
}

export interface AuthSession {
  token: string;
  email: string;
  expiresAt: number; // unix ms
}
