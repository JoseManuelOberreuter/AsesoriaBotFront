<template>
    <div class="main-content">
    <Dashboard />
    <SideBarDashboard />
    <BotStatus />
    </div>
</template>
<script setup>
import SideBarDashboard from '@/components/DashboardSidebar.vue';
import Dashboard from '@/components/DashboardMonitor.vue';
import BotStatus from '@/components/DashboardStatus.vue';
</script>

<style>

.main-content {
    display: block;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
    margin: 1rem auto;
}
  
</style>