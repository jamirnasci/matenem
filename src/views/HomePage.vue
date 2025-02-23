<template>
  <ion-page>
    <TabBar title="Home" />
    <ion-content :fullscreen="true">
      <div id="container">
        <h1>Matemática ENEM 2025</h1>
        <div class="init-container">
          <div class="range-container">
            <strong>Pronto para mais um simulado ?</strong><br>
            <strong>Nº de questões</strong>
            <input type="range" v-model="questionsN" name="range" id="range-questions" min="5" max="13">
            <strong>{{ questionsN }}</strong>
          </div>
          <input type="button" value="Iniciar Simulado" id="simuladoBtn" @click="simulado" :style="`display:${isSimuladoButtonVisible};`"/>
        </div>
        <div :style="'display:' + isVisible">
          <strong>Seu último aproveitamento foi:<h2 :style="`color: ${noteColor}`">{{ lastNota }}%</h2></strong>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { getNoteColor } from '@/components/NoteColor';
import TabBar from '@/components/TabBar.vue';
import Banner from '@/ads/Banner';
import showBanner from '@/ads/Banner';
import { AdMob, AdMobInitializationOptions } from '@capacitor-community/admob';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';

let isVisible = ref('none')
let lastNota = ref('')
const router = useRouter()
const noteColor = ref('gray')
const questionsN = ref(0)
const isSimuladoButtonVisible = ref('none')
let banner: Banner | null = null

function updateLastNota() {
  let localStorageNota = localStorage.getItem('last_note')
  noteColor.value = getNoteColor(Number(localStorageNota))
  lastNota.value = localStorageNota !== null ? localStorageNota : ''

  if (lastNota.value) {
    isVisible.value = 'block'
  } else {
    isVisible.value = 'none'
  }
}
//atualiza a ultima nota quando acessa a rota
onBeforeRouteUpdate((to, from, next) => {
  updateLastNota()
  next()
})

async function simulado() {
  if(banner != null){
    await banner.hideBanner()
    router.push({ name: 'Simulado', params: {questionsN: questionsN.value} })
  }
}

onMounted(async () => {
  //carrega os anuncios
  let {status} = await AdMob.trackingAuthorizationStatus()
  const options: AdMobInitializationOptions = {
    initializeForTesting: false,
  }
  await AdMob.initialize(options)
  banner = new Banner()
  await banner.showBanner()
  isSimuladoButtonVisible.value = 'block'
  updateLastNota()
})

</script>
<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  margin: auto;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  transform: translateY(0);
  animation: fadeIn 1.5s ease-out;
}

.init-container{
  background-color: white;
  box-shadow: 0px 0px 10px gray;
  border-radius: 20px;
  overflow: hidden;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #315cad, #5b9aad);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  animation: slideInFromTop 1.2s ease-out;
}

.range-container{
  display: flex;
  flex-direction: column;
  margin: 20px;
}
#range-questions{
  accent-color: #315cad;
}

strong {
  font-size: 1.5rem;
  color: #333;
}

#simuladoBtn {
  background-color: #ff4b2b;
  background-image: linear-gradient(45deg, #315cad, #5b9aad);
  padding: 15px 30px;
  box-shadow: 0px 5px 20px royalblue;
  border: none;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

#simuladoBtn:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 30px darkblue;
}

h2 {
  font-size: 2.5rem;
  color: #4caf50;
  margin-top: 0.5rem;
  animation: popIn 0.6s ease-out;
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

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
