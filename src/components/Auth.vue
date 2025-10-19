<!--<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabase";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Welcome to the To Do List</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          required
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>-->
<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabase";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      emailRedirectTo: 'https://vsmyrnaios.github.io/to-do-app/'

    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
    <form
      @submit.prevent="handleLogin"
      class="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-800 space-y-6"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-4">
        <svg
          class="w-16 h-16 text-cyan-400"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9m19.5 0L12 13.5 2.25 7.5m19.5 0A2.25 2.25 0 0019.5 6H4.5a2.25 2.25 0 00-2.25 1.5"
          />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-semibold text-white">Welcome to the To Do List</h1>
      <p class="text-gray-400 text-sm">Sign in via magic link with your email below</p>

      <!-- Input -->
      <input
        v-model="email"
        required
        type="email"
        placeholder="Your email"
        class="w-full py-2 px-4 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <!-- Submit Button -->
      <input
        type="submit"
        :value="loading ? 'Loading...' : 'Send Magic Link'"
        :disabled="loading"
        class="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </form>
  </div>
</template>
