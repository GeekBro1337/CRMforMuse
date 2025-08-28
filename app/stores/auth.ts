import { defineStore } from "pinia";
import type { User } from "@auth0/auth0-spa-js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
    roles: [] as string[],
  }),
  actions: {
    setAuthData(user: User | null, isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
      this.user = user;
      this.roles = user?.["https://music-club-crm/roles"] || [];
    },
    hasRole(role: string) {
      return this.roles.includes(role);
    },
  },
});
