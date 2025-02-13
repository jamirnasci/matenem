<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
const props = defineProps(['title'])
</script>

<template>
  <ion-header :translucent="true">
    <ion-toolbar class="custom-tool-bar">
      <ion-title>{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>