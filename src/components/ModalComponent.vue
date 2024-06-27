<template>
    <div class="backdrop">
        <div class="modal">
            <h3>Delete listing</h3>
            <p>Are you sure you want to delete this listing?</p>
            <p>This action cannot be undone.</p>
            <router-link to="/">
                <button class="modal-delete" @click="houseStore.deleteHouse(house.id); $emit('close')">Yes, delete</button>
            </router-link>
            <button class="modal-back" @click="$emit('close')">Go back</button>
        </div>
    </div>
</template>

<script>    
import { useHouseStore } from '@/stores/HouseStore'

export default {
    props: ['house'],
    setup() {
        const houseStore = useHouseStore();
        return { houseStore }
    },
};
</script>