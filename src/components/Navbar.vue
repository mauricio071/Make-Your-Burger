<template>
    <nav>
        <router-link to="/">
            <img :src="srcImg" :alt="altImg">
        </router-link>
        <div class="navbar-links">
            <router-link to="/">Home</router-link>
            <router-link to="/pedidos">Pedidos</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    props: ['srcImg', 'altImg']
}
</script>

<style scoped>
nav {
    background-color: black;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
}

nav img {
    width: 50px;
    height: 50px;
}

nav .navbar-links a {
    text-decoration: none;
    margin: 15px;
    color: orange;
    transition: .5s;
}

nav .navbar-links a:hover {
    color: white;
}
</style>