<script setup>
//backup for gem calculation
//const completedTasks = computed(() => Array.isArray(tasks.value) ? tasks.value.filter(t => t.completed) : []);
//const gems = computed(() => completedTasks.value.length * 10);
import { ref, onMounted,computed} from "vue";
import { supabase } from "../lib/supabase";



const taskInput = ref("");
const taskDate = ref("");
const taskTime = ref("");
const taskPriority = ref("low");
const tasks = ref([]);
const gems = ref(0);
const currentTheme = ref("theme-Default");
const themes =[
  "theme-Default",
  "theme-Dark",
  "theme-Light",
];

const ownedThemes = ref(["theme-Default"]);
const info = ref(false);


function buyTheme(theme) {
  if (ownedThemes.value.includes(theme)) {
    return false; 
  }

  
  if (gems.value >= 50) {
    gems.value -= 50;
    ownedThemes.value.push(theme);
    saveTasks(); 
    return true; 
  } else {
    alert("You don't have enough gems!");
    return false; 
  }
}

function handleThemeClick(theme) {
  if (ownedThemes.value.includes(theme)) {
    applyTheme(theme);
  } else {
    const success = buyTheme(theme);
    if (success) {
      applyTheme(theme);
    }
  }
}


function applyTheme(theme) {
  currentTheme.value = theme;
  saveTasks();
}

// --- Tasks ---
function addTask() {
  if (!taskInput.value || !taskDate.value || !taskTime.value) return;

  const priorityIcons = { low: "south_east", medium: "east", high: "call_made" };

  const newTask = {
    text: taskInput.value,
    date: taskDate.value,
    time: taskTime.value,
    priority: taskPriority.value,
    icon: priorityIcons[taskPriority.value],
    completed: false,
  };

  tasks.value.push(newTask);


  saveTasks();


  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
  taskPriority.value = "low";
  
}
const sortToggle = ref(true);
const sortButtonText = ref("Newest to Oldest");


function sortTasksByDate(){
  tasks.value.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return sortToggle.value ? dateA - dateB : dateB - dateA;
  });
  sortToggle.value = !sortToggle.value;
  if (sortButtonText.value === "Newest to oldest") {
    sortButtonText.value = "Oldest to newest";
} else {
    sortButtonText.value = "Newest to oldest";
}


  saveTasks();
}




 

function toggleComplete(index) {
  const task = tasks.value[index];
  task.completed = !task.completed;

  if (task.completed) {
    gems.value += 10;
  }

  saveTasks();
}

function deleteTask(index) {
  tasks.value.splice(index,1);
  saveTasks();
}

// --- Save / Load ---
async function saveTasks() {
  const userId = await getUserId();
  localStorage.setItem(`gems_${userId}`, gems.value);
  localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks.value));
  localStorage.setItem(`currentTheme_${userId}`, currentTheme.value);
  localStorage.setItem(`ownedThemes_${userId}`, JSON.stringify(ownedThemes.value));

}

async function loadTasks() {
  const userId = await getUserId();
  const savedTasks = localStorage.getItem(`tasks_${userId}`);
  const savedGems = localStorage.getItem(`gems_${userId}`);
  const savedTheme = localStorage.getItem(`currentTheme_${userId}`);
  const savedOwnedThemes = localStorage.getItem(`ownedThemes_${userId}`);
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
  gems.value = savedGems ? Number(savedGems) : 0; 
  currentTheme.value = savedTheme ? savedTheme : "theme-Default";
  ownedThemes.value = savedOwnedThemes ? JSON.parse(savedOwnedThemes) : ["theme-Default"];
}

// --- Get User ID ---
async function getUserId(){
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || "guest"; 
}

// --- Mounted ---
onMounted(() => {
  loadTasks();
});
</script>


