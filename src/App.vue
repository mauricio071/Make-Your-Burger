<template>
  <Navbar :srcImg="logo" :altImg="descImg"/>
  <router-view/>
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
import { ref } from 'vue'

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },

  //Composition API
  setup() {
    const logo = ref('/img/logo.png')
    const descImg = ref('Hamburguer')

    return {
      logo,
      descImg
    }
  }

  //Option API
  // data() {
  //   return {
  //     logo: '/img/logo.png',
  //     descImg: 'Hamburguer'
  //   }
  // },
}
</script>

<style>
 * {
  font-family: Helvetica;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 }

 .main-container {
  min-height: 600px;
  margin: 50px;
 }

 h2 {
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
  color: black;
 }
</style>