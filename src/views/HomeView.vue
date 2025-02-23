<template>
    <div id="app">
        <!-- <SideBarChats></SideBarChats> -->
        <SideBarMenu></SideBarMenu>
        <main>
            <ChatBot />
        </main>
    </div>
</template>

<script setup>
import SideBarChats from '@/components/SideBarChats.vue';
import SideBarMenu from '@/components/SideBarMenu.vue';
import ChatBot from '@/components/ChatBot.vue';


</script>