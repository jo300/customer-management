import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear(); // Start fresh
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return true for correct credentials", (done) => {
    service
      .login({ email: "admin@test.com", password: "password123" })
      .subscribe({
        next: (session) => {
          expect(session.email).toBe("admin@test.com");
          expect(service.isAuthenticated()).toBe(true);
          done();
        },
      });
  });

  it("should throw error for wrong credentials", (done) => {
    service.login({ email: "wrong@test.com", password: "wrong" }).subscribe({
      error: (err) => {
        expect(err.message).toBe("Invalid credentials");
        expect(service.isAuthenticated()).toBe(false);
        done();
      },
    });
  });

  it("should clear session on logout", () => {
    // Force a session first
    localStorage.setItem(
      "auth_session",
      JSON.stringify({
        token: "123",
        email: "a@b.com",
        expiresAt: Date.now() + 10000,
      }),
    );
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem("auth_session")).toBeNull();
  });
});
