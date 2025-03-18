<template>
    <div class="bot-status">
      <h2>Bot Status</h2>
      <table>
        <thead>
          <tr>
            <th>Bot</th>
            <th>Status</th>
            <th>Uptime</th>
            <th>Conversations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bot in bots" :key="bot.id">
            <td>
              <div class="bot-info">
                <div class="bot-icon">🤖</div>
                <div>
                  <span class="bot-name">{{ bot.name }}</span>
                  <span class="bot-type">{{ bot.type }}</span>
                </div>
              </div>
            </td>
            <td>
              <span :class="['status', bot.status.toLowerCase()]">{{ bot.status }}</span>
            </td>
            <td>{{ bot.uptime }}</td>
            <td>{{ bot.conversations }}</td>
            <td>
              <button class="action-btn">Edit</button>
              <button class="action-btn">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const bots = ref([
    { id: 1, name: "SupportBot", type: "Customer Support", status: "Online", uptime: "24h", conversations: 120 },
    { id: 2, name: "FinanceBot", type: "Financial Assistant", status: "Maintenance", uptime: "12h", conversations: 89 },
    { id: 3, name: "HRBot", type: "Human Resources", status: "Offline", uptime: "0h", conversations: 45 },
    { id: 4, name: "DevBot", type: "Developer Assistant", status: "Online", uptime: "48h", conversations: 200 },
    { id: 5, name: "SalesBot", type: "Sales & Marketing", status: "Online", uptime: "36h", conversations: 150 },
  ]);
  </script>
  
  <style>
  .bot-status {
    margin-top: 20px;
    background: var(--color-light-secondary);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: left;
    margin-bottom: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
  }
  
  th {
    background: var(--color-secondary);
    color: var(--color-light-secondary);
  }
  
  tr:nth-child(even) {
    background: var(--color-light-secondary);
  }
  
  .status {
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .online { background: #c6f6d5; color: #2f855a; }
  .maintenance { background: #fcd34d; color: #b45309; }
  .offline { background: #feb2b2; color: #c53030; }
  
  .bot-info {
    display: flex;
    align-items: center;
  }
  
  .bot-icon {
    width: 32px;
    height: 32px;
    background: var(--color-secondary);
    color: var(--color-light-secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  
  .bot-name {
    font-weight: bold;
  }
  
  .bot-type {
    display: block;
    font-size: 12px;
    color: var(--color-dark-secondary);
  }
  
  .action-btn {
    background: none;
    border: none;
    color: var(--color-primary);
    cursor: pointer;
    margin-right: 10px;
  }
  </style>
  