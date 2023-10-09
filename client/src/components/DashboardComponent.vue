<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCardsStore } from "@/stores/CardsStore";
import CardComponent from "@/components/CardComponent.vue";
import ButtonComponent from "@/components/UI/Button.vue";
import CheckboxComponent from "@/components/UI/Checkbox.vue";

const router = useRouter();
const cardsStore = useCardsStore();
const cards = ref(cardsStore.cards);
const draggableModeOn = ref(cardsStore.draggableModeOn);
const movedCardIndex = ref(-1);

const addCard = () => {
  router.push("/addCard");
};

const dragStartHandler = (e, cardIndex) => {
  movedCardIndex.value = -1;
  if (!draggableModeOn.value) {
    e.preventDefault();
  }
  movedCardIndex.value = cardIndex;
};

const dragEnterHandler = (e, cardIndex) => {
  if (movedCardIndex.value !== cardIndex) {
    const movedCard = cards.value[movedCardIndex.value];
    cards.value.splice(movedCardIndex.value, 1);
    cards.value.splice(cardIndex, 0, movedCard);

    movedCardIndex.value = cardIndex;
  }
  return;
};

const draggableMode = () => {
  cardsStore.draggableModeOn = draggableModeOn.value;
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
      <transition-group tag="div" name="group-fade" class="cards">
        <card-component
          v-for="(card, cardIndex) in cards"
          :key="card.id"
          :data="card"
          :style="{ cursor: draggableModeOn ? 'grab' : 'default' }"
          :draggable="draggableModeOn"
          @dragenter.prevent="dragEnterHandler($event, cardIndex)"
          @dragover.prevent
          @dragstart="dragStartHandler($event, cardIndex)"
        ></card-component>
      </transition-group>
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

.group-fade-item
  @include transition-leave
  z-index: 1
.group-fade-enter-from,
.group-fade-leave-to
  opacity: 0
  transform: translateY(1rem)
  z-index: -10
.group-fade-leave-active
  position: absolute !important
  opacity: 0
  transform: translateY(1rem)
  z-index: -10
.group-fade-move
  @include transition-leave
  z-index: -10
</style>
