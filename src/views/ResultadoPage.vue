<template>
  <IonPage>
    <ion-header :translucent="true">
      <ion-toolbar class="custom-tool-bar">
        <ion-title>Resultado</ion-title>
      </ion-toolbar>
    </ion-header>
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
          <strong>{{ acertos }}</strong>
        </span>
      </div>
      <div class="line"></div>
      <div class="result-box">
        <span>Errou</span>
        <span>
          <strong>{{ erros }}</strong>
        </span>
      </div>
      <strong>Total {{ total }}%</strong>
      <input type="button" value="Menu" id="menuBtn" @click="backMenu">
    </div>
  </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
let acertos = ref(0)
let erros = ref(0)
let total = ref('')
let totalQuestoes = ref(0)

onMounted(()=>{
  acertos.value = Number(route.params.acertos)
  erros.value = Number(route.params.erros)
  totalQuestoes.value = Number(route.params.totalQuestoes)
  let totalPerc = (acertos.value * 100) / totalQuestoes.value
  total.value = totalPerc.toFixed(2)
  localStorage.setItem('last_note', total.value)
})


function backMenu(){
  router.push({name: 'Home'})
}
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
.result-box{
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 10px;
}
#menuBtn{
  background-color: orangered;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px lightgray;
  border: none;
  color: white;
  min-width: 150px;
}
.line{
  height: 1px;
  width: 90%;
  background-color: gray;
}
</style>