<template>
    <div style="overflow: auto; min-height: 100vh;">
        <div v-if="loading" style="text-align: center;">
            <img src="../assets/loading.svg" alt="loading">
        </div>
        <table v-else>
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
                <tr v-for="burger in $store.state.burgers" :key="burger.id">
                    <td>{{ burger.id }}</td>
                    <td>{{ burger.nome }}</td>
                    <td>{{ burger.pao.tipo }}</td>
                    <td>{{ burger.carne.tipo }}</td>
                    <td>
                        <ul v-for="(opcional, index) in burger.opcionais" :key="index">
                            <li>{{ opcional }}</li>
                        </ul>
                    </td>
                    <td class="table-actions">
                        <select @change="alterarStatus($event, burger.id)" :value="burger.status">
                            <option value="">Selecione</option>
                            <option v-for="status in $store.state.statusList" :key="status.id" :value="burger.tipo">
                                {{ status.tipo }}
                            </option>
                        </select>
                        <button @click="cancelarPedido(burger.id)" class="cancel-btn">
                            Cancelar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "Dashboard",

    //Composition API
    setup(props, { emit }) {
        const baseUrl = process.env.VUE_APP_BASE_URL;

        const store = useStore();
        const loading = ref(true);

        onMounted(() => {
            setTimeout(() => {
                getBurgers();
                loading.value = false;
            }, 2000)
        })

        const getStatus = async () => {
            store.dispatch('getStatus');
        }

        const getBurgers = async () => {
            store.dispatch('getBurgers');
            getStatus();
        }

        const alterarStatus = async (event, id) => {
            const novoStatus = event.target.value;

            const dataJson = JSON.stringify({ status: novoStatus });

            await fetch(`${baseUrl}/burgers/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": baseUrl
                },
                body: dataJson
            }).then(() => {
                emit('exibirMsg', {
                    tipo: 'atualizado',
                    conteudo: `Pedido atualizado!`
                })
            });
        }

        const cancelarPedido = async (id) => {
            const idx = store.state.burgers.findIndex((item) => item.id === id);

            await fetch(`${baseUrl}/burgers/${id}`, {
                method: "DELETE"
            }).then(() => store.state.burgers.splice(idx, 1))
                .then(() => {
                    emit('exibirMsg', {
                        tipo: 'cancelado',
                        conteudo: `Pedido cancelado!`
                    })
                });
        }

        return {
            alterarStatus,
            cancelarPedido,
            loading
        };
    }

    //Option API
    // data() {
    //     return {
    //         burgers: [],
    //         statusList: [],
    //     }
    // },
    // mounted () {
    //     this.getburgers()

    // },
    // methods: {
    //     async getStatus() {
    //         await fetch('http://localhost:3000/status')
    //             .then((response) => response.json())
    //             .then((data) => this.statusList = data)
    //     },
    //     async getburgers() {
    //         await fetch('http://localhost:3000/burgers')
    //             .then((response) => response.json())
    //             .then((data) => this.burgers = data)
    //         this.getStatus()
    //     },
    //     async cancelarPedido(id) {
    //         const idx = await this.burgers.findIndex((item) => item.id === id)
    //         fetch(`http://localhost:3000/burgers/${id}`, {
    //             method: "DELETE", 
    //         }).then(() => this.burgers.splice(idx, 1))
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
.table-actions select {
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