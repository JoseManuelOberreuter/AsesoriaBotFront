<template>
    <div class="main-content">
      <main class="dashboard-content">
        <h1>Dashboard</h1>
        <p>Monitor and manage your bot performance</p>
        <div class="stats">
          <div class="stat-card">
            <h2>Active Bots</h2>
            <p>12</p>
          </div>
          <div class="stat-card">
            <h2>Conversations</h2>
            <p>1458</p>
          </div>
          <div class="stat-card">
            <h2>Users</h2>
            <p>3642</p>
          </div>
          <div class="stat-card">
            <h2>Issues</h2>
            <p>5</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
<script setup>
import BotStatus from './DashboardStatus.vue';
</script>
  
<style>  
  
  .dashboard-content {
    text-align: justify;
    background: var(--color-light-secondary);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .stats {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .stat-card {
    background: var(--color-secondary);
    padding: 20px;
    width: 100px;
    max-width: 200px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
    text-align: center;
    color: var(--color-light-secondary);
  }
  
  .stat-card h2 {
    font-size: 14px;
  }
  
  .stat-card p {
    font-size: 24px;
    font-weight: bold;
    margin-top: 5px;
  }
</style>