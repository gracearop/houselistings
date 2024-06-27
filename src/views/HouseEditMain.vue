<template>
  <div class="house-edit">
    <div class="house-edit-wraper">
      <router-link :to="{ name: 'HouseDetailsMain', query: { delete: false }, params: { id: $route.params.id }}">
        <button class="back-button">
          <img src="../assets/ic_back_grey@3x.png" alt="Back" />
        </button>
      </router-link>
      <p class="back-label">Back to detail page</p>
      <h1>Edit listing</h1>
      <form @submit.prevent="handleSubmit">

        <div class="full-size">
          <label for="street">Street name*</label>
          <input type="text" id="street" required v-model="inputData.location.street" placeholder="Enter the street name"
          minlength="2" maxlength="20">
        </div>

        <div class="half-size">
          <label for="number">House number*</label>
          <input type="number" id="number" required v-model="inputData.location.houseNumber" placeholder="Enter the house number"
          min="1" max="2000">
        </div>

        <div class="half-size">
          <label for="addition">Addition (optional)</label>
          <input type="text" id="addition" v-model="inputData.location.houseNumberAddition" placeholder="e.g. A">
        </div>

        <div class="full-size">
          <label for="zip">Postal code*</label>
          <input type="text" id="zip" required v-model="inputData.location.zip" placeholder="e.g. 1000 AA"
          pattern="^[1-9][0-9]{3} ?(?!sa|SA|sd|SD|ss|SS)[a-zA-Z]{2}$" minlength="6" maxlength="7">
        </div>

        <div class="full-size">
          <label for="city">City*</label>
          <input type="text" id="city" required v-model="inputData.location.city" placeholder="e.g. Utrecht" minlength="2" maxlength="20">
        </div>

        <div class="full-size">
          <label for="img">Upload picture (PNG or JPG)*</label>
          <!-- <p>It is possible to upload an image, but it will not be sent to the server because it is a JSON server.</p> -->
          <div class="input-wrapper" id="imgEdit">
            <input type="file" required @change="handleImageChange" accept="image/png, image/jpeg">
            <button class="clear-button-white" @click="clearImage($event)" v-show="image !== null">
              <img src="../assets/ic_clear_white@3x.png" alt="Clear" />
            </button>
          </div>
        </div>

        <div class="full-size">
          <label for="price">Price*</label>
          <input type="number" id="price" required v-model="inputData.price" placeholder="e.g. €150.000" min="300">
        </div>

        <div class="half-size">
          <label for="size">Size*</label>
          <input type="number" id="size" required v-model="inputData.size" placeholder="e.g. 60m2" min="10">
        </div>

        <div class="half-size">
          <label for="garage">Garage*</label>
          <select id="garage" required v-model="inputData.hasGarage">
            <option value="" disabled selected>Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="half-size">
          <label for="bedrooms">Bedrooms*</label>
          <input type="number" id="bedrooms" required v-model="inputData.rooms.bedrooms" placeholder="Enter amount" min="1">
        </div>

        <div class="half-size">
          <label for="bathrooms">Bathrooms*</label>
          <input type="number" id="bathrooms" required v-model="inputData.rooms.bathrooms" placeholder="Enter amount" min="1">
        </div>

        <div class="full-size">
          <label for="date">Construction date*</label>
          <input type="number" id="date" required v-model="inputData.constructionYear" placeholder="e.g. 1990" 
          min="1700" :max="currentYear">
        </div>

        <div class="full-size">
          <label for="description">Description*</label>
          <textarea id="description" required v-model="inputData.description" name="description" rows="4" cols="50" placeholder="Enter description" minlength="5"></textarea>
        </div>

        <div class="form-btn-wrapper">
          <button id="btn-edit" class="submit-form-button">Update</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { useHouseStore } from '@/stores/HouseStore';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
    name: 'HouseEditMain',
    setup() {
    const route = useRoute();
    const router = useRouter();
    const houseStore = useHouseStore()
    const house = houseStore.houses.find((house) => house.id == route.params.id)
    const inputData = ref(house)
    const currentYear = ref(new Date().getFullYear());
    const image = ref (null);
    const previousBackgroundImage  = ref (null);

    const handleImageChange = (e) => {
      image.value = e.target.files[0];
      if (image.value) {
        previousBackgroundImage.value = document.getElementById('imgEdit').style.backgroundImage;
        const imageUrl = URL.createObjectURL(image.value); // Convert the File object to a URL
        document.getElementById('imgEdit').style.backgroundImage = `url(${imageUrl})`; // Set the background image
        document.getElementById('imgEdit').style.backgroundSize = "cover";
      }
    };

    const clearImage = (event) => {
      event.preventDefault()
      image.value = null;
      document.getElementById('imgEdit').style.backgroundImage = previousBackgroundImage.value;
      document.getElementById('imgEdit').style.backgroundSize = "auto";
    };

    const handleSubmit = async () => {

      try {
        // Prepare the house data based on the form input values

        // my server:
        // const editedHouse = {
        //   price: inputData.value.price,
        //   rooms: {
        //     bedrooms: inputData.value.rooms.bedrooms,
        //     bathrooms: inputData.value.rooms.bathrooms,
        //   },
        //   size: inputData.value.size,
        //   location: {
        //     street: inputData.value.location.street,
        //     houseNumber: inputData.value.location.houseNumber,
        //     houseNumberAddition: inputData.value.location.houseNumberAddition,
        //     zip: inputData.value.location.zip,
        //     city: inputData.value.location.city,
        //   },
        //   constructionYear: inputData.value.constructionYear,
        //   hasGarage: inputData.value.hasGarage ? true : false,
        //   description: inputData.value.description
        // };

        // DDT server:
        const editedHouse = new FormData();
        editedHouse.append('price', inputData.value.price);
        editedHouse.append('bedrooms', inputData.value.rooms.bedrooms);
        editedHouse.append('bathrooms', inputData.value.rooms.bathrooms);
        editedHouse.append('size', inputData.value.size);
        editedHouse.append('streetName', inputData.value.location.street);
        editedHouse.append('houseNumber', inputData.value.location.houseNumber);
        editedHouse.append('numberAddition', inputData.value.location.houseNumberAddition);
        editedHouse.append('zip', inputData.value.location.zip);
        editedHouse.append('city', inputData.value.location.city);
        editedHouse.append('constructionYear', inputData.value.constructionYear);
        editedHouse.append('hasGarage', inputData.value.hasGarage ? 'true' : 'false');
        editedHouse.append('description', inputData.value.description);

        const imageFormData = new FormData();
        imageFormData.append('image', image.value);

        console.log('Edited house data:', editedHouse);

        document.getElementById('btn-edit').innerHTML = 'Loading';

        await houseStore.editHouse(editedHouse, imageFormData, house.id);

        // Redirect to the house details page
        router.push({ name: 'HouseDetailsMain', params: { id: house.id } });

      } catch (error) {
        console.error('Error:', error);
      };
    };

    return { image, inputData, handleSubmit, handleImageChange, clearImage, currentYear };
  },

  // Add a backgound image for the components HouseCreate and HouseEdit
  beforeMount() {
    document.getElementById('main').classList.add('background-wrapper');
  },
  unmounted() {
    document.getElementById('main').classList.remove('background-wrapper');
  },
};
</script>