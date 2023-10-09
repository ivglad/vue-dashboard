<script setup>
import { defineEmits, ref, computed } from "vue";
import { useCardsStore } from "@/stores/CardsStore";

const props = defineProps({
  checked: {
    type: Boolean,
    default: null,
  },
  cInfo: {
    type: String,
    default: "",
  },
});

const cardsStore = useCardsStore();

const emit = defineEmits(["update:checked"]);

const check = () => {
  emit("update:checked", props.checked ? false : true);
};

const checkboxClasses = computed(() => {
  return {
    "checkbox-content-active": props.checked,
  };
});
</script>

<template>
  <div class="checkbox-component">
    <label class="checkbox-content" :class="checkboxClasses">
      <div class="box"></div>
      <input
        name="checkbox"
        class="checkbox"
        type="checkbox"
        :checked="checked"
        @click="check"
      />
      <div class="checkbox-text">
        {{ cInfo }}
      </div>
    </label>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles' as *

.checkbox-component
  display: inline-flex
  height: $font-size-title
  .checkbox-content
    display: flex
    align-items: center
    position: relative
    cursor: pointer
    user-select: none
    .box
      @include transition-leave
      display: inline-flex
      width: $s-offset
      height: $s-offset
      border-radius: $default-radius
      background-color: $e-inactive
    .checkbox
      visibility: hidden
      padding-left: $s-offset
    .checkbox-text
      @include font-base
      @include transition-leave
    &-active
      .checkbox-text
        @include transition-enter
        color: $t-base-active
      .box
        @include transition-enter
        background-color: $color-base-active
        box-shadow: 0 0 $xs-offset $color-base-active
</style>
