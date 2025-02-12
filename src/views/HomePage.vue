<template>
  <ion-page>
    <TabBar title="Home" />
    <ion-content :fullscreen="true">

      <div id="container">
        <h1>Matemática ENEM 2025</h1>
        <div>
          <strong>Pronto para mais um simulado ?</strong><br>
          <input type="button" value="Iniciar Simulado" id="simuladoBtn" @click="simulado" />
        </div>
        <div :style="'display:' + isVisible">
          <strong>Seu último aproveitamento foi:<h2>{{ lastNota }}%</h2></strong>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar.vue';
import Banner from '@/service/Banner';
import showBanner from '@/service/Banner';
import { AdMob, AdMobInitializationOptions } from '@capacitor-community/admob';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

let isVisible = ref('none')
let lastNota = ref('')
const router = useRouter()

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

const banner: Banner = new Banner()

async function simulado() {
  await banner.hideBanner()
  router.push({ name: 'Simulado' })
}

onMounted(async () => {
  await banner.showBanner()
  updateLastNota()
})

</script>
<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
