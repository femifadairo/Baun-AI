import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAIAssistantStore = defineStore('assitant', () => {
  let controller;
    const disable = ref(false)
    const subject = ref('')
    const assistedOn = ref('')
    const topic = ref('')
    const prompt = ref('')
    const response = ref('')
    const level = ref('')
    const qaType = ref('')
    const showQA = ref(false)
    const toggleQA = () => {
      assistedOn.value == 'qa' ? (showQA.value = true) : (showQA.value = false)
    }
   const grades = ['3-5', '6-8', '9-12']
    const fetchData = async () => {
      disable.value = true
      controller = new AbortController();
      const signal = controller.signal;
      const intro = "You are a helpful AI assistant." // Identify yourself as 'Baun AI Teachers Assistant'."
      if (assistedOn.value === 'qa'){
        prompt.value = `Generate 5 ${subject.value} ${qaType.value} questions on ${topic.value}`
      } else if (assistedOn.value === 'Quizes & Games'){
        prompt.value = `$Generate 5 ${subject.value} ${qaType.value} questions on ${topic.value}`
      }else {
        prompt.value = `Generate a concise and detailed ${subject.value}  ${assistedOn.value} on topic: ${topic.value} for grade ${level.value} pupils. Include written instructions, and  hands-on activities or to aid comprehension and retention, for a 45 minutes class period.`;
     }


     try {
    const res = await fetch('http://10.42.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "qwen:0.5b",
                 "prompt": prompt.value,
                 "stream": true,
                 "options": {
                 'temperature': 1,
                 'top_k': 40,
                 'top_p': 0.9,
		"num_ctx": 4096,
		"seed": 101
                }
      }),
     signal: signal ,
    });

	console.log(res)
     if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const messages = new TextDecoder().decode(value);
	//console.log(typeof(messages))
console.log(prompt.value)
      response.value += JSON.parse(messages).response;
	console.log(response.value)
    }
  } catch (error) {
    console.error('Error streaming data:', error);
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

    const stopIt = () =>{
        if (controller) {
           controller.abort();
           alert('chart aborted!!!')
           //response.value = ""

        }
    }

  return { 
fetchData,
      stopIt,
      prompt,
      response,
      disable,
      clearOutput,
      copyOutput,
      copyQ,
      topic,
      assistedOn,
      subject,
      grades,
      level,
      qaType,
      showQA,
      toggleQA	
}
})
