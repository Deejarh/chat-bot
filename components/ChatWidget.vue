
<script setup lang="ts">
import { nanoid } from "nanoid";
import ChatIcon from "@/assets/icons/ChatIcon.vue";

const isOpenChatBox = ref(false)
const toggleChatBox = () => {
    isOpenChatBox.value = !isOpenChatBox.value
}



</script>
<template>
  <div class=" w-full px-1">
    <div @click="toggleChatBox" class=" flex items-center justify-center cursor-pointer " v-show="!isOpenChatBox">
    <span>Chat with Deejarh </span>
    <button  class="  p-1 rounded ">
      <chat-icon class="h-5 w-5 lg:h-6 lg:w-6 mt-1 ml-1 text-red-950" />
    </button>
</div>

    <div
    v-if="isOpenChatBox"
    class="box bg-gray-300 dark:bg-gray-800 rounded  overflow-hidden w-full"
  >
    <!-- Header -->
    <header
      class="dark:bg-gray-900 bg-gray-200 flex justify-between items-center w-full px-1"
    >
       Support Chat

       <div @click="toggleChatBox" class=" cursor-pointer p-2 rounded-md  bg-red-950">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</div>
    </header>
    <!-- Messages -->
    <div class="messages p-4 overflow-y-scroll max-h-[80vh]" ref="messageBox">
      <div  class="text-center w-[350px] m-auto">
        <strong class="text-lg flex items-center justify-center gap-x-1">Chat with DeejarhBot<span class="">  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </span></strong>
        <strong class="block mt-10">Go ahead and ask something:</strong>
        <ul class="list-inside list-disc text-left">
          <li>How can I get human support?</li>
          <li>How was this tool built?</li>
          <li>What is your github name?</li>
        </ul>
      </div>
    
    </div>
    <!-- Footer -->
    <footer class="p-2">
      <input
        ref="input"
        class="input w-full  px-2 block"
        type="text"
        placeholder="Type your message"
      />
    </footer>
  </div>
    
  </div>
</template>
