<script setup>
import {
	RouterLink,
	RouterView
} from 'vue-router'
</script>

<template>
	<div class="container">
		<div class="row justify-content-center my-3">
			<div class="col-12 d-flex justify-content-between">
				<div class=".align-items-center">
					<h2 class="text-warning">
						Baun AI
					</h2>
				</div>
				<div class=" .align-items-center">
					<div class="dropdown">
						<button class="btn btn-secondary dropdown-toggle text-warning" type="button"
							data-bs-toggle="dropdown" aria-expanded="false">
							Baun AI
						</button>
						<ul class="dropdown-menu">
							<li><router-link to="/" class="dropdown-item">AI Tutor</router-link></li>
							<li><router-link to="/teachers-assistant" class="dropdown-item">Teaching
									Assistant</router-link></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
			<RouterView />
		<!--footer class="text-center text-light p-3">
			<p>Responses can be incorrect. Please verify the accuracy of crucial factual information.</p>
		</footer-->
	</div>

</template>

<style .scoped>
body,
div.container {
	background-color: black;
	height: 100vh;
}

.board {
	height: 70vh;
}
</style>
