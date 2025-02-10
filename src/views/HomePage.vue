<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="custom-tool-bar">
        <ion-title>Matemática ENEM 2025</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Matemática ENEM 2025</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Pronto para mais um simulado ?</strong>
        <input type="button" value="Iniciar Simulado" id="simuladoBtn"/>
        <div :style="'display:'+isVisible">
          <strong>Seu último aproveitamento foi:<h2>{{ lastNota }}%</h2></strong>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import showBanner from '@/service/Banner';
import { AdMob, AdMobInitializationOptions } from '@capacitor-community/admob';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

let isVisible = ref('none')
let lastNota = ref('')
const router = useRouter()

async function loadAds(){
  let {status} = await AdMob.trackingAuthorizationStatus()
  await AdMob.initialize()
}

function updateLastNota() {
  let localStorageNota = localStorage.getItem('last_note');
  lastNota.value = localStorageNota !== null ? localStorageNota : '';
  if (lastNota.value) {
    isVisible.value = 'block';
  } else {
    isVisible.value = 'none';
  }
}
//atualiza a ultima nota quando acessa a rota
onBeforeRouteUpdate((to, from, next) => {
  updateLastNota();
  next();
});

onMounted(async () => {
  await loadAds()
  await showBanner()
  let btn = document.getElementById('simuladoBtn')
  btn?.addEventListener('click', () => {
    router.push({name:'Simulado'})
  })
  updateLastNota()
})

</script>
<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: radial-gradient(white, lightgray);
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

#simuladoBtn {
  background-color: orangered;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px lightgray;
  border: none;
  color: white;
  margin: 15px;
}
</style>
