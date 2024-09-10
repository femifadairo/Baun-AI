<script setup>
import { ref } from 'vue'
import {marked} from "marked"
import { URLs as MDURLS, MarkdownBlock } from "md-block";
MDURLS.marked = "/home/baun/Desktop/llamaui/node_modules/marked/marked.min.js"
MDURLS.DOMPurify = "/home/baun/Desktop/llamaui/node_modules/dompurify/dist/purify.min.js"
import "md-block/style.css"
import { useAIAssistantStore } from "@/stores/assistant.js";
    const tutor =  useAIAssistantStore();
// const md = new MarkdownBlock()
</script>

<template>
  <div class="col-12 my-2">
    <h3 class="text-light text-center">AI Teaching Assistant</h3>
  </div>

  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
    <div class="row my-2">
      <div class="col">
        <div class="input-group">
          <select class="form-select" v-model="tutor.assistedOn" @change="tutor.toggleQA($event)">
            <option disabled value="" selected>Create a:</option>
            <option>lesson plan</option>
            <option>lesson notes</option>
            <option value="Quizes & Games">Quizes & Games</option>
            <option value="qa">Question & Answer</option>
          </select>
          <!--input class="form-control"
        			placeholder="Get Assistance on?" v-model="assistedOn" -->
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <select class="form-select" v-model="tutor.subject">
            <option disabled value="" selected>Subject Matter:</option>
            <option>Digital Literacy</option>
            <option>Robotics</option>
            <option>Artificial Intelligence</option>
          </select>

          <!--input class="form-control"                         
        			placeholder="Subject Matter" v-model="subject" -->
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <select class="form-select" v-model="tutor.level">
            <option disabled value="" selected>Class</option>

            <option v-for="(grade, index) in tutor.grades" :key="index">{{ grade }}</option>
          </select>
          <!--input class="form-control"
                                placeholder="Get Assistance on?" v-model="assistedOn" -->
        </div>
      </div>
    </div>
    <div class="row my-2" v-show="tutor.showQA">
      <div class="col">
        <div class="input-group">
          <select class="form-select" v-model="tutor.qaType">
            <option disabled value="" selected>Questions Format:</option>
            <option>True/False</option>
            <option>Multiple Choice</option>
          </select>
          <!--input class="form-control"
                                placeholder="Get Assistance on?" v-model="assistedOn" -->
        </div>
      </div>
    </div>
    <div class="row my-2">
      <div class="input-group my-2">
        <button
          v-show="tutor.disable"
          class="input-group-text bg-warning text-dark"
          id="basic"
          @click="tutor.copyQ"
        >
          <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="tutor.disable">
          </span>
        </button>
        <input class="form-control" placeholder="Topic" v-model="tutor.topic" />
        <button class="input-group-text bg-warning text-dark" id="basic" @click="tutor.fetchData()">
          Go
        </button>
      </div>
    </div>
  </div>

  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 mb-2">
    <textarea
      
      readonly
      class="form-control bg-dark text-light overflow-auto board"
      style="color: white !important; resize:none;"
      id="cop"
    >
{{ tutor.response }}
    </textarea>
  </div>
  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 d-flex justify-content-between">
    <div>
      <button class="btn btn-outline-warning" v-show="tutor.disable" @click="tutor.stopIt">Stop generating...</button>
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

      <!--button class="btn btn-outline-warning" @click="tutor.tts"><i class="bi bi-mic-fill"></i></button-->
    </div>
    <!--div class="dropdown">
  <button class="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    theme
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Dark</a></li>
    <li><a class="dropdown-item" href="#">Light</a></li>
  </ul>
</div-->
  </div>
  <!--div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 position-sticky .start-50 bottom-0 .translate-middle-x">
      <div class="input-group my-4">

        <input class="form-control" aria-describedby="basic"
        placeholder="Ask me anything..." v-model="prompt"  @keyup.enter="getChat()">
        <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">Go

      </button>
  </div>
</div-->
</template>
<style scoped>
@import "md-block/style.css"
:root {
	--main-color-hs: 200 50%;
	--main-color-hsl: var(--main-color-hs) 50%;
	--main-color: hsl(var(--main-color-hsl));
	--gray: 220 10% 50%;
}
pre, code {
	font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
}

body > header,
main,
body > footer {
	padding: 1.5rem clamp(1rem, 50vw - 20rem, 20vw);
}

body > header {
	background: var(--main-color);
	color: white;
	text-align: center;
}

	body > header h1 {
		margin: 0;
		font-size: 500%;
	}

	body > header h1::before {
		content: "";
		display: inline-block;
		vertical-align: middle;
		width: 1em;
		height: 1em;
		margin-right: .1em;
		background: url(logo.svg) center / contain no-repeat;
		transition: .4s;
		filter: drop-shadow(0 0 white);
	}

	@media (min-width: 1700px) {
		body > header h1::before {
			display: block;
			width: 2em;
			height: 2em;
			position: absolute;
		}
	}

	@keyframes crazy-shadow {
		20% {
			filter: drop-shadow(var(--offset) var(--offset) white);
			transform: translate(0, 0);
		}

		20.01% {
			filter: invert() drop-shadow(calc(-1 * var(--offset)) calc(-1 * var(--offset)) black);
			transform: translate(var(--offset), var(--offset));
		}

		50% {
			filter: invert() drop-shadow(0 0 black);
			transform: translate(0, 0);
		}

		70% {
			filter: invert() drop-shadow(var(--offset) var(--offset) black);
			transform: translate(0, 0);
		}

		70.01% {
			filter: drop-shadow(calc(-1 * var(--offset)) calc(-1 * var(--offset)) white);
			transform: translate(var(--offset), var(--offset));
		}
	}

	body > header h1:hover::before {
		--offset: .2em;
		animation: crazy-shadow 10s infinite ;
	}

	body > header h2 {
		margin: 0;
	}

	body > header a {
		color: inherit;
	}

main {
	flex: 1;
}

body > footer {
	background: hsl(200 20% 90%);
}

	body > footer a {
		color: inherit;
	}

table {
	border-spacing: 0;
	border-collapse: collapse;
}

th {
	background: hsl(var(--gray) / .1);
}

td, th {
	padding: .3em .5em;
	border: 1px solid rgb(0 0 0 / .2);
}

.demo-container {
	border: 1px solid hsl(var(--gray) / .2);
	box-shadow: 0 1px .3em -.1em rgb(0 0 0 / .2), -.5em -.5em 0  hsl(var(--main-color-hsl) / .1) inset;
	padding: 1em;
	margin: 1em -1em;
	display: grid;
	grid-template-areas: "header"
	                     "code"
	                     "demo";
	grid-gap: 1em;
}

@media (min-width: 600px) {
	.demo-container {
		grid-template-areas: "header header"
		                     "code demo";
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
	}
}

	.demo-container header {
		display: flex;
		grid-area: header;
	}

		.demo-container header p {
			margin: 0;
		}

		.demo-container header > form {
			margin-left: auto;
		}

			.demo-container header button {
				white-space: nowrap;
			}

	.demo-code {
		grid-area: code;
	}

	.demo-output {
		grid-area: demo;
	}
</style>
