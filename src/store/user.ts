import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Admin',
    age: 30,
  }),
  getters: {
    fullName: (state) => `${state.name} User`,
  },
  actions: {
    setUserName(name: string) {
      this.name = name;
    },
    incrementAge() {
      this.age++;
    },
  },
});