<template>
  <header>
    <h1>Make Your Burguer</h1>
  </header>
</template>

<script>
export default {
  name: "Banner"
}
</script>

<style scoped>
header {
  background-image: url('../../public/img/burger.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
}

header h1 {
  background-color: black;
  color: white;
  font-size: 40px;
  padding: 20px 40px;
  text-align: center;
}

@media (min-width: 640px) {
  header {
    height: 400px;
  }
}

@media (min-width: 1350px) {
  header {
    /* background-position: center -300px; */
    height: 600px;
  }

  h1 {
    font-size: 60px;
  }
}
</style>