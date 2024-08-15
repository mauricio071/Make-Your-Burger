<template>
  <banner />
  <div class="main-container">
    <h2>Monte o sue burguer:</h2>
    <BurguerForm />
  </div>
</template>


<script>
import Banner from '@/components/Banner.vue'
import BurguerForm from '@/components/BurguerForm.vue'

export default {
  name: "Home",
  components: { Banner,BurguerForm },
}
</script>

