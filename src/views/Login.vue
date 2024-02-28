<template>
    <div class="container mx-auto p-8">
      <div class="max-w-md mx-auto">
        <h1 class="text-4xl font-bold mb-5 text-center">Login</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" v-model="credentials.email">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Senha
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" v-model="credentials.password">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Entrar
            </button>
          </div>
           <!-- Mensagem para usuários que ainda não têm uma conta -->
          <p class="text-gray-600 text-sm text-center mt-4">
            Não tem uma conta?
           <router-link to="/register" class="text-blue-500 hover:text-blue-700">Faça o registro agora.</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { httpClient } from '@/utils/httpClient';

  export default {
    name: 'LoginScreen',
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async login() {
        try {
          const response = await httpClient.post('/login', this.credentials);
          this.$store.dispatch('authenticateUser', response.data.token); 
          this.$router.push({ name: 'Dashboard' }); 
        } catch (error) {
          console.error(error);
          alert(error.response?.data?.message ?? "Erro ao tentar entrar no sistema.");
        }
      },
    },
  };
  </script>

  