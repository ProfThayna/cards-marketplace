<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center mb-6">Adicionar Cartas à Minha Coleção</h1>
      <div class="mb-4">
        <label for="card-select" class="block text-gray-700 text-sm font-bold mb-2">
          Selecione as cartas:
        </label>
        <div class="relative">
          <select id="card-select" v-model="selectedCards" multiple class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option v-for="card in cards" :key="card.id" :value="card.id">
              {{ card.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.516 7.548c.436-.446 1.045-.48 1.576 0 .145.131.262.289.35.463l3.908 8.282 3.908-8.282c.088-.174.205-.332.35-.463.531-.48 1.14-.446 1.575 0 .436.445.408 1.197 0 1.615l-4.313 4.602c-.436.446-1.044.481-1.574 0l-4.314-4.602c-.408-.418-.436-1.17 0-1.615z"/>
            </svg>
          </div>
        </div>
      </div>
      <button @click="addCardsToCollection" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Adicionar à Coleção
      </button>
    </div>
  </template>
  
  
  <script>
  import { httpClient } from '@/utils/httpClient';
  
  export default {
    name: 'AddCardsToCollection',
    data() {
      return {
        cards: [], // Cartas disponíveis para adicionar à coleção
        selectedCards: [], // IDs das cartas selecionadas pelo usuário
      };
    },
    created() {
      this.fetchAvailableCards();
    },
    methods: {
      async fetchAvailableCards() {
        try {
          const response = await httpClient.get('/cards', { params: { rpp: 10, page: 1 } });
          this.cards = response.data.list;
        } catch (error) {
          console.error(error);
          alert('Erro ao buscar cartas disponíveis.');
        }
      },
      async addCardsToCollection() {
        if (this.selectedCards.length === 0) {
          alert('Por favor, selecione pelo menos uma carta.');
          return;
        }
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await httpClient.post('/me/cards', {
            cardIds: this.selectedCards
          });
          alert('Cartas adicionadas à coleção com sucesso!');
          this.selectedCards = []; // Limpar seleção
        } catch (error) {
          console.error(error);
          alert('Erro ao adicionar cartas à coleção: ' + error.message);
        }
      }
    },
  };
  </script>
  