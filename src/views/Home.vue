<template>
    <header class="bg-blue-600 p-4">
      <div class="container mx-auto flex justify-between items-center"> 
        <!-- Login/Register Form -->
        <div class="flex items-center gap-10">
          <input type="text" placeholder="Username" class="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
          <input type="password" placeholder="Password" class="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
          <router-link to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           Log In
          </router-link>
          <router-link to="/register" class="text-white font-bold py-2 px-4 rounded">
           Sign Up
          </router-link>
        </div>
        <!-- Account Menu -->
        <nav class="flex items-center">
          <router-link to="/" class="text-white px-4 py-2 hover:text-blue-300">Log Out</router-link>
        </nav>
      </div>
    </header>
    <div class="home-banner bg-blue-800 text-white text-center py-20 px-4">
     <h1 class="text-4xl md:text-6xl font-bold mb-6">O maior site de troca de cartas</h1>
     <p class="text-xl mb-6">Confira as solicitações de hoje:</p>
     <div class="container mx-auto p-4">
     <!-- Seção de trocas em aberto -->
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Trocas em Aberto</h2>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Iterar sobre as solicitações de trocas -->
           <div v-for="trade in trades.list" :key="trade.id" class="border p-4 rounded-lg shadow-md">
             <h3 class="font-bold">{{ trade.user.name }}</h3>
             <div class="my-2">
              <!-- Iterar sobre as cartas oferecidas -->
              <div v-for="tradeCard in trade.tradeCards" :key="tradeCard.id" class="flex items-center justify-between">
                <div v-if="tradeCard.type === 'OFFERING'" class="rounded overflow-hidden shadow-lg p-2">
                  <img :src="tradeCard.card.imageUrl" alt="Card image" class="w-32 h-32 object-cover">
                  <p>{{ tradeCard.card.name }}</p>
                </div>
                <div v-if="tradeCard.type === 'RECEIVING'" class="rounded overflow-hidden shadow-lg p-2">
                  <img :src="tradeCard.card.imageUrl" alt="Card image" class="w-32 h-32 object-cover">
                  <p>{{ tradeCard.card.name }}</p>
                </div>
              </div>
             </div>
            </div>
         </div>
       </section>
     </div>
  </div>
</template>
  
  <script>
  import { httpClient } from '@/utils/httpClient';

  export default {
    name: 'HomeScreen',
    data() {
      return {
        trades: {
            list: [],
            rpp: 15,
            page: 1,
            more:false
        },
      };
    },
    created() {
      this.fetchTrades();
    },
    methods: {
      async fetchTrades() {
        try {
          const response = await httpClient.get('/trades', {
            params: { rpp: this.trades.rpp, page: this.trades.page }
          });
          this.trades = response.data;
        } catch (error) {
          console.error(error);
          alert("Erro ao buscar dados");
        }
      },
    },
  };
  </script>
  
  