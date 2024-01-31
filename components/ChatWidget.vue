<script setup lang="ts">
import { nanoid } from "nanoid";
import anime from "animejs";
import { ref, onMounted, computed } from "vue";

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
const isUserMe = computed(() => {
    const currentUser = usersTyping.value.map((user) => user.name ===  "You")
    return currentUser.length > 0

});
const messages = ref<Message[]>([]);

const usersTyping = ref<User[]>([]);
const animatedElement = ref(null);
const avatarElement = ref(null);
const arrowIcon = ref(null);
const input = ref('');
const userInput = ref('')

async function handleNewMessage(message: Message) {
  messages.value.push(message);
  userInput.value = ''
  usersTyping.value.push(bot.value);
  try {
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
  } catch (error) {
    const msg = {
      id: nanoid(),
      userId: bot.value.id,
      createdAt: new Date(),
      text: "Something went wrong😔, please try again",
    };
    messages.value.push(msg);
    usersTyping.value = [];

    if (error.response) {
      console.error("Response data:", error.response._data.message);
      console.error("Status code:", error.response.status);
    }
  }
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
const isOpenChatBox = ref(false);
const toggleChatBox = () => {
  isOpenChatBox.value = !isOpenChatBox.value;
  animateText();
  animateAvatar();
};

function getUser(id: string) {
  return users.value.find((user) => user.id === id);
}

watch(isOpenChatBox, () => {
  if (!isOpenChatBox.value) return;
  nextTick(() => {
    (userInput.value as unknown as HTMLInputElement).focus();
  });
});
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

const animateText = () => {
  const text = animatedElement.value?.innerText;
  animatedElement.value.innerHTML = "";

  const letterSpans = text.split("").map((letter, index) => {
    const span = document.createElement("span");
    span.innerHTML = letter;
    animatedElement.value.appendChild(span);

    return span;
  });

  // Animate each letter
  anime({
    targets: letterSpans,
    translateX: (letter, index) => 10 * index,
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: (letter, index) => 100 * index, // Adjust the delay between letter animations
  });
};
const animateAvatar = () => {
  anime({
    targets: avatarElement.value,
    translateY: [50, 0],
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1500,
  });
};
const animateIcon = () => {
    anime({
    targets: arrowIcon.value,
    opacity: 1,
    duration: 1000,
    easing: 'easeInOutQuad',
  });
};

onMounted(() => {
animateIcon()
  animateText();
  animateAvatar();
});
</script>
<template>
  <div class="w-full">
<div @click="toggleChatBox" v-show="!isOpenChatBox">
    <div class="flex items-center justify-center mb-3 lg:mb-1">
        <span>Click to chat with me</span>
        <svg
        ref="arrowIcon"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 0 1 1 1v12.586l3.707-3.707a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 15.586V3a1 1 0 0 1 1-1z"
        />
      </svg>
      </div>
    <div
      
      class="flex items-center justify-center cursor-pointer"
    >
      <div ref="animatedElement" class="ml9 mr-2 text-lg lg:text-5xl">
        Chat with DeejarhBot
      </div>
      <div class="chat-image avatar" ref="avatarElement">
        <div class="w-10 lg:w-24 rounded-full">
          <img :src="bot?.avatar" />
        </div>
      </div>
    </div>
</div>

    <div
      v-if="isOpenChatBox"
      class="box bg-gray-300 dark:bg-gray-800 rounded w-[380px] overflow-hidden"
    >
      <!-- Header -->
      <header
        class="dark:bg-gray-900 bg-gray-200 flex justify-between items-center w-full px-3 py-2 rounded-t-md"
      >
        Deejar Bot

        <div
          @click="toggleChatBox"
          class="cursor-pointer p-3 rounded-md shadow bg-gray-950"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </header>
      <!-- Messages -->
      <div class="messages p-4 overflow-y-scroll max-h-[80vh]" ref="messageBox">
        <div v-if="!messages.length" class="text-center w-[350px] m-auto">
          <strong
            class="text-lg font-medium flex items-center justify-center gap-x-1"
            >Chat with me<span class="ml-2">
              <div class="chat-image avatar" ref="avatarElement">
                <div
                  class="w-10 ring ring-gray-900 ring-offset-base-100 ring-offset-2 rounded-full"
                >
                  <img :src="bot?.avatar" alt="Avatar" />
                </div>
              </div> </span
          ></strong>
          <strong class="block lg:mt-10 mt-5"
            >Go ahead and ask something:</strong
          >
          <ul class="list-inside list-disc text-left text-xs mt-2 lg:text-sm">
            <li>Who are you?</li>
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
        <div class=" flex  gap-x-2  p-2 rounded">
          <input
          v-model="userInput"
            ref="input"
            class="input w-full px-2 block"
            type="text"
            placeholder="Type your message"
            @keypress.enter="
              handleNewMessage({
                id: nanoid(),
                userId: me.id,
                createdAt: new Date(),
                text: ($event.target as HTMLInputElement).value,
              });
              ($event.target as HTMLInputElement).value = '';

            "
          />

          <div
            v-show="!isUserMe"
            class=" text-xs  flex items-center justify-center shadow-sm  px-2 bg-gray-900   rounded-xl hover:bg-gray-950 focus:outline-none"
            :class="[userInput ? ' cursor-pointer' : 'cursor-not-allowed' ]"
            v-on="userInput ? { click: () => 
        handleNewMessage({
          id: nanoid(),
          userId: me.id,
          createdAt: new Date(),
          text: userInput,
        }) } : {}"
          >
          <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 font-bold text-white mb-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a1 1 0 0 1-1-1v-6.586l-4.707 4.707a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0l6 6a1 1 0 1 1-1.414 1.414L11 10.414V17a1 1 0 0 1-1 1z"
          />
        </svg>
          </div>
        </div>

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
