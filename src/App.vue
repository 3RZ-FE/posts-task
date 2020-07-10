<template>
  <div id="app">
    
    <Navigation />

    <transition name="fade" :duration="{ enter: 200, leave: 200 }" :mode="'out-in'">
      <router-view/>
    </transition>

  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
