<template>
    <div>
        <Mensagem v-if="msg" :msg="msg" />
        <form @submit.prevent="enviarFormulario">
            <div class="input-container">
                <label for="nome">Nome do cliente:</label>
                <input v-model="nome" type="text" id="nome" name="nome" placeholder="Digite o seu nome">
            </div>
            <div class="input-container">
                <label for="pao">Escolha o pão:</label>
                <select v-model="pao" id="pao" name="pao">
                    <option value="">Selecione o seu pão</option>
                    <option v-for="pao in $store.state.paes" :key="pao.id" :value="pao">
                        {{ pao.tipo }}
                    </option>
                </select>
            </div>
            <div class="input-container">
                <label for="carne">Escolha a carne do seu Burguer:</label>
                <select v-model="carne" id="carne" name="carne">
                    <option value="">Selecione o tipo da sua carne</option>
                    <option v-for="carne in $store.state.carnes" :key="carne.id" :value="carne">
                        {{ carne.tipo }}
                    </option>
                </select>
            </div>
            <div class="input-container opcionais-container">
                <label for="opcionais" class="opcionais-title">Selecione os opcionais:</label>
                <div v-for="opcional in $store.state.opcionaisLista" :key="opcional.id" class="checkbox-container">
                    <input v-model="opcionais" :value="opcional.tipo" type="checkbox" name="opcionais">
                    <span>{{ opcional.tipo }}</span>
                </div>
            </div>
            <div class="input-container">
                <input type="submit" value="Criar meu Burguer!" class="form-submit" />
            </div>
        </form>
    </div>
</template>

<script>
import Mensagem from "@/components/Mensagem.vue"
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "BurguerForm",
    components: {
        Mensagem
    },

    //Composition API
    setup() {
        const baseUrl = process.env.VUE_APP_BASE_URL
        const store = useStore()

        const nome = ref("")
        const pao = ref("")
        const carne = ref("")
        const opcionais = ref([])
        const msg = ref({})

        onMounted(async () => {
            getDados()
        })

        const getDados = async () => {
            store.dispatch('getDadosIngredientes')
        }

        const enviarFormulario = async () => {
            if (!nome.value || !pao.value || !carne.value) return
            const data = {
                nome: nome.value,
                pao: pao.value,
                carne: carne.value,
                opcionais: opcionais.value,
                status: "Solicitado"
            }

            await fetch(`${baseUrl}/burguers`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            }).then((response) => response.json())
                .then((data) => {
                    limparCampos()
                    msg.value = {
                        tipo: 'pedido',
                        conteudo: `Pedido realizado com sucesso!`
                    }
                    setTimeout(() => msg.value = "", 2000)
                })
        }

        const limparCampos = () => {
            nome.value = ""
            pao.value = ""
            carne.value = ""
            opcionais.value = []
        }

        return {
            nome,
            pao,
            carne,
            opcionais,
            msg,
            enviarFormulario
        }
    }

    //Option API
    // data() {
    //     return {
    //         nome: "",
    //         pao: "",
    //         carne: "",
    //         opcionaisLista: [],
    //         opcionais: [],
    //         paes: [],
    //         carnes: [],
    //         msg: {},
    //     }
    // },
    // methods: {
    //     async getDados() {
    //         const data = await fetch('http://localhost:3000/ingredientes')
    //             .then((response) => response.json())

    //         this.paes = data.paes
    //         this.carnes = data.carnes
    //         this.opcionaisLista = data.opcionais
    //     },
    //     enviarFormulario() {
    //         const data = {
    //             nome: this.nome,
    //             pao: this.pao,
    //             carne: this.carne,
    //             opcionais: this.opcionais,
    //             status: "Solicitado"
    //         }

    //         const req = fetch('http://localhost:3000/burgers', {
    //             method: "Post",
    //             headers: { 'Content-type': 'application/json' },
    //             body: JSON.stringify(data)
    //         }).then((res) => res.json())
    //             .then((data) => {
    //                 this.limparCampos()
    //                 this.msg = {
    //                     tipo: 'pedido',
    //                     conteudo: `Pedido Nº${data.id} realizado com sucesso!`
    //                 }
    //                 setTimeout(() => this.msg = {}, 2000)
    //             })
    //     },
    //     limparCampos() {
    //         this.nome = ""
    //         this.pao = ""
    //         this.carne = ""
    //         this.opcionais = []
    //     }
    // },
    // mounted () {
    //     this.getDados()
    // },
}
</script>

<style scoped>
form {
    margin: 0 auto;
    max-width: 400px;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
}

.input-container label {
    font-weight: bold;
    margin-bottom: 1rem;
    border-left: 4px solid #fcba03;
    padding: 5px 10px;
}

.input-container input,
.input-container select {
    max-width: 300px;
    padding: 5px 10px;
}

.opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
}

.opcionais-title {
    width: 100%;
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
}

.input-container .form-submit {
    display: flex;
    justify-content: center;
    background-color: black;
    color: orange;
    padding: 10px 50px;
    margin: auto;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s;
    border-color: 2px solid black;
}

.input-container .form-submit:hover {
    color: black;
    background-color: white;
}
</style>
