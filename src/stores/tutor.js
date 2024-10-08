import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/axios'
export const useAITutorStore = defineStore('tutor', () => {
  const chatCcount = computed(() => chatLists.value.length)
  const chatLists = ref([])
  const disable = ref(false)
    const prompt = ref('')
    const msg = ref('')
    const response = ref('');
    let controller;
    const message = ref("");
    const intro = "You are a helpful AI assistant. Identify yourself as 'Baun AI Tutor'. You can answer any questions related to STEM in a simplified tone for K-12 pupils";
    const new_intro = "I am Baun AI Tutor. A helpful A.I. assistant. I can answer questions on Robotics, Coding, AI, IoT, and STEAM education safely";
    const stopIt = () =>{
        if (controller) {
           controller.abort();
           alert('chart aborted!!!')
           //response.value = ""
        }
    };
    const subject = JSON.parse(localStorage.getItem("aiData"));
    const user = JSON.parse(localStorage.getItem("user"))
    const getUserChat = async () =>{
      try {
        const res = await axiosInstance.get("ai/tutor/")
        chatLists.value = res.data
      } catch(e){
        console.log(e)
      }
    };
    const logUserChat = async () =>{
      try {
        const res = await axiosInstance.post("ai/tutor/", {
          user: user.id,
          subject: subject.subject,
          prompt: prompt.value,
          response: response.value
        });
      await getUserChat()
      } catch(e){
        console.log(e)
      }
    };
  const fetchData = async () => {
disable.value = true
      response.value = ""
      msg.value = [
			{"role": "system", "content": new_intro },
			{"role": "user", "content": prompt.value}
		   ]
      //prompt.value = ""
      controller = new AbortController();
      const signal = controller.signal;
  try {
console.log(msg.value)
    const res = await fetch('http://localhost:11434/api/chat',
     {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "qwen:0.5b",
                 "messages": msg.value,
                 "stream": true,
                 "options": {
                 'temperature': 0.8,
                 'top_p': 0.1,
		   "seed": 0,
		"top_k": 80,
		"num_ctx": 4098,
		//"num_predict": 100,
	
              }  
      }),
     signal: signal ,
    });
 if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
	//console.log(value)
      if (done){
        //console.log("completed")
        break;
      };

      const messages = new TextDecoder().decode(value);
	//console.log(messages)
	response.value += JSON.parse(messages).message.content;
    }
  } catch (error) {
    console.error('Error streaming data:', error);
  } finally {
        disable.value = false
	msg.value.push({"role": "assistant", "content": response.value })
	console.log(msg.value)
  logUserChat();
   }
};

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
	stopIt,
      msg,
      prompt,
      response,
      disable,
      clearOutput,
      copyOutput,
      copyQ,
        fetchData,
        chatLists,
        chatCcount,
        getUserChat
}
})
