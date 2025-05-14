<template>
    <div :class="['main-content', { 'sidebar-open': isSidebarOpen }]">
        <Dashboard />
        <SideBarDashboard />
        <BotStatus />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import SideBarDashboard from '@/components/DashboardSidebar.vue';
import Dashboard from '@/components/DashboardMonitor.vue';
import BotStatus from '@/components/DashboardStatus.vue';

const isSidebarOpen = ref(true); // Assuming you have a way to track this
</script>

<style>

.main-content.sidebar-open {
    max-width: 60%;
}

.main-content {
    display: block;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
    margin: 1rem auto;
}
  
</style>