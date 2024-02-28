<template>
    <div class="container mx-auto p-4">
        <header class="my-4">
            <h1 class="text-3xl font-bold text-center">Meu Dashboard</h1>
        </header>

        <!-- Seção de cartas do usuário -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Minhas Cartas</h2>
            <div class="mb-4">
                <button @click="openAddCardModal"
                    class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    Adicionar Nova Carta
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- Iterar sobre as cartas do usuário -->
                <div v-for="card in myCards" :key="card.id"
                    class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h3 class="font-bold text-xl">{{ card.name }}</h3>
                    <img :src="card.imageUrl" :alt="`Imagem de ${card.name}`" class="w-full h-48 object-cover mt-2 mb-4">
                    <p class="p-4">{{ card.description }}</p>
                    <!-- Botões de ação para cada carta -->
                    <div class="p-4">
                        <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button>
                        <button class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Remover</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal para adição/edição de carta -->
        <div v-if="showAddCardModal"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-10">
            <div class="bg-white p-4 rounded-lg shadow-lg relative">
                <!-- Botão para fechar o modal -->
                <button @click="showAddCardModal = false"
                    class="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-900">
                    <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.934 2.935a1 1 0 0 1-1.414-1.414l2.934-2.935-2.934-2.935a1 1 0 0 1 1.414-1.414l2.934 2.935 2.934-2.935a1 1 0 0 1 1.414 1.414L11.414 10l2.934 2.935a1 1 0 0 1 0 1.414z" />
                    </svg>
                </button>

                <div class="mb-4">
                    <label for="card-select" class="block text-gray-700 text-sm font-bold mb-2">
                        Selecione uma carta para adicionar:
                    </label>
                    <select id="card-select"
                        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="card in availableCards" :key="card.id" :value="card.id">
                            {{ card.name }}
                        </option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button @click="addSelectedCard"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Adicionar à Coleção
                    </button>
                </div>
            </div>
        </div>

        <!-- Seção de solicitações de troca do usuário -->
        <section>
            <h2 class="text-2xl font-bold mb-4">Minhas Solicitações de Troca</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Iterar sobre as solicitações de troca -->
                <div v-for="trade in myTrades" :key="trade.id" class="border p-4 rounded-lg shadow-md">
                    <h3 class="font-bold">{{ trade.title }}</h3>
                    <p>{{ trade.description }}</p>
                    <!-- Detalhes e botões de ação para cada solicitação -->
                    <button class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Ver Detalhes</button>
                    <button class="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Editar</button>
                    <button class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancelar</button>
                </div>
                <div class="mb-4">
                    <button @click="openTradeModal"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Criar Solicitação de Troca
                    </button>
                </div>
                
            </div>
        </section>
        <!-- Modal de troca -->
        <div v-if="showTradeModal"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div class="bg-white p-4 rounded-lg shadow-lg">
                <!-- Conteúdo do Modal -->
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Criar Solicitação de Troca</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">Escolha as cartas para oferecer e receber na troca.</p>
                    </div>
                </div>
                <div class="mt-4">
                    <!-- Seleção de cartas aqui -->
                </div>
                <div class="flex items-center justify-end mt-4">
                    <button @click="showTradeModal = false"
                        class="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancelar
                    </button>
                    <button @click="createTrade"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Criar Troca
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { httpClient } from '@/utils/httpClient';

export default {
    name: 'DashboardScreen',
    data() {
        return {
            myCards: [],  // Cartas do usuário
            myTrades: [], // Solicitações de troca do usuário
            showAddCardModal: false,
            availableCards: [],
            currentPage: 1,
            moreAvailable: true,
            showTradeModal: false,
        };
    },
    created() {
        this.fetchMyCards();
        this.fetchMyTrades();
    },
    methods: {
        async fetchMyCards() {
            try {
                const response = await httpClient.get('/me/cards');
                this.myCards = response.data;
            } catch (error) {
                console.error(error);
                // Trate o erro conforme necessário
                alert('Erro ao exibir as cartas.');
            }
        },
        async fetchMyTrades() {
            try {
                const response = await httpClient.get('/trades');
                this.myTrades = response.data;
            } catch (error) {
                console.error(error);
                // Trate o erro conforme necessário
            }
        },
        async fetchAvailableCards() {
            try {
                const response = await httpClient.get('/cards', {
                    params: { rpp: 10, page: this.currentPage }
                });
                this.availableCards = response.data.list;
                this.moreAvailable = response.data.more;
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar cartas disponíveis.');
            }
        },
        openAddCardModal() {
            this.showAddCardModal = true;
            this.fetchAvailableCards();
        },
        openTradeModal() {
            this.showTradeModal = true;
        }
    },
};
</script>
  