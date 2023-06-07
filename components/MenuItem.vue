<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart';
const store = useCartStore();
const { data } = storeToRefs(store);
const props = defineProps(["id", 'section']);
const tooltip = ref(false);


const itemData = await $fetch('/api/item?id=' + props.id);


const option = ref(null);
const addItemToCart = () => {

    if (option !== null)
        data.value[props.section].push({ "options": option.value, ...itemData });
    else {
        data.value[props.section].push(itemData);
    }
    option.value = null;
}
const addItemToCartS = async () => {


    option.value = null
    data.value[props.section].push(itemData);

    tooltip.value = true;

    await new Promise((r) => { setTimeout(r, 1000) })
    tooltip.value = false

}
</script>
<template>
    <div class="h-max min-h-64 w-full bg-base-300 relative rounded-lg z-0">
        <div
            class="rounded-lg w-full h-full min-h-64 z-20 absolute bg-base-100 bg-opacity-10 flex flex-col p-2 bg-gradient-to-br from-neutral  to-transparent text-white">
            <h1 class="text-4xl">{{ itemData.name }}</h1>
            <p class="text-xl">{{ itemData.price }}</p>
            <div class="flex-1"></div>
            <div class="flex flex-row">
                <label :for="itemData.name" class="btn btn-info sm:-ml-2">Cu optiuni</label>
                <div class="flex-1"></div>
                <div class="tooltip-open" :class="{ 'tooltip': tooltip }" data-tip="Added!">
                    <label @click="addItemToCartS" class="btn btn-primary w-[95%]">Adauga</label>
                </div>
            </div>
        </div>
        <img class="z-0 relative rounded-lg " :src="itemData.image" />
    </div>
    <input type="checkbox" :id="itemData.name" class="modal-toggle" />
    <label :for="itemData.name" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
            <h3 class="text-lg font-bold">Something different?</h3>
            <input :value="option" @change="option = $event.target.value" type="text"
                class="w-full p-2 rounded-lg bg-base-200" placeholder="Optiuni eg: in sange, mediu, fara ceapa" />
            <div class="flex flex-row mt-2">
                <div class="flex-1"></div>

                <label @click="addItemToCart" :for="itemData.name" class="btn"> Add with options</label>
            </div>
        </label>
    </label>
</template>