<template>
  <div>
      <header>
        <nav class="nav-header">
          <router-link to="/">
            <img alt="logo" src="./assets/img_logo_dtt@3x.png">
          </router-link>
          <router-link to="/" :class="{ 'router-link-active': isHousesSection }">Houses</router-link>
          <router-link to="/about" :class="{ 'router-link-active': isAboutSection }">About</router-link>
        </nav>
      </header>
    <router-view></router-view>
      <footer>
        <nav class="nav-footer">
          <router-link to="/" :class="{ 'router-link-exact-active': isHousesSection }">
            <img class="btn-home" alt="btn-home">
          </router-link>
          <router-link to="/about" :class="{ 'router-link-exact-active': isAboutSection }">
            <img class="btn-about" alt="btn-about">
          </router-link>
        </nav>
      </footer>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'App',
    setup() {
    const route = useRoute();

    const isHousesSection = computed(() => route.name === 'home' || route.name === 'HouseDetailsMain' || route.name === 'HouseEditMain' || route.name === 'HouseCreateMain');
    const isAboutSection = computed(() => route.name === 'about');

    return { isHousesSection, isAboutSection };
  }
};
</script>