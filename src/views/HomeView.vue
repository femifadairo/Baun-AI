<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  setup() {
    const disable = ref(false)
    const prompt = ref('')
    const msg = ref('')
    const response = ref('');
    let controller;
    const stopIt = () =>{
        if (controller) {
                controller.abort();
                alert('chart aborted!!!')
        }
    }
    const getChat = async () => {
      disable.value = true
      msg.value = prompt.value
      prompt.value = ''
      controller = new AbortController();
      const signal = controller.signal;
      try {
        const res = await axios.post('http://192.168.0.153:11434/api/generate',
	{       
		"model": "qwen:0.5b",
  		"prompt": msg.value,
		"stream": !true,
		"options": {
		'temperature': 0.7,
		'top_k': 40,
		'top_p': 1,
		/*
		'echo': true,
		'max_tokens': 4096,
  		"stop": ['</s>',],
		"repeat_last_n": 64,
		"repeat_penalty": 1.1,
		"num_thread": 4,
		"num_predict": 42,
		"tfs_z": 1,
		"mirostat": 0,
		"mirostat_eta": 0.1,
		"mirostat_tau": 5.0
		*/
		}
	},
	{
	headers: {
        	'Content-Type':  'application/json',
		'Access-Control-Allow-Origin': '*'
    }},
	 { signal }
	)
        console.log(res.data)
        response.value = res.data.response // || "I'm afraid I don't have enough information to respond substantively to that prompt."
        console.log(response)
      } catch (errors) {
        console.log(errors)
      } finally {
        disable.value = false
      }
    }

    const clearOutput = async () => {
      response.value = ''
      alert('cleared!!!')
    }

    const copyOutput = () => {
      let res = document.getElementById('cop')
      res.select()
      navigator.clipboard.writeText(res.value)

      // Alert the copied text
      alert('Copied to clipboard')
    }
    const copyQ = () => {
      let res = document.getElementById('prompt-msg')
      res.select()
      navigator.clipboard.writeText(res.value)

      // Alert the copied text
      alert('Copied to clipboard')
    }
    return {
      getChat,
      msg,
      prompt,
      response,
      disable,
      clearOutput,
      copyOutput,
      copyQ,
      stopIt
    }
  }
}
</script>

<template>
  <div class="col-12 my-2">
    <h3 class="text-light text-center">AI Tutor</h3>
  </div>
  <div v-show="disable" class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
    <div class="row justify-content-end">
      <div class="col-8">
        <div class="input-group">
          <button
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Copy text to clipboard"
            class="input-group-text bg-warning text-dark"
            id="basic"
            @click="copyQ"
          >
            <i class="bi bi-clipboard"></i>
          </button>
          <input
            disabled
            readonly
            class="form-control bg-dark text-warning"
            id="prompt-msg"
            v-model="msg"
          />
          <button class="input-group-text bg-warning text-dark" id="basic" @click="copyQ">
            <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="disable">
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
      v-model="response"
      id="cop"
	style="resize:none;"
    >
    </textarea>
  </div>
  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 d-flex justify-content-between">
    <div>
      <button class="btn btn-outline-warning" v-show="disable" @click="stopIt" >Stop generating...</button>
      <button
        title="Copy response to clipboard"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        class="btn btn-outline-warning"
        @click="copyOutput"
        v-show="response"
      >
        Copy
      </button>
      <button class="btn btn-outline-warning" @click="clearOutput" v-show="response">Clear</button>
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
        v-model="prompt"
        @keyup.enter="getChat()"
      />
      <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">
        Go
        <!--span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="disable">
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
