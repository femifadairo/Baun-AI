<script setup>
import axiosInstance from "@/axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const subjects = ref(["STEM", "Robotics", "IoT", "Coding", "AI"]);
const entry = ref({ level: "", subject: "" });
const grades = ["Grade 3 - 5", "Grade 6 - 8", "Grade 9 - 12"];
const saveInteract = () => {
  localStorage.setItem("aiData", JSON.stringify(entry.value));
  router.push("/ai/tutor");
};

const logoutUser = () => {
  try {
   const res = axiosInstance.post("auth/jwt/logout/")
   console.log(res)
    localStorage.clear();
    router.push("/auth");
  } catch (e) {
    alert(`something went wrong!!! ${data.response.data.detail}`)
  }
};
</script>
<template>
  <div class="col-lg-6 text-light text-center">
    <h2 class="text-center">What would you like to learn today?</h2>
    ==================================================
    <form @submit.prevent="saveInteract">
      <div class="text-start my-4">
        <label for="classLevel" class="form-label text-start"
          >Grade Level: <span>{{ entry.level }}</span></label
        >
        <select
          required
          value=""
          class="form-select custom-select"
          id="classLevel"
          aria-label="Class Level"
          v-model="entry.level"
        >
          <option value="">Select your Grade Level</option>
          <option v-for="grade in grades">
            {{ grade }}
          </option>
        </select>
      </div>
      <div class="row justify-content-between">
        <label for="classLevel" class="form-label text-start"
          >Select Subject Focus: <span>{{ entry.subject }}</span></label
        >
        <div
          class="col col-xs-10 mb-4"
          v-for="(subject, index) in subjects"
          v-bind:key="index"
        >
          <input
            type="radio"
            class="btn-check"
            name="options"
            :id="`option${index + 1}`"
            autocomplete="off"
            :value="subject"
            v-model="entry.subject"
            required
          />
          <label
            class="btn btn-secondary styled me-2"
            :for="`option${index + 1}`"
            >{{ subject }}</label
          >
        </div>
        <div class="row justify-content-center">
          <div class="col-10">
            <!--button @click="logoutUser" class="btn btn-warning">Logout</button-->
            <button type="submit" class="btn btn-warning">Proceed</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
label.styled {
  width: 100%;
}
</style>
