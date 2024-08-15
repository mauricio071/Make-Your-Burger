<template>
    <div>
        <table>
            <thead>
                <tr class="table-header">
                    <td>#:</td>
                    <td>Cliente:</td>
                    <td>Pão:</td>
                    <td>Carne:</td>
                    <td>Opcionais:</td>
                    <td>Ações:</td>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="burguer in burguers"
                    :key="burguer.id"
                >
                    <td>{{ burguer.id }}</td>
                    <td>{{ burguer.nome }}</td>
                    <td>{{ burguer.pao.tipo }}</td>
                    <td>{{ burguer.carne.tipo }}</td>
                    <td>
                        <ul 
                            v-for="(opcional, index) in burguer.opcionais"
                            :key="index"
                        >
                            <li>{{ opcional }}</li>
                        </ul>
                    </td>
                    <td class="table-actions">
                        <select
                            @change="alterarStatus($event, burguer.id)"
                            :value="burguer.status"
                        >
                            <option value="">Selecione</option>
                            <option
                                v-for="status in statusList"
                                :key="status.id"
                                :value="burguer.tipo"
                            >
                                {{ status.tipo }}
                            </option>
                        </select>
                        <button @click="cancelarPedido(burguer.id)" class="cancel-btn">
                            Cancelar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
    name: "Dashboard",

    //Composition API
    setup(props, { emit }) {
        const burguers = ref([])
        const statusList = ref([])

        onMounted(() => {
            getBurguers()
        })

        const getStatus = async () => {
            await fetch('http://localhost:3000/status')
                .then((response) => response.json())
                    .then((data) => statusList.value = data)
        }

        const getBurguers = async () => {
            await fetch('http://localhost:3000/burgers')
                .then((response) => response.json())
                    .then((data) => burguers.value = data)
            getStatus()
        }

        const alterarStatus = async (event, id) => {
            const novoStatus = event.target.value

            const dataJson = JSON.stringify({ status: novoStatus })

            await fetch(`http://localhost:3000/burgers/${id}`, {
                method: 'PATCH',
                headers: { "Content-type": "application/json" },
                body: dataJson
            }).then(() => {
                emit('exibirMsg', {
                    tipo: 'atualizado',
                    conteudo: `Pedido Nº${id} atualizado!`
                })
            })
        }

        const cancelarPedido = async (id) => {
            const idx = burguers.value.findIndex((item) => item.id === id)
            
            await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "DELETE"
            }).then(() => burguers.value.splice(idx, 1))
                .then(() => {
                    emit('exibirMsg', {
                        tipo: 'cancelado',
                        conteudo: `Pedido Nº${id} cancelado!`
                    })
                })
        }

        return {
            burguers,
            statusList,
            alterarStatus,
            cancelarPedido
        }
    }

    //Option API
    // data() {
    //     return {
    //         burguers: [],
    //         statusList: [],
    //     }
    // },
    // mounted () {
    //     this.getBurguers()
        
    // },
    // methods: {
    //     async getStatus() {
    //         await fetch('http://localhost:3000/status')
    //             .then((response) => response.json())
    //             .then((data) => this.statusList = data)
    //     },
    //     async getBurguers() {
    //         await fetch('http://localhost:3000/burgers')
    //             .then((response) => response.json())
    //             .then((data) => this.burguers = data)
    //         this.getStatus()
    //     },
    //     async cancelarPedido(id) {
    //         const idx = await this.burguers.findIndex((item) => item.id === id)
    //         fetch(`http://localhost:3000/burgers/${id}`, {
    //             method: "DELETE", 
    //         }).then(() => this.burguers.splice(idx, 1))
    //             .then(() => {
    //                     this.$emit('exibirMsg', {
    //                     tipo: 'cancelado',
    //                     conteudo: `Pedido Nº${id} cancelado!`
    //                 })
    //             })
    //     },
    //     async alterarStatus(event, id) {
    //         const novoStatus = event.target.value
            
    //         const dataJson = JSON.stringify({status: novoStatus})
            
    //         await fetch(`http://localhost:3000/burgers/${id}`, {
    //             method: "PATCH",
    //             headers: { "Content-type": "application/json" },
    //             body: dataJson 
    //         }).then(() => this.$emit('exibirMsg', {
    //             tipo: 'atualizado',
    //             conteudo: `Pedido Nº${id} atualizado!`
    //         }))
    //     }
    // },
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

table .table-header td {
    border-bottom: 3px solid black;
    font-weight: bold;
    padding-bottom: 1rem;
}

table td {
    padding: 15px 10px;
    border-bottom: 1px solid black;
}

table tbody td:last-of-type {
    padding-right: 0;
}

.table-actions button, 
.table-actions select
{
    padding: 0.75rem 1.25rem;
    font-weight: bold;
}

.cancel-btn {
    margin-left: 1rem;
    background-color: black;
    color: orange;
    font-weight: bold;
    cursor: pointer;
    transition: .5s;
    border-color: 2px solid black;
}

.cancel-btn:hover {
    color: black;
    background-color: white;
}
</style>