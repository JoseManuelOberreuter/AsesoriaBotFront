<script setup>
import Header from '../src/components/Header.vue'
import Sidebar from '../src/components/Sidebar.vue'
import ChatBot from '../src/components/ChatBot.vue'
</script>

<template>
  <main id="app">
    <Header />
    <Sidebar />
    <ChatBot />
  </main>
</template>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #333;
    color: white;
    margin: 0;
    padding: 0;
    height: 100vh; 
    width: 100vw;
  }
</style>
