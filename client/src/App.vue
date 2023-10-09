<template>
  <header></header>
  <main>
    <router-view />
  </main>
</template>

<script setup></script>

<style lang="sass">
@use '@/assets/styles' as *

html
  width: 100vw
  height: 100vh
  font-size: 62.5%
  line-height: 100%
  word-break: normal

body
  @include font-base
  width: 100vw
  height: 100vh
  margin: 0
  padding: 0
  box-sizing: border-box
  background-color: $background-base

  #app
    display: flex
    flex-direction: column
    position: relative
    width: 100%
    height: 100%
    padding: 0 $m-offset $m-offset $m-offset
    overflow-x: hidden

    header
      display: flex
      align-content: center
      justify-content: center
      position: sticky
      width: 100%
      min-width: 420px
      top: 0
      padding: $m-offset 0
      background-color: $background-base
      z-index: 100
      .title
        display: flex
        justify-content: space-between
        width: 100%
        max-width: 1000px
        padding: $m-offset 0
        background-color: $background-base

    main
      display: flex
      width: 100%
      height: 100%
      min-width: 420px
      position: relative
      align-content: center
      justify-content: center
      section
        display: flex
        flex-direction: column
        align-content: center
        justify-content: center
        flex-wrap: wrap
      .content
        display: flex
        flex-direction: column
        align-items: center
        width: 100%
        max-width: 1000px
</style>