<template>
<div style="position: absolute; top: 20px; right: 100px; z-index: 1000;">
<button class="faq-button" @click="info = !info">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path
        d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
      ></path>
    </svg>
  </button>

  <!-- Container με πληροφορίες -->
  <div
      v-if="info"
      class="info-container"
      style="position: absolute; top: 60px; left: 50%; transform: translateX(-50%);
             background: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
             color: white;
             padding: 15px;
             z-index: -1000;
             border-radius: 10px;
             box-shadow: 0px 10px 20px rgba(0,0,0,0.2);
             width: 250px;">
      <p>Welcome to Gemmed Tasks! Fill in your task's info and maximize your productivity. </p>
      <p>Complete tasks to earn gems. Use your gems to unlock unique themes to customize your workspace.</p>
      <p>Note that: 
        <br>One completed task gives 10 gems.</br>
        <br>Each theme costs 50 gems.</br>
      </p>
    </div>
    </div>
  <div :class="['max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-md space-y-6 font-sans', currentTheme]">
    
    <div class="flex justify-between items-center mb-6">

   


      <div
        class="text-black px-4 py-2 rounded-lg  flex items-center gap-2"
        title="Available gems"
      >
        <span class="material-icons text-[#61D11D]" style="font-size: 20px;">
          diamond
        </span>
        <span class="gems-counter">{{ gems }}</span>
      </div>

      <label class="main">
    Switch Theme
    <input class="inp" checked="" type="checkbox" />
    <div class="bar">
      <span class="top bar-list"></span>
      <span class="middle bar-list"></span>
      <span class="bottom bar-list"></span>
    </div>
    <section class="menu-container">
      <div class="mb-6">
      <div class="flex flex-col gap-2">
        <button
  v-for="theme in themes"
  :key="theme"
  @click="handleThemeClick(theme)"
  :class="[
    'px-3 py-1 rounded border',
    currentTheme === theme ? 'bg-purple-500 text-white' : 'hover:bg-purple-300'
  ]"
>
  {{ theme.replace('theme-', '') }}
</button>

      </div>
    </div>
    </section>
  </label>
    </div>



    <!-- Input Section -->
    <div class="flex flex-wrap gap-3 items-center">
      <input
        v-model="taskInput"
        placeholder="Add a new task..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input type="date" v-model="taskDate" class="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none" />
      <input type="time" v-model="taskTime" class="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none" />
      <select v-model="taskPriority" class="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button @click="addTask" class="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
        Add Task
      </button>

      <div class="checkbox-wrapper-35" style="transform: scale(1.5); display: inline-block;">
        <input 
          value="private" 
          name="switch" 
          id="switch" 
          type="checkbox" 
          class="switch"
          @change="sortTasksByDate"
        >
        <label for="switch">
          <span class="switch-x-text">Sorted by </span>
          <span class="switch-x-toggletext">
            <span class="switch-x-unchecked"><span class="switch-x-hiddenlabel">Unchecked: </span>Newest</span>
            <span class="switch-x-checked"><span class="switch-x-hiddenlabel">Checked: </span>Oldest</span>
          </span>
        </label>
      </div>
    </div>

    <!-- Task List -->
    <ul class="space-y-4">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        :class="[
          'flex items-center justify-between p-4 rounded-lg shadow transition',
          task.completed ? 'bg-gray-200 line-through' : 'bg-white',
          task.priority === 'low' && !task.completed ? 'border-l-4 border-green-400' : '',
          task.priority === 'medium' && !task.completed ? 'border-l-4 border-yellow-400' : '',
          task.priority === 'high' && !task.completed ? 'border-l-4 border-red-400' : ''
        ]"
      >
        <div class="flex items-center gap-3">
          <span class="text-gray-600">
            <i class="material-icons">{{ task.icon }}</i>
          </span>
          <div class="text-gray-800">
            <p class="font-semibold">{{ task.text }}</p>
            <p class="text-sm text-gray-500">{{ task.date }}, {{ task.time }}</p>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <button
            v-if="!task.completed"
            @click="toggleComplete(index)"
            class="text-green-600 hover:text-green-800"
            title="Mark as done"
          >
            <span class="material-icons">check_circle</span>
          </button>
          <button
            v-if="!task.completed"
            @click="deleteTask(index)"
            class="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <span class="material-icons">delete_forever</span>
          </button>
          <button
            v-if="task.completed"
            @click="deleteTask(index)"
            class="text-gray-500 hover:text-gray-700"
            title="Delete completed"
          >
            <span class="material-icons">delete_outline</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>



<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}


.checkbox-wrapper-35 .switch {
  display: none;
}

.checkbox-wrapper-35 {
  margin-left: auto;  /* πάει δεξιά */
  margin-right: 20px;
}


.checkbox-wrapper-35 .switch + label {
  display: flex;
  align-items: center;       /* κάθετη ευθυγράμμιση */
  justify-content: flex-start; /* τα κείμενα μένουν στην ίδια ευθεία */
  color: #78768d;
  cursor: pointer;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 15px;
  position: relative;
  user-select: none;
 
  
}

.checkbox-wrapper-35 .switch + label::before,
.checkbox-wrapper-35 .switch + label::after {
  content: '';
  display: block;
}

.checkbox-wrapper-35 .switch + label::before {
  background-color: #05012c;
  border-radius: 500px;
  height: 15px;
  margin-right: 8px;
  transition: background-color 0.125s ease-out;
  width: 25px;
}

