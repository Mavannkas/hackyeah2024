<template>
  <div
    class="sticky bottom-0 left-0 z-50 mt-auto h-16 min-h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700"
  >
    <div class="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
      <RouterLink
        :to="ROUTING_URLS.SEARCH"
        class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        :class="currentPath === ROUTING_URLS.SEARCH ? 'text-primary-600 dark:text-primary-500' : ''"
      >
        <svg
          class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
        <span
          class="text-sm text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
          :class="
            currentPath === ROUTING_URLS.SEARCH ? 'text-primary-600 dark:text-primary-500' : ''
          "
          >Szukaj</span
        >
      </RouterLink>
      <RouterLink
        :to="ROUTING_URLS.MAP"
        class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <svg
          class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
          :class="currentPath === ROUTING_URLS.MAP ? 'text-primary-600 dark:text-primary-500' : ''"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
            clip-rule="evenodd"
          />
        </svg>

        <span
          class="text-sm text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
          :class="currentPath === ROUTING_URLS.MAP ? 'text-primary-600 dark:text-primary-500' : ''"
          >Mapa</span
        >
      </RouterLink>
      <RouterLink
        :to="ROUTING_URLS.ROUTES"
        class="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <svg
          class="mb-1 h-5 w-5 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
          :class="
            currentPath === ROUTING_URLS.ROUTES ? 'text-primary-600 dark:text-primary-500' : ''
          "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M19 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M12 19l0 -4l-3 -3l5 -4l2 3l3 0" />
          <path d="M17 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>

        <span
          class="text-sm text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
          :class="
            currentPath === ROUTING_URLS.ROUTES ? 'text-primary-600 dark:text-primary-500' : ''
          "
          >Trasy</span
        >
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTING_URLS } from '@/router'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => {
  console.log(route.path)
  return route.path
})
</script>
