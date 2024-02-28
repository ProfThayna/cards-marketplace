<template>
  <div>
    <!-- Navegação -->
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a class="text-xl font-bold" href="/">Cards Marketplace</a>
        <div>
          <router-link class="p-2" to="/">Home</router-link>
          <router-link class="p-2" to="/dashboard">Dashboard</router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

