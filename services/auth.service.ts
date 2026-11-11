import { Injectable, computed, signal } from "@angular/core";
import { Observable, delay, map, of, throwError } from "rxjs";
import {
  AuthSession,
  AuthTokenPayload,
  LoginCredentials,
} from "../app/core/models/auth/auth.models";

const STORAGE_KEY = "auth_session";
const MOCK_EMAIL = "admin@test.com";
const MOCK_PASSWORD = "password123";
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

@Injectable({ providedIn: "root" })
export class AuthService {
  // Reactive session state — components can read this
  private readonly _session = signal<AuthSession | null>(
    this.readStoredSession(),
  );
  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => {
    const s = this._session();
    return !!s && s.expiresAt > Date.now();
  });
  readonly currentEmail = computed(() => this._session()?.email ?? null);

  /**
   * Mock login — in production this would POST credentials to the server
   * and receive a real JWT. Here we generate a fake JWT client-side.
   */
  login(credentials: LoginCredentials): Observable<AuthSession> {
    const email = credentials.email.trim().toLowerCase();

    if (email !== MOCK_EMAIL || credentials.password !== MOCK_PASSWORD) {
      return throwError(() => new Error("Invalid credentials")).pipe(
        delay(400),
      );
    }

    const expiresAt = Date.now() + TOKEN_TTL_MS;
    const payload: AuthTokenPayload = {
      sub: "1",
      email,
      exp: Math.floor(expiresAt / 1000),
    };
    const token = this.buildFakeJwt(payload);
    const session: AuthSession = { token, email, expiresAt };

    this._session.set(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return of(session).pipe(delay(400));
  }

  logout(): void {
    this._session.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  getToken(): string | null {
    const s = this._session();
    return s && s.expiresAt > Date.now() ? s.token : null;
  }

  /** Exposed for the interceptor; async-friendly if you want to refresh later */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // --- internals ---

  private readStoredSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthSession;
      if (!parsed?.token || parsed.expiresAt <= Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  private buildFakeJwt(payload: AuthTokenPayload): string {
    const header = { alg: "none", typ: "JWT" };
    const b64 = (obj: object) =>
      btoa(JSON.stringify(obj))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    return `${b64(header)}.${b64(payload)}.fake-signature`;
  }
}