.checkbox-wrapper-35 .switch + label::after {
  background-color: #fff;
  border-radius: 13px;
  box-shadow: 0 3px 1px 0 rgba(37, 34, 71, 0.05),
              0 2px 2px 0 rgba(37, 34, 71, 0.1),
              0 3px 3px 0 rgba(37, 34, 71, 0.05);
  height: 13px;
  left: 1px;
  position: absolute;
  top: 1px;
  transition: transform 0.125s ease-out;
  width: 13px;
}

.checkbox-wrapper-35 .switch + label .switch-x-text {
  display: block;
  margin-right: .3em;
}

.checkbox-wrapper-35 .switch + label .switch-x-toggletext {
  display: block;
  font-weight: bold;
  height: 15px;
  overflow: hidden;
  position: relative;
  width: 50px;
}

.checkbox-wrapper-35 .switch + label .switch-x-unchecked,
.checkbox-wrapper-35 .switch + label .switch-x-checked {
  left: 0;
  position: absolute;
  top: 0;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out;
}

.checkbox-wrapper-35 .switch + label .switch-x-unchecked {
  opacity: 1;
  transform: none;
}

.checkbox-wrapper-35 .switch + label .switch-x-checked {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.checkbox-wrapper-35 .switch + label .switch-x-hiddenlabel {
  position: absolute;
  visibility: hidden;
}

.checkbox-wrapper-35 .switch:checked + label::before {
  background-color: #ffb500;
}

.checkbox-wrapper-35 .switch:checked + label::after {
  transform: translate3d(10px, 0, 0);
}

.checkbox-wrapper-35 .switch:checked + label .switch-x-unchecked {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.checkbox-wrapper-35 .switch:checked + label .switch-x-checked {
  opacity: 1;
  transform: none;
}

/* Θέματα */
.theme-Default {
  --bg: #FFF2E0;
  --bg-secondary: #C0C9EE;
  --primary: #A2AADB;
  --accent: #898AC4;

  --text-main: #000;   /* Κείμενο μαύρο για καλή αντίθεση */
  --text-special: #000; /* Gems πράσινο */
}

.theme-Default {
  background-color: var(--bg);
  color: var(--text-main);
}

/* Buttons */
.theme-Default button {
  background-color: var(--primary);
  color: var(--text-main);
  border: 1px solid var(--accent);
}

.theme-Default button:hover {
  background-color: var(--accent);
  color: #fff;
}

/* Dropdown */
.theme-Default select,
.theme-Default option {
  background-color: var(--bg-secondary);
  color: var(--text-main);
}

.theme-Default option:hover {
  background-color: var(--primary);
  color: var(--text-main);
}

/* Gems counter */
.theme-Default .gems-counter,
.theme-Default .gems-value {
  color: var(--text-special);
}


.theme-Dark {
  --bg: #090040;
  --bg-secondary: #471396;
  --primary: #B13BFF;
  --accent: #FFCC00;

  --text-main: #ffffff;   /* Γενικά κείμενα */
  --text-special: #ffffff; /* Gems counter πράσινο */
}

.theme-Dark {
  background-color: var(--bg);
  color: var(--text-main);
}

/* Buttons */
.theme-Dark button {
  background-color: var(--primary);
  color: var(--text-main);
  border: 1px solid var(--accent);
}

.theme-Dark button:hover {
  background-color: var(--accent);
  color: #000;
}

/* Dropdown */
.theme-Dark select,
.theme-Dark option {
  background-color: var(--bg-secondary);
  color: var(--text-main);
}

.theme-Dark option:hover {
  background-color: var(--primary);
  color: var(--text-main);
}

/* Ειδικά για gems counter */
.theme-Dark .gems-counter {
  color: var(--text-special);
}


.theme-Light {
  --bg: #799EFF;
  --bg-secondary: #FEFFC4;
  --primary: #FFDE63;
  --accent: #FFBC4C;
  --text: #000; /* Μαύρο για καλή αντίθεση */

  background-color: var(--bg);
  color: var(--text);
}

/* Buttons */
.theme-Light button {
  background-color: var(--primary);
  color: var(--text);
  border: 1px solid var(--accent);
}

.theme-Light button:hover {
  background-color: var(--accent);
  color: var(--text);
}

/* Dropdown */
.theme-Light select,
.theme-Light option {
  background-color: var(--bg-secondary);
  color: var(--text);
}

.theme-Light option:hover {
  background-color: var(--primary);
}


.main > .inp {
    display: none;
  }
  .main {
    font-weight: 800;
    color: white;
    background-color: darkviolet;
    padding: 3px 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 2.5rem;
    width: 12rem;
    position: relative;
    cursor: pointer;
    justify-content: space-between;
    z-index: 9999;
  }

  .arrow {
    height: 34%;
    aspect-ratio: 1;
    margin-block: auto;
    position: relative;
    display: flex;
    justify-content: center;
    transition: all 0.3s;
  }

  .arrow::after,
  .arrow::before {
    content: "";
    position: absolute;
    background-color: white;
    height: 100%;
    width: 2.5px;
    border-radius: 500px;
    transform-origin: bottom;
  }

  .arrow::after {
    transform: rotate(35deg) translateX(-0.5px);
  }
  .arrow::before {
    transform: rotate(-35deg) translateX(0.5px);
  }

  .main > .inp:checked + .arrow {
    transform: rotateX(180deg);
  }

  .menu-container {
    background-color: white;
    color: darkviolet;
    border-radius: 10px;
    position: absolute;
    width: 100%;
    left: 0;
    top: 130%;
    overflow: hidden;
    clip-path: inset(0% 0% 0% 0% round 10px);
    transition: all 0.4s;
  }

  .menu-list {
    --delay: 0.4s;
    --trdelay: 0.15s;
    padding: 8px 10px;
    border-radius: inherit;
    transition: background-color 0.2s 0s;
    position: relative;
    transform: translateY(30px);
    opacity: 0;
  }

  .menu-list::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    background-color: rgba(0, 0, 0, 0.3);
    width: 95%;
  }

  .menu-list:hover {
    background-color: rgb(223, 223, 223);
  }

  .inp:checked ~ .menu-container {
    clip-path: inset(10% 50% 90% 50% round 10px);
  }

  .inp:not(:checked) ~ .menu-container .menu-list {
    transform: translateY(0);
    opacity: 1;
  }

  .inp:not(:checked) ~ .menu-container .menu-list:nth-child(1) {
    transition:
      transform 0.4s var(--delay),
      opacity 0.4s var(--delay);
  }

  .inp:not(:checked) ~ .menu-container .menu-list:nth-child(2) {
    transition:
      transform 0.4s calc(var(--delay) + (var(--trdelay) * 1)),
      opacity 0.4s calc(var(--delay) + (var(--trdelay) * 1));
  }

  .inp:not(:checked) ~ .menu-container .menu-list:nth-child(3) {
    transition:
      transform 0.4s calc(var(--delay) + (var(--trdelay) * 2)),
      opacity 0.4s calc(var(--delay) + (var(--trdelay) * 2));
  }

  .inp:not(:checked) ~ .menu-container .menu-list:nth-child(4) {
    transition:
      transform 0.4s calc(var(--delay) + (var(--trdelay) * 3)),
      opacity 0.4s calc(var(--delay) + (var(--trdelay) * 3));
  }

  .bar-inp {
    -webkit-appearance: none;
    display: none;
    visibility: hidden;
  }

  .bar {
    display: flex;
    height: 50%;
    width: 20px;
    flex-direction: column;
    gap: 3px;
  }

  .bar-list {
    --transform: -25%;
    display: block;
    width: 100%;
    height: 3px;
    border-radius: 50px;
    background-color: white;
    transition: all 0.4s;
    position: relative;
  }

  .inp:not(:checked) ~ .bar > .top {
    transform-origin: top right;
    transform: translateY(var(--transform)) rotate(-45deg);
  }

  .inp:not(:checked) ~ .bar > .middle {
    transform: translateX(-50%);
    opacity: 0;
  }

  .inp:not(:checked) ~ .bar > .bottom {
    transform-origin: bottom right;
    transform: translateY(calc(var(--transform) * -1)) rotate(45deg);
  }

  .faq-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #ffe53b;
    background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.151);
    position: relative;
    z-index: 10000;
  }
  .faq-button svg {
    height: 1.5em;
    fill: white;
  }
  .faq-button:hover svg {
    animation: jello-vertical 0.7s both;
  }
  @keyframes jello-vertical {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(0.75, 1.25, 1);
    }
    40% {
      transform: scale3d(1.25, 0.75, 1);
    }
    50% {
      transform: scale3d(0.85, 1.15, 1);
    }
    65% {
      transform: scale3d(1.05, 0.95, 1);
    }
    75% {
      transform: scale3d(0.95, 1.05, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  .tooltip {
    position: absolute;
    top: -20px;
    opacity: 0;
    background-color: #ffe53b;
    background-image: linear-gradient(147deg, #ffe53b 0%, #ff2525 74%);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    pointer-events: none;
    letter-spacing: 0.5px;
    z-index: 10000;
  }

  .tooltip::before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background-color: #ff2525;
    background-size: 1000%;
    background-position: center;
    transform: rotate(45deg);
    bottom: -15%;
    transition-duration: 0.3s;
  }

  .faq-button:hover .tooltip {
    top: -40px;
    opacity: 1;
    transition-duration: 0.3s;
  }

</style>
