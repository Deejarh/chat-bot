
<script setup lang="ts">
import { nanoid } from "nanoid";
import anime from 'animejs'

export interface User {
  id: string;
  avatar: string;
  name: string;
}
export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  text: string;
}

const me = ref<User>({
  id: "user",
  avatar: "/user.jpeg",
  name: "You",
});
const bot = ref<User>({
  id: "assistant",
  avatar: "/deejarh.jpg",
  name: "DeejarhBot",
});

const users = computed(() => [me.value, bot.value]);
const messages = ref<Message[]>([]);

const usersTyping = ref<User[]>([]);

async function handleNewMessage(message: Message) {
  messages.value.push(message);
  usersTyping.value.push(bot.value);
  const res = await $fetch("/api/ai", {
    method: "POST",
    body: {
      messages: messagesForApi.value,
    },
  });

  if (!res.choices[0].message?.content) return;

  const msg = {
    id: res.id,
    userId: bot.value.id,
    createdAt: new Date(),
    text: res.choices[0].message?.content,
  };
  messages.value.push(msg);
  usersTyping.value = [];
}


 const messagesForApi = computed(
  () =>
    messages.value
      .map((m) => ({
        role: m.userId,
        content: m.text,
      }))
      .slice(-50) // finish_reason: "length"
);
const isOpenChatBox = ref(false)
const toggleChatBox = () => {
    isOpenChatBox.value = !isOpenChatBox.value
}

function getUser(id: string) {
  return users.value.find((user) => user.id === id);
}
const messageBox = ref();
watch(
  () => messages,
  () => {
    nextTick(
      () => (messageBox.value.scrollTop = messageBox.value.scrollHeight)
    );
  },
  { deep: true }
);

// Wrap every letter in a span anime
var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent?anime.timeline({loop: true})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


</script>
<template>
  <div class=" w-full ">

    <h1 class="ml9">
        <span class="text-wrapper">
          <span class="letters">Coffee mornings</span>
        </span>
      </h1>
    <div @click="toggleChatBox" class=" flex items-center justify-center cursor-pointer " v-show="!isOpenChatBox">
    <span class=" mr-2">Chat with DeejarhBot </span>
    <div class="chat-image avatar">
        <div class="w-10 lg:w-16 rounded-full">
          <img :src="bot?.avatar" />
        </div>
      </div>
</div>

    <div
    v-if="isOpenChatBox"
    class="box bg-gray-300 dark:bg-gray-800 rounded w-[380px] overflow-hidden  "
  >
    <!-- Header -->
    <header
      class="dark:bg-gray-900 bg-gray-200 flex justify-between items-center w-full px-1  py-2 rounded-t-md"
    >
       Support Chat

       <div @click="toggleChatBox" class=" cursor-pointer p-3 rounded-md   bg-red-950">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</div>
    </header>
    <!-- Messages -->
    <div class="messages p-4 overflow-y-scroll max-h-[80vh]" ref="messageBox">
      <div  v-if="!messages.length"  class="text-center w-[350px] m-auto">
        <strong class="text-lg font-medium flex items-center justify-center gap-x-1">Chat with me<span class=" ml-2"> 
            <div class="chat-image avatar">
                <div class="w-10 ring  ring-gray-900 ring-offset-base-100 ring-offset-2  rounded-full">
                  <img :src="bot?.avatar" />
                </div>
              </div>
        </span></strong>
        <strong class="block lg:mt-10 mt-5 ">Go ahead and ask something:</strong>
        <ul class="list-inside list-disc text-left text-xs mt-2 lg:text-sm">
          <li>How can I get human support?</li>
          <li>How was this tool built?</li>
          <li>What is your github name?</li>
        </ul>
      </div>

      <ChatBubble
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :user="getUser(message.userId)"
      :my-message="message.userId === me.id"
    />
    <ChatBubble v-for="user in usersTyping" :key="user.id" :user="user">
        <AppLoading />
      </ChatBubble>
    
    </div>
    <!-- Footer -->
    <footer class="p-2">
      <input
        ref="input"
        class="input w-full  px-2 block"
        type="text"
        placeholder="Type your message"
        @keypress.enter="handleNewMessage
        ( {
          id: nanoid(),
          userId: me.id,
          createdAt: new Date(),
          text: ($event.target as HTMLInputElement).value,
        });
        ($event.target as HTMLInputElement).value = '';
      "
      />

      <div class="h-6 py-1 px-2 text-sm italic">
        <span v-if="usersTyping.length">
          {{ usersTyping.map((user) => user.name).join(" and ") }}
          {{ usersTyping.length === 1 ? "is" : "are" }} typing
        </span>
      </div>


      
    </footer>
  </div>
    
  </div>
</template>
<style>
.ml9 {
    position: relative;
    font-weight: 200;
    font-size: 4em;
  }
  
  .ml9 .text-wrapper {
    position: relative;
    display: inline-block;
    padding-top: 0.2em;
    padding-right: 0.05em;
    padding-bottom: 0.1em;
    overflow: hidden;
  }
  
  .ml9 .letter {
    transform-origin: 50% 100%;
    display: inline-block;
    line-height: 1em;
  }

</style>