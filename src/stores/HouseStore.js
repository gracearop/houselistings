import { defineStore } from 'pinia';
import { baseUrl } from '../shared/baseUrl';
//DDT server:
import { apiKey } from '../shared/apiKey';

export const useHouseStore = defineStore('houseStore', {
  state: () => ({
    houses: [],
    isActive: 'price',
    searchInput: '',
  }),
  actions: {
    async getHouses() {
      const res = await fetch(baseUrl, {
        method: "GET",
        //DDT server:
        headers: {
          "X-Api-Key": apiKey
        },
      });
      const data = await res.json()
      this.houses = data
      if(res.error) {
        console.log(res.error)
      };
    },
    async deleteHouse(id) {
      const res = await fetch(baseUrl + id, {
        method: "DELETE",
        //DDT server:
        headers: {
          "X-Api-Key": apiKey
        },
      });
      if(res.error) {
        console.log(res.error)
      };
    },
    //async ensures that the function returns a promise
    async addHouse(house, image) {
      //await makes JavaScript wait until that promise settles and returns its result
      //wait until fetch resolves
      const res = await fetch(baseUrl, {
        method: 'POST',
        //DDT server:
        body: house,
        // my server:
        // body: JSON.stringify(house),
        headers: {
          //DDT server:
          "X-Api-Key": apiKey,
          // "Content-Type": "application/json"
        },
      });
      const resBody = await res.json();
      if (res.error) {
        console.log(res.error)
        return;
      };
      const resImage = await fetch(baseUrl + resBody.id + '/upload', {
        method: 'POST',
        body: image,
        //DDT server:
        headers: {
          "X-Api-Key": apiKey
        },
      });
      if(resImage.error) {
        console.log(resImage.error)
      };

      house.id = resBody.id
      house.location = resBody.location
      house.rooms = resBody.rooms
      
      this.houses.push(house)
      this.$router.push({ name: 'HouseDetailsMain', params: { id: resBody.id } })
    },
    async editHouse(house, image, id) {
      const res = await fetch(baseUrl + id, {
        // POST for DDT server, PUT for my server
        method: 'POST',
        //DDT server:
        body: house,
        // my server:
        // body: JSON.stringify(house),
        headers: {
          //DDT server:
          "X-Api-Key": apiKey,
          // "Content-Type": "application/json"
        },
      });
      if (res.error) {
        console.log(res.error)
        return;
      };
      const resImage = await fetch(baseUrl + id + '/upload', {
        method: 'POST',
        body: image,
        //DDT server:
        headers: {
          "X-Api-Key": apiKey
        },
      });
      if(resImage.error) {
        console.log(resImage.error)
      };
    },
    toggleActive(buttonType) {
      this.isActive = buttonType;
      this.sortHouses();
    },
    sortHouses() {
      if (this.isActive === 'price') {
        this.houses.sort((a, b) => a.price - b.price);
      } else if (this.isActive === 'size') {
        this.houses.sort((a, b) => a.size - b.size);
      };
    },
    clearSearch() {
      this.searchInput = '';
      this.sortHouses();
    },
  },
  getters: {
    filteredHouses() {
      this.sortHouses();
      return this.houses.filter((house) => {
        return (
          house.location && // Check if location exists
          (house.location.street.toLowerCase().includes(this.searchInput.toLowerCase().trim()) ||
          house.location.city.toLowerCase().includes(this.searchInput.toLowerCase().trim()))
        );
      });
    },
  },
});