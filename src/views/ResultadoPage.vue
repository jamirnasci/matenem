<template>
  <IonPage>
  <TabBar title="Resultado" />
  <IonContent :fullscreen="true">
    <div id="container">
      <h1>Estatísticas</h1>
      <div class="result-box">
        <span>Total Questões</span>
        <span>
          <strong>{{ totalQuestoes }}</strong>
        </span>
      </div>
      <div class="line"></div>
      <div class="result-box">
        <span>Acertou</span>
        <span>
          <strong style="color: forestgreen;">{{ acertos }}</strong>
        </span>
      </div>
      <div class="line"></div>
      <div class="result-box">
        <span>Errou</span>
        <span>
          <strong style="color: red;">{{ erros }}</strong>
        </span>
      </div>
      <strong>Total: <span :style="`color: ${noteColor}`">{{ total }}%</span></strong>
      <input type="button" value="Menu" id="menuBtn" @click="backMenu">
    </div>
  </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { getNoteColor } from '@/components/NoteColor';
import TabBar from '@/components/TabBar.vue';
import Interstitial from '@/service/Interstitial';
import showInterstitial from '@/service/Interstitial';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
let acertos = ref(0)
let erros = ref(0)
let total = ref('')
let totalQuestoes = ref(0)
const noteColor = ref('gray')
const interstitial = new Interstitial()

onMounted(async ()=>{
  await interstitial.showInterstitial()
  acertos.value = Number(route.params.acertos)
  erros.value = Number(route.params.erros)
  totalQuestoes.value = Number(route.params.totalQuestoes)
  let totalPerc = (acertos.value * 100) / totalQuestoes.value
  noteColor.value = getNoteColor(totalPerc)
  total.value = totalPerc.toFixed(2)
  localStorage.setItem('last_note', total.value)
})


async function backMenu(){
  await router.push({name: 'Home', })
  router.go(0)
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #ffffff, #f5f5f5);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  margin: 2rem auto;
  height: 90%;
  margin-top: 30px;
  animation: fadeIn 1.5s ease-out;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  animation: slideInFromTop 1.2s ease-out;
}

.result-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 1rem 2rem;
  margin: 1rem 0;
  width: 100%;
  max-width: 400px;
  font-size: 1.25rem;
}

.result-box span {
  color: #333;
}

.result-box strong {
  font-size: 1.75rem;
  color: #315cad;
}

.line {
  width: 100%;
  max-width: 400px;
  height: 2px;
  background: #ff4b2b;
  margin: 0.5rem 0;
}

#menuBtn {
  background-color: #ff4b2b;
  background-image: linear-gradient(45deg, #5b9aad, #315cad);
  padding: 10px 30px;
  border-radius: 50px;
  box-shadow: 0px 5px 20px royalblue;
  border: none;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin-top: 1rem;
  min-width: 200px;
}

#menuBtn:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 30px royalblue;
}

strong {
  font-size: 2rem;
  color: #333;
  margin-top: 1.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>