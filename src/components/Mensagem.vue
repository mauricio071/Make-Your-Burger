<template>
    <div :class="{
        'mensagem-container': msg.tipo === 'pedido',
        'mensagem-container-orange': msg.tipo === 'atualizado',
        'mensagem-container-red': msg.tipo === 'cancelado'
    }">
        {{ msg.conteudo }}
    </div>
<div>
    
</div>
</template>

<script>
export default {
name: "Mensagem",
props: {
    msg: {
        type: Object,
        default: {}
    }
},
}
</script>

<style scoped>
.mensagem-container {
    padding: 10px;
    color: #004085;
    background-color: #CCE5FF;
    border: 2px solid #B8DAFF;
    border-radius: 5px;
    margin: 30px auto;
    max-width: 400px;
}

.mensagem-container-orange {
    padding: 10px;
    color: orange;
    background-color: oldlace;
    border: 2px solid orange;
    border-radius: 5px;
    margin: 30px auto;
    max-width: 400px;
}

.mensagem-container-red {
    padding: 10px;
    color: red;
    background-color: pink;
    border: 2px solid red;
    border-radius: 5px;
    margin: 30px auto;
    max-width: 400px;
}
</style>