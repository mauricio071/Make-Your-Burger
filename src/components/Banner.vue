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
  height: 400px;
  display: flex;
  align-items: center;
}

header h1 {
  background-color: black;
  color: white;
  font-size: 40px;
  padding: 20px 40px;

}

@media (min-width: 768px) {
  header {
    background-position: 0 -100px;
  }
}

@media (min-width: 1024px) {
  header {
    background-position: 0 -200px;
  }
}

@media (min-width: 1350px) {
  header {
    background-image: url('../../public/img/burger.jpg');
    background-position: 0 -330px;
    height: 700px;
  }

  h1 {
    font-size: 60px;
  }
}
</style>