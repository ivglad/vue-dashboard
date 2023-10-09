<script setup>
import { ref, reactive, computed, watch, defineEmits } from "vue";

const props = defineProps({
  bType: {
    type: String,
    default: "select",
    validator(value) {
      return ["select", "select file", "warning"].includes(value);
    },
  },
  bTitle: {
    type: [String, Number],
    default: "Кнопка",
  },
  bActive: {
    type: Boolean,
    default: true,
  },
  bSelectFocus: {
    type: Boolean,
    default: false,
  },
});

const mouseDown = ref(false);

const classes = computed(() => {
  return {
    "button": props.bType !== "warning",
    "button-active": props.bActive && !mouseDown.value && props.bType !== "warning",
    "button-inactive": (!props.bActive || mouseDown.value) && props.bType !== "warning",
    "button-focus": props.bActive && props.bType === "select" && props.bSelectFocus,
    "button-warning": props.bActive && props.bType === "warning",
    "button-warning-active":
      props.bActive && !mouseDown.value && props.bType === "warning",
    "button-warning-inactive":
      (!props.bActive || mouseDown.value) && props.bType === "warning",
  };
});

const mainHandler = (e) => {
  if (!props.bActive) {
    e.stopImmediatePropagation();
  }
};

const resetFileInput = (e) => {
  e.target.value = null;
};
</script>

<template>
  <div class="button-component">
    <button
      :class="classes"
      @click="mainHandler"
      @mousedown="mouseDown = true"
    >
      {{ bTitle }}
    </button>
    <div
      class="button-background"
      v-if="mouseDown"
      @mouseup="mouseDown = false"
    ></div>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles' as *

.button-component
  display: flex
.button-background
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 1
.button, .button-warning
  @include font-base-button(0.4 * $s-offset, 1.0 * $s-offset)
  @include transition-leave
  height: $font-size-title
  min-width: $font-size-title
  max-width: calc($font-size-title * 10)
  box-sizing: border-box
  color: $background-base
  background-color: $b-base
  border-width: 0
  border-radius: $button-radius
  cursor: pointer
  user-select: none
  text-transform: uppercase
  align-self: center
  text-align: center
  text-overflow: ellipsis
  outline: none
  overflow: hidden
  z-index: 2
  @include hover
    @include transition-enter
    background-color: $color-base-active
    box-shadow: 0 0 $xs-offset $color-base-active
.button-active
  @include hover
    @include transition-enter
.button-focus
  background-color: $e-base-active
  box-shadow: 0 0 $xs-offset $e-base-active
.button-inactive
  background-color: $e-inactive-2
  text-shadow: 0 0 0 transparent
  cursor: default
  @include hover
    background-color: $e-inactive-2
    text-shadow: 0 0 0 transparent
    box-shadow: 0 0 0 transparent
  &:focus
    background-color: $e-inactive-2
    text-shadow: 0 0 0 transparent
    box-shadow: 0 0 0 transparent
.button-warning
  color: $t-attention
  background-color: transparent
  @include hover
    @include transition-enter
    background-color: transparent
    box-shadow: none
    text-shadow: 0 0 $xs-offset $t-attention
.button-warning-active
  @include hover
    @include transition-enter
.button-warning-inactive
  color: $color-attention-inactive
  text-shadow: 0 0 0 transparent
  cursor: default
  @include hover
    text-shadow: 0 0 0 transparent
    box-shadow: 0 0 0 transparent
  &:focus
    text-shadow: 0 0 0 transparent
    box-shadow: 0 0 0 transparent
.select-file
  display: flex
  position: relative
  input
    position: absolute
    opacity: 0
    width: 0
    height: 0
  div
    line-height: 2.2rem
</style>
