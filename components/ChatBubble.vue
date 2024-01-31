<script setup lang="ts">
// @ts-expect-error I couldn't find any types for vue 3 markdownit
import Markdown from "vue3-markdown-it";
import {  computed } from "vue";


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

const props = defineProps<{
  message?: Message;
  user?: User;
  myMessage?: boolean;
}>();

const isDeejarBot = computed(() => {
    return  props.user?.name ===  "DeejarhBot"
    

});
</script>
<template>
  <div
    class="chat"
    :class="{
      'chat-end': myMessage,
      'chat-start': !myMessage,
    }"
  >
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user?.avatar" />
      </div>
    </div>
    <div class="chat-header mb-2">
      {{ user?.name }}
      <time v-if="message" class="text-xs opacity-50">{{
        useTimeAgo(message?.createdAt).value
      }}</time>
    </div>
    <div v-if="isDeejarBot"
      class="chat-bubble py-0 prose prose-sm  bg-green-100 dark:bg-green-950 max-w-max w-full"
     
    >
      <slot>
        <Markdown :source="message?.text" class="w-full" />
      </slot>
    </div>
    <div v-else
      class="chat-bubble py-0 prose prose-sm bg-white dark:bg-gray-900 max-w-max w-full"
     
    >
      <slot>
        <Markdown :source="message?.text" class="w-full" />
      </slot>
    </div>
  </div>
</template>
<style scoped>
:deep(code) {
  background: none;
  @apply overflow-x-auto w-full;
}
:deep(pre) {
  @apply dark:bg-[#75c776d6] overflow-x-auto w-full;
}
</style>
