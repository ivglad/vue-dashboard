<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useCardsStore } from "@/stores/CardsStore";
import ButtonComponent from "@/components/UI/Button.vue";
import InputComponent from "@/components/UI/Input.vue";

const router = useRouter();
const cardsStore = useCardsStore();

const cardData = ref({
  title: "",
  description: "",
});
const addCardData = () => {
  if (!cardData.value.title) return false;
  cardsStore.add(cardData.value);
  router.push("/");
};

const cancelCard = () => {
  router.push("/");
};

const validateCardData = () => {
  if (cardData.value.title && cardData.value.description) {
    return true;
  }
  return false;
};
</script>

<template>
  <teleport to="header">
    <div class="title">
      <button-component
        b-title="Добавить"
        :b-active="validateCardData()"
        @click="addCardData"
      ></button-component>
      <button-component
        b-title="Отменить"
        b-type="warning"
        @click="cancelCard"
      ></button-component>
    </div>
  </teleport>
  <div class="content">
    <div class="card-title">
      <input-component
        v-model.trim="cardData.title"
        i-data="Название карточки"
      ></input-component>
    </div>
    <div class="card-description">
      <input-component
        v-model.trim="cardData.description"
        i-data="Описание карточки"
        i-type="textarea"
      ></input-component>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles' as *

.card-title, .card-description
  display: flex
  width: 100%
</style>
