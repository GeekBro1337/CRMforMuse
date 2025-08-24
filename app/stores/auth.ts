import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as any,
    roles: [] as string[],
  }),
  actions: {
    setAuthData(user: any, isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
      this.user = user;
      if (user) {
        this.roles = user["https://music-club-crm/roles"] || [];
      }
    },
    hasRole(role: string) {
      return this.roles.includes(role);
    },
  },
});
