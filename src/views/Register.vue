<template>
    <div class="container mx-auto p-8">
      <div class="max-w-md mx-auto">
        <h1 class="text-4xl font-bold mb-5 text-center">Registrar-se</h1>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Usuário
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuário" v-model="user.username">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="user.email">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Senha
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" v-model="user.password">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { httpClient } from '@/utils/httpClient';
  
  export default {
    name: 'RegisterScreen',
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async register() {
        try {
          await httpClient.post("/register", this.user);
          alert("Registro realizado com sucesso!");
          this.$router.push('/login');
        } catch (error) {
          console.error(error);
          alert(error.response?.data?.message ?? "Erro ao registrar, verifique os dados e tente novamente.");
        }
      },
    },
  };
  </script>
  