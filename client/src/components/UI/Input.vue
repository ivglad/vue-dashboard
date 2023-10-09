<script setup>
import { defineEmits, ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  iData: {
    type: String,
    default: null,
  },
  iType: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "textarea"].includes(value);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (e) => {
  let value = e.target.value.trim();
  emit("update:modelValue", value);
  if (value) {
    error.value = "";
  }
};

const error = ref();

const validate = () => {
  if (!props.modelValue) {
    error.value = "Поле не должно быть пустым";
    return;
  }
  error.value = "";
};

const classes = computed(() => {
  return {
    "input-active": props.modelValue,
  };
});
</script>

<template>
  <div class="input-component">
    <div class="textarea" :class="classes" v-if="iType === 'textarea'">
      <textarea
        name="description"
        :value="modelValue"
        @input="updateInput"
        @blur="validate"
      />
    </div>
    <input
      v-else
      name="title"
      :class="classes"
      :value="modelValue"
      @input="updateInput"
      @blur="validate"
    />
    <transition name="list-fade" mode="out-in">
      <div v-if="!error" class="input-info">
        {{ iData }}
      </div>
      <div v-else class="input-info input-info-attention">
        {{ error }}
      </div>
    </transition>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles' as *

$line-width: 0.2rem

.input-component
  display: inline-flex
  flex-direction: column
  width: 100%
  input, textarea
    @include transition-leave
    width: 100%
    font-size: $font-size-base
    color: $t-base-active
    min-height: $font-size-base
    line-height: $font-size-base
    padding: $m-offset $m-offset calc($m-offset + $m-offset / 7) $m-offset
    border: 1px solid $e-inactive
    border-radius: 14px
    background-color: transparent
    box-shadow: none
    outline: none
    overflow: hidden
    align-self: center
  .textarea
    @include transition-leave
    padding: $m-offset 0 0 0
    border: 1px solid $e-inactive
    border-radius: 14px
    & > textarea
      min-height: $font-size-base * 10
      line-height: $font-size-base
      padding-top: 0
      padding-bottom: 0
      border: 0

.input-active
  @include transition-enter
  border: 1px solid $e-base !important

.input-info
  @include font-small
  color: $t-inactive
  padding: 0 $m-offset
  margin-top: $xs-offset
  margin-bottom: $m-offset
  &-attention
    color: $t-attention
</style>
