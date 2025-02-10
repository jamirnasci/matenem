<template>
    <IonPage>
        <ion-header :translucent="true">
            <ion-toolbar  class="custom-tool-bar">
                <ion-title>Simulado</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div id="container">
                <h1>Questões</h1>
                <div id="questionsBox">

                    <div v-for="question, i in questions">
                        <div>
                            <p>{{ question.comando }}</p>
                            <div id="radioGroup">
                                <div>
                                    <input type="radio" v-bind:name="'q' + i" value="a">
                                    {{ question.a }}
                                </div>
                                <div>
                                    <input type="radio" v-bind:name="'q' + i" value="b">
                                    {{ question.b }}
                                </div>
                                <div>
                                    <input type="radio" v-bind:name="'q' + i" value="c">
                                    {{ question.c }}
                                </div>
                                <div>
                                    <input type="radio" v-bind:name="'q' + i" value="d">
                                    {{ question.d }}
                                </div>
                                <div>
                                    <input type="radio" v-bind:name="'q' + i" value="e">
                                    {{ question.e }}
                                </div>
                            </div>
                            <button @click="corrigir" :gabarito="question.gabarito" id="corrigirBtn">Corrigir</button>
                        </div>
                    </div>
                </div>
                <input type="button" value="Finalizar" id="finalizarBtn" @click="finalizar">
            </div>
        </ion-content>
    </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const questions: any = ref([])
let acertos = ref(0)
let erros = ref(0)
let totalQuestoes = ref(0)
const router = useRouter()

onMounted(async () => {
    let url = 'https://raw.githubusercontent.com/jamirnasci/mat_enem_policy/refs/heads/main/questions.json'
    try {
        let response = await fetch(url)
        let obj = await response.json()
        questions.value = obj
        totalQuestoes.value = obj.length
    } catch (err) {
        console.log(err)
    }
})

function corrigir(event: any) {
    const tag = event.target
    const gabarito = tag.getAttribute('gabarito')

    const checkedItem = tag.parentNode.childNodes[1].querySelector('input[type=radio]:checked')

    if (checkedItem.value === gabarito) {
        tag.innerHTML = 'Correto ✔️'
        tag.style.backgroundColor = 'limegreen'
        acertos.value++
    } else {
        tag.innerHTML = 'Errado ❌'
        tag.style.backgroundColor = 'red'
        erros.value++
    }
    tag.setAttribute('disabled', 'true')
}

function finalizar(){
    router.push({name: 'Resultado', params: {
        acertos: acertos.value,
        erros: erros.value,
        totalQuestoes: totalQuestoes.value
    }})
}
</script>
<style scoped>
#container {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: center;
    height: 100%;
    background: radial-gradient(white, lightgray);
    transform: translateY(-50%);
    margin-top: 300px;
    overflow-y: scroll;
}

#questionsBox {
    padding: 10px;
}

p {
    text-align: justify;
}

#corrigirBtn {
    width: 100%;
    border: none;
    background-color: darkblue;
    color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px lightgray;
    padding: 15px;
    font-size: 3.5vw;
    margin: 5px;
}

#finalizarBtn {
    width: 100%;
    border: none;
    background-color: deepskyblue;
    color: white;
    font-weight: bold;
    padding: 10px;
    font-size: 3.5vw;
}
</style>