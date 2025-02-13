<template>
    <IonPage>
        <TabBar title="Simulado" />
        <ion-content :fullscreen="true">
            <div id="container">
                <h1>Questões</h1>
                <div id="questionsBox">
                    <div v-for="question, i in questions">
                        <div>
                            <p>{{ `${i+1}) ${question.comando}` }}</p>
                            <div id="radioGroup">
                                <div>
                                    <input type="radio" v-bind:name="'q' + i" value="a">
                                    <span>{{ question.a }}</span>
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
import TabBar from '@/components/TabBar.vue';
import { IonPage, IonContent } from '@ionic/vue';
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
        tag.style.background = 'limegreen'
        acertos.value++
    } else {
        tag.innerHTML = 'Errado ❌'
        alert(`Errado, a altertativa correta era a letra ${gabarito.toUpperCase()}`)
        tag.style.background = 'red'
        erros.value++
    }
    tag.setAttribute('disabled', 'true')
}

function finalizar() {
    router.push({
        name: 'Resultado', 
        params: {
            acertos: acertos.value,
            erros: erros.value,
            totalQuestoes: totalQuestoes.value
        }
    })
}
</script>
<style scoped>
#container {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    overflow-y: auto;
    margin-top: 50px;
}
h1{
  font-size: 2.5rem;
  font-weight: bold;
  color: gray;
}
#questionsBox {
    padding: 10px;
}

p {
    text-align: justify;
}

#radioGroup > div{
    display: flex;
    align-items: center;
}

input[type="radio"]{
    height: 20px;
    width: 20px;
    margin: 5px;
}

#corrigirBtn {
    width: 100%;
    border: none;
    background: linear-gradient(45deg, royalblue, blue, darkblue);
    color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px gray;
    padding: 15px;
    font-size: 3.5vw;
    margin: 5px;
}


#finalizarBtn {
    width: 100%;
    border: none;
    background-color: forestgreen;
    color: white;
    font-weight: bold;
    padding: 10px;
    font-size: 3.5vw;
}
</style>