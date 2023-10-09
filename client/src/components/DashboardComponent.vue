<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useCardsStore } from "@/stores/CardsStore";
import CardComponent from "@/components/CardComponent.vue";
import ButtonComponent from "@/components/UI/Button.vue";
import CheckboxComponent from "@/components/UI/Checkbox.vue";

const router = useRouter();
const cardsStore = useCardsStore();
const cards = ref(cardsStore.cards);
const draggableModeOn = ref(cardsStore.draggableModeOn);
const movedCard = ref();
const replacedCard = ref();
const movedCardIndex = ref();
const replacedCardIndex = ref();

const addCard = () => {
  router.push("/addCard");
};

const dragStartHandler = (e, cardId) => {
  if (!draggableModeOn.value) {
    e.preventDefault();
  }
  movedCardIndex.value = cardId;
};

const dropHandler = async (e, cardId) => {
  replacedCardIndex.value = cardId;
  cards.value = cards.value.map((card) => {
    if (card.id === replacedCardIndex.value) {
      return { ...card, id: movedCardIndex.value };
    }
    if (card.id === movedCardIndex.value) {
      return { ...card, id: replacedCardIndex.value };
    }
    return card;
  });

  cards.value.sort((a, b) => {
    return a.id - b.id;
  });

  cardsStore.cards = cards.value;
};

const draggableMode = () => {
  cardsStore.setDraggableMode(draggableModeOn.value);
};
watch(draggableModeOn, draggableMode);
</script>

<template>
  <teleport to="header">
    <div class="title">
      <button-component b-title="Добавить карточку" @click="addCard"></button-component>
      <checkbox-component
        v-model:checked="draggableModeOn"
        c-info="Разрешить перетаскивание"
      ></checkbox-component>
    </div>
  </teleport>
  <div class="content">
    <div class="cards">
      <card-component
        v-for="card in cards"
        :key="card.id"
        :data="card"
        :style="{ cursor: draggableModeOn ? 'grab' : 'default' }"
        :draggable="draggableModeOn"
        @dragover.prevent
        @dragenter.prevent
        @dragstart="dragStartHandler($event, card.id)"
        @drop="dropHandler($event, card.id)"
      ></card-component>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles' as *

.cards
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(min(100%/2, max(150px, 100%/5)), 1fr))
  grid-auto-rows: 1fr
  gap: $m-offset
  width: 100%
</style>
