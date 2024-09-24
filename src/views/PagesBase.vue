<script setup>
import axiosInstance from "@/axios";
import { useAITutorStore } from "@/stores/tutor";
import { Modal } from "bootstrap";
import { onMounted, ref } from "vue";
import { RouterView, RouterLink } from "vue-router";
const tutor  = useAITutorStore();
const staticBackdrop = ref(null);
const user = JSON.parse(localStorage.getItem("user")).username
const logoutUser = () => {
  try {
    const res = axiosInstance.post("auth/users/logout/")
    console.log(res)
    localStorage.clear();
    router.push("/auth");
  } catch (e) {
    alert(`something went wrong!!! ${data.response.data.detail}`)
  }
};
onMounted(()=>{
  tutor.getUserChat()
  const modal = new Modal(staticBackdrop.value)
  if(tutor.chatCcount<=3){
    modal.show()
  }
})
</script>
<template>
  <nav class="px-2 navbar navbar-expand-lg bg-warning border border-0 border-bottom border-dark sticky-top">
    <div class="container-fluid">
      <h3 class="text-center">AI Tutor {{ tutor.chatCcount }}</h3>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse " id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll " style="--bs-scroll-height: 100px;">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item dropdown dropstart ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ user }}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a type="button" class="dropdown-item" @click="logoutUser">Logout</a></li>
          </ul>
        </li>
        <!--li class="nav-item">
          <a class="nav-link" href="#">Theme</a>
        </li-->
      </ul>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row .justify-content-center .max-vh-100">
      <div class="col-lg-3 d-none d-lg-block bg-warning">
        <div class="border border-0 border-bottom py-2 ps-2 fs-5" v-for="chat in tutor.chatLists">
          <RouterLink class="btn btn-link-dark text-decoration-none" :to="{
            name: 'tutor',
            query: {chat: chat.id}
          }">{{ chat.prompt }}</RouterLink>
        </div>
      </div>
      <div class="col-lg-9 p-4">
        <RouterView />
      </div>
    </div>
  </div>
<!-- Modal -->
<div class="modal fade" ref="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-lg">
    <div class="modal-content">
      <div class="modal-header d-block">
        <h1 class="modal-title fs-4 text-center" id="staticBackdropLabel">AI Tutor - <span class="text-warning">Quiz Section</span> </h1>
        <!--button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button-->
      </div>
      <div class="modal-body">
        <div class="row justify-content-center">
          <h2 class="text-center">Do you remember what you've learned so far?</h2>
          <div class="col-12 my-3 .text-center">
            <p>Click on start quiz to get started</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <!--button type="button" class="btn btn-dark" data-bs-dismiss="modal">I'm not ready!!!</button-->
        <button type="button" class="btn btn-warning">Start Quiz</button>
      </div>
    </div>
  </div>
</div>
</template>