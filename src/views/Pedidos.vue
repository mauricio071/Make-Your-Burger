<template>
  <div class="main-container">
    <h2>Gerenciar pedidos:</h2>
    <Mensagem v-if="msg" :msg="msg"/>
    <Dashboard @exibirMsg="mostrarMsg"/>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'
import Mensagem from '@/components/Mensagem.vue'
import { ref } from 'vue'

export default {
  components: { Dashboard, Mensagem },
  name: "Pedidos",

  //Composition API
  setup() {
    const msg = ref(null)

    const mostrarMsg = (data) => {
      msg.value = data
      setTimeout(() => msg.value = "", 2000)
    }

    return {
      msg,
      mostrarMsg
    }
  }

  //Option API
  // data() {
  //   return {
  //     msg: null
  //   }
  // },
  // methods: {
  //   mostrarMsg(data) {
  //     this.msg = data
    
  //     setTimeout(() => this.msg = "", 2000)
  //   }
  // },
}
</script>