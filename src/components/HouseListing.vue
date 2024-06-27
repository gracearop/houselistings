<template>
  <router-link :to="{ name: 'HouseDetailsMain', query: { delete: clickedOnDelete}, params: { id: house.id}}">
    <div class="house">
      <div class="house-info">
        <!-- DDT server: -->
        <img v-if="house.image" class="house-image" :src="house.image" alt="House Image">
        <img v-else class="house-image" src="../assets/house10.jpg" alt="House Image">
        <!-- my server: -->
        <!-- <img class="house-image" src="../assets/house10.jpg" alt="House Image"> -->
          <div class="info">
            <h3>{{ house.location.street }} {{ house.location.houseNumber }}</h3>
            <p>€ {{ house.price }}</p>
            <p>{{ house.location.zip }} {{ house.location.city }}</p>
            <p><img src="../assets/ic_bed@3x.png" alt="Bed" /> {{ house.rooms.bedrooms }} <img src="../assets/ic_bath@3x.png" alt="Bath" /> {{ house.rooms.bathrooms }} <img src="../assets/ic_size@3x.png" alt="Size" /> {{ house.size }} m2</p>
          </div>
          <div class="house-actions">
          <router-link :to="{ name: 'HouseEditMain', params: { id: house.id}}"> 
            <button class="edit-button">
                <img src="../assets/ic_edit@3x.png" alt="Edit" />
            </button>
          </router-link>
          <button class="delete-button" @click="clickedOnDelete = true">
            <img src="../assets/ic_delete@3x.png" alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>
  
<script>
import { ref } from 'vue';

export default {
  props: ['house'],
  setup() {
    const clickedOnDelete = ref(false);
    return { clickedOnDelete }
  },
};
</script>