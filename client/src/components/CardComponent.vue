<script setup>
import { ref, reactive, computed, watch, defineEmits } from "vue";
import { useCardsStore } from "@/stores/CardsStore";
import ButtonComponent from "@/components/UI/Button.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const cardsStore = useCardsStore();
const cards = ref(cardsStore.cards);

const showOptions = ref(false);

const removeCard = (cardId) => {
  if (showCardInfo.value) {
    showCardInfo.value = false;
    return;
  }

  const removeCardIndex = cards.value.findIndex((el) => {
    if (el.id === cardId) return el;
  });
  if (removeCardIndex === -1) return;
  cardsStore.remove(removeCardIndex, 1);
};

const disableOnCardInfo = (e) => {
  if (!showCardInfo.value) return;
  e.preventDefault();
};

const showCardInfo = ref(false);

const classes = computed(() => {
  return {
    "card-info": showCardInfo.value,
  };
});
</script>

<template>
  <div class="card-component" :class="classes" @dragstart="disableOnCardInfo($event)">
    <div
      class="card-title"
      @mouseenter="showOptions = true"
      @mouseleave="showOptions = false"
    >
      <div class="text">{{ data.title }}</div>
      <transition name="list-fade" mode="out-in">
        <div class="options" v-show="showOptions || showCardInfo">
          <div class="additional" v-if="!showCardInfo" @click="showCardInfo = true">
            <svg viewBox="0 -960 960 960">
              <path
                d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
              />
            </svg>
          </div>
          <div class="remove" @click="removeCard(data.id)">
            <svg viewBox="0 -960 960 960">
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </div>
        </div>
      </transition>
    </div>
    <div class="card-description">
      {{ data.description }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles' as *

.card-info
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  cursor: default !important
  border: 1px solid $e-base !important
  user-select: auto
  z-index: 2
.card-component
  @include transition-leave
  display: flex
  flex-direction: column
  border: 1px solid $e-inactive-2
  border-radius: 14px
  overflow: hidden
  background-color: $background-base
  @include hover
    @include transition-enter
    border: 1px solid $e-base
  .card-title
    display: flex
    justify-content: space-between
    align-items: center
    padding: $xs-offset $m-offset
    .text
      @include font-base-bold
      text-align: center
      min-height: 3rem
      line-height: 3rem
      color: $t-active
    .options
      display: flex
      align-items: center
      min-height: 3rem
      .additional, .remove
        @include transition-leave
        padding: 0 calc($xs-offset / 2)
        cursor: pointer
        svg
          @include transition-leave
          width: $font-size-base * 1.2
          height: $font-size-base * 1.2
          path
            fill: $b-base
          @include hover
            @include transition-enter
            filter: drop-shadow(0 0 calc($xs-offset / 2) $b-base-active)
            path
              fill: $b-base-active
      .remove
        svg
          path
            fill: $t-attention
          @include hover
            @include transition-enter
            filter: drop-shadow(0 0 calc($xs-offset / 2) $t-attention)
            path
              fill: $t-attention
  .card-description
    font-size: $font-size-base
    line-height: 2rem
    padding: 0 $m-offset $m-offset $m-offset
    color: $t-base
.card-component-move
  @include transition-enter(all, 0.35s, cubic-bezier(.25,0,0,1), 0.0s)
</style>
