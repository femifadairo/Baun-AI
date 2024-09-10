\<script>
import { ref } from 'vue'
import { useAITutorStore } from "@/stores/tutor"
export default {
  setup() {
    const tutor = useAITutorStore()
    return {
	tutor
    }
  }
}
</script>

<template>
  <div class="col-12 my-2">
    <h3 class="text-light text-center">AI Tutor</h3>
  </div>
  <div v-show="tutor.disable" class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
    <div class="row justify-content-end">
      <div class="col-8">
        <div class="input-group">
          <button
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Copy text to clipboard"
            class="input-group-text bg-warning text-dark"
            id="basic"
            @click="tutor.copyQ"
          >
            <i class="bi bi-clipboard"></i>
          </button>
	  <!--button
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Read AI output Loud"
            class="input-group-text bg-warning text-dark"
            id="basic"
            @click="tutor.copyQ"
          >Voice
            <i class="bi bi-voice"></i>
          </button-->
          <input
            disabled
            readonly
            class="form-control bg-dark text-warning"
            id="prompt-msg"
            v-model="tutor.prompt"
          />
          <button class="input-group-text bg-warning text-dark" id="basic" @click="tutor.copyQ">
            <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="tutor.disable">
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 mb-2">
    <textarea
      disabled
      readonly
      class="form-control bg-dark text-light overflow-auto board"
      id="cop"
    >
	{{ tutor.response }}
    </textarea>
  </div>
  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 d-flex justify-content-between">
    <div>
      <button class="btn btn-outline-warning" v-show="tutor.disable" @click="tutor.stopIt" >Stop generating...</button>
      <button
        title="Copy response to clipboard"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        class="btn btn-outline-warning"
        @click="tutor.copyOutput"
        v-show="tutor.response"
      >
        Copy
      </button>
      <button class="btn btn-outline-warning" @click="tutor.clearOutput" v-show="tutor.response">Clear</button>
	<button class="btn btn-outline-warning" @click="tutor.clearOutput" v-show="tutor.response">Read Out</button>
    </div>
  </div>
  <div
    class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 position-sticky .start-50 bottom-0 .translate-middle-x"
  >
    <div class="input-group my-4">
      <input
        class="form-control"
        aria-describedby="basic"
        placeholder="Ask me anything..."
        v-model="tutor.prompt"
        @keyup.enter="tutor.fetchData()"
      />
      <button class="input-group-text bg-warning text-dark" id="basic" @click="tutor.fetchData()">
        Go
        <!--span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="tutor.disable">
        </span-->
      </button>
    </div>
  </div>
</template>
<style scoped>
textarea {
  outline-color: yellow;
}
</style>
