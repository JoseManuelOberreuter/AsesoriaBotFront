<template>
  <div id="app">
    <main>
      <!-- Este se encarga de renderizar la vista correspondiente a la ruta actual -->
      <router-view />
    </main>
  </div>
</template>

<script>
import '@/styles/index.css';
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-primary);
  background-color: var(--color-background);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}



main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
