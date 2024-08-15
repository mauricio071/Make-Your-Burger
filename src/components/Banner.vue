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
    height: 700px;
    display: flex;
    align-items: center;
  }
  
  header h1 {
    background-color: black;
    color: white;
    font-size: 60px;
    padding: 20px 40px;
    
  }

  @media (min-width: 1350px) {
    header {
        background-image: url('../../public/img/burger.jpg');
        background-position: 0 -330px;
    }
  }
  </style>