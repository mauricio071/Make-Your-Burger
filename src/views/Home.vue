<template>
  <banner />
  <div class="main-container">
    <h2>Monte o sue burger:</h2>
    <BurgerForm />
  </div>
</template>


<script>
import Banner from '@/components/Banner.vue';
import BurgerForm from '@/components/BurgerForm.vue';

export default {
  name: "Home",
  components: { Banner, BurgerForm },
}
</script>
