export interface IAuthState {
  isAuthenticated: boolean;
}

export interface IAuthEvent {
  "auth/setIsAuthenticated": boolean;
}
