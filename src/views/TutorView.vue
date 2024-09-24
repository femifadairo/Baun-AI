<script setup>
import axiosInstance from '@/axios';
import { useAITutorStore } from '@/stores/tutor';
import { onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
const route = useRoute()
const router = useRouter()
const tutor = useAITutorStore()
//const currentChat = ref({})
const getChatSingle = async (chatID) => {
  try{
    const res = await axiosInstance(`ai/tutor/${chatID}/`)
    tutor.response = res.data.response
  } catch(e){
    console.log(e)
  }
}

onBeforeRouteUpdate(async (to, from) => {
  console.log(to+ " "+from)
  if (to.query.chat !=="undefined"){
    await getChatSingle(to.query.chat)
  } else {
    tutor.response = ""
  }
})
onMounted(()=>{
  router.isReady();
  if (route.query.chat){
    getChatSingle(route.query.chat)
  }
})
</script>
<template>
  <div class="row justify-content-center align-items-center " style="height: 70%;">
    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
      <div class="text-light .bg-dark overflow-auto board fs-2" id="ccop">
        {{ tutor.response }}
      </div>
    </div>
  </div>
  <div class="row justify-content-center" style="height: 10%;">
    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 ">
      <button data-bs-toggle="tooltip" data-bs-placement="top" title="Copy text to clipboard" v-show="tutor.response"
        class="btn btn-outline-warning" id="basic" @click="tutor.copyQ">
        <i class="bi bi-clipboard"></i>
      </button>
      <button class="btn btn-outline-warning" v-show="tutor.disable" @click="tutor.stopIt">Stop generating...</button>
      <button title="Copy response to clipboard" data-bs-toggle="tooltip" data-bs-placement="top"
        class="btn btn-outline-warning" @click="tutor.copyOutput" v-show="tutor.response">
        Copy
      </button>
      <button class="btn btn-outline-warning" @click="tutor.clearOutput" v-show="tutor.response">Clear</button>
    </div>
    <div
      class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3">
      <div class="input-group my-4">
        <input class="form-control" aria-describedby="basic" placeholder="Ask me anything..." v-model="tutor.prompt"
          @keyup.enter="tutor.fetchData()" />
        <button class="input-group-text bg-warning text-dark" id="basic" @click="tutor.fetchData()" :disabled="disable">
          Go
          <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="tutor.disable">
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
textarea {
  outline-color: yellow;
}
</style>
