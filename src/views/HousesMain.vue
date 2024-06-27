<template>
  <div class="houses">
    <div class="container">
      <h1 class="h1">Houses</h1>
      <router-link :to="{ name: 'HouseCreateMain' }">
        <button class="create-button">
          <img src="../assets/ic_plus_grey@3x.png" alt="Search" />
          <span>+ Create new</span>
        </button>
      </router-link>
    </div>

    <div class="flex-container">
      <input type="text" class="input-field" v-model="houseStore.searchInput" placeholder="Search for a house">
      <button @click="houseStore.clearSearch"  v-show="houseStore.searchInput.length > 0">
        <img class="btn-clear" src="../assets/ic_clear@3x.png" alt="Clear" />
      </button>
      <div class="btn-group">
        <button class="button-right" :class="{ active: houseStore.isActive === 'size' }" @click="houseStore.toggleActive('size')">Size</button>
        <button class="button-left" :class="{ active: houseStore.isActive === 'price' }" @click="houseStore.toggleActive('price')">Price</button>
      </div>
    </div>
    
    <div class="search-result" v-show="houseStore.searchInput.length > 0">
      <p>{{ houseStore.filteredHouses.length }} results found</p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else class="house-listing">
      <div v-for="house in houseStore.filteredHouses" :key="house.id" class="filtered-house">
        <HouseListing :house="house" />
      </div>
      <div class="no-results-wrapper" v-show="houseStore.filteredHouses.length === 0">
        <div class="no-results">
          <img src="../assets/img_empty_houses@3x.png" alt="No results" />
          <p class="no-results-text">No results found.</p>
          <p class="no-results-text">Please try another keyword.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HouseListing from '@/components/HouseListing.vue'
import { useHouseStore } from '@/stores/HouseStore'
import { ref, watchEffect } from 'vue';

export default {
    name: 'HousesMain',
    components: {
      HouseListing
    },
    setup() {
      const houseStore = useHouseStore()

      const isLoading = ref(true);

      const fetchData = async () => {
        isLoading.value = true;
        await houseStore.getHouses()
        isLoading.value = false;
      }

      watchEffect(() => {
        fetchData();
      });
  
      return { houseStore, isLoading };
    },
};
</script>