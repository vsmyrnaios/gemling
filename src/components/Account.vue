<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../lib/supabase";
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const router = useRouter();
const loading = ref(true);
document.title = "Gemmed Tasks|Login";
const email = ref(""); 
const username = ref("");
const website = ref("");
const avatar_url = ref("");

let initialized = false;

watch(
  () => session.value,
  () => {
    if (session.value?.user && !initialized) {
      email.value = session.value.user.email || "";
      initialized = true;
    }
  },
  { immediate: true }
);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <form
    class="shadow-xl rounded-2xl p-6 max-w-md mx-auto space-y-6"
    @submit.prevent="updateProfile"
  >
    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        id="email"
        type="text"
        v-model="email"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <!-- Name -->
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input
        id="username"
        type="text"
        v-model="username"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <!-- Website -->
    <div>
      <label for="website" class="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        id="website"
        type="text"
        v-model="website"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <!-- Submit -->
    <div class="update">
      <input
        type="submit"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
        class="w-full py-2 px-4 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  </form>
</template>

<style scoped>
form{
  background-color: #EFF3EA;
}


.update{
  background-color: #4E6688;
}

.update:hover{
  background-color:#3f526e;
}
</style>
