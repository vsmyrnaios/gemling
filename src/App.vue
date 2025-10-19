<!--<script setup>
import { ref, onMounted } from "vue";
import Account from "./components/Account.vue";
import Auth from "./components/Auth.vue";
import Tasks from "./components/Tasks.vue";
import { supabase } from "./lib/supabase";


// auth = login screen, αλλιώς δείχνουμε το κατάλληλο tab
const session = ref(null);
const currentPage = ref("auth");

function navigate(page) {
  currentPage.value = page;
  localStorage.setItem("lastPage", page); // αποθήκευση επιλογής
}

function logout() {
  supabase.auth.signOut();
  currentPage.value = "auth";
  localStorage.removeItem("lastPage"); // καθάρισε μετά το logout
}

onMounted(() => {
  const savedPage = localStorage.getItem("lastPage");

  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    if (session.value) {
      currentPage.value = savedPage || "account";
    }
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    if (_session) {
      currentPage.value = localStorage.getItem("lastPage") || "account";
    } else {
      currentPage.value = "auth";
    }
  });
});
</script>

<template>
   <div class="min-h-screen">
  
    <Auth v-if="!session" />

    <div v-else>

      <div style="margin-bottom: 20px">
        <button @click="navigate('account')">Account</button>
        <button @click="navigate('tasks')">Tasks</button>
        <button @click="logout">Logout</button>
      </div>

      <Account v-if="currentPage === 'account'" :session="session" />
      <Tasks v-if="currentPage === 'tasks'" />

    </div>
  </div>
</template>-->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Αν δεν έχει γίνει login -->
    <Auth v-if="!session" />

    <!-- Αν έχει γίνει login -->
    <div v-else class="max-w-3xl mx-auto py-8 px-4">
      <!-- Μενού Πλοήγησης -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          title="Account"
          @click="navigate('account')"
          class="p-3 rounded-xl border border-blue-300 bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
        >
        <span class="material-icons">person</span>
        </button>
        <button
          title="Tasks"
          @click="navigate('tasks')"
          class="p-3 rounded-xl border border-purple-300 bg-purple-50 text-purple-500 hover:bg-purple-100 transition"
        >
        <span class="material-icons">assignment</span>
        </button>
       
        <button
          title="Logout"
          @click="logout"
          class="p-3 rounded-xl border border-red-300 bg-red-50 text-red-500 hover:bg-red-100 transition"
        >
        <span class="material-icons">logout</span>
        </button>
      </div>

      <!-- Περιεχόμενο -->
      <div>
        <Account v-if="currentPage === 'account'" :session="session" />
        <Tasks v-if="currentPage === 'tasks'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Account from "./components/Account.vue";
import Auth from "./components/Auth.vue";
import Tasks from "./components/Tasks.vue";
import { supabase } from "./lib/supabase";



const session = ref(null);
const currentPage = ref("auth");

function navigate(page) {
  currentPage.value = page;
  localStorage.setItem("lastPage", page);
}

function logout() {
  supabase.auth.signOut();
  currentPage.value = "auth";
  localStorage.removeItem("lastPage");
}

onMounted(async () => {
  // 🧩 Αυτή είναι η κρίσιμη γραμμή
  if (window.location.hash && window.location.hash.includes("access_token")) {
    await supabase.auth.exchangeCodeForSession(window.location.hash);
    window.location.hash = "";
  }

  const savedPage = localStorage.getItem("lastPage");

  const { data } = await supabase.auth.getSession();
  session.value = data.session;

  if (session.value) {
    currentPage.value = savedPage || "account";
  }

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    if (_session) {
      currentPage.value = "account";
    } else {
      currentPage.value = "auth";
    }
  });
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

span{
  font-size: 40px;
}
</style>

