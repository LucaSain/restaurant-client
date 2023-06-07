<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart';
const store = useCartStore();
const { data, tableNumber, orderId, loc } = storeToRefs(store);

loc.value = -1;
const sections = await $fetch('/api/section');



//generate an array with numbers from 1 to 27
const tableNumbers = Array.from({ length: 27 }, (_, i) => i + 1);

</script>

<template>
    <div v-if="loc === -1" class="min-h-screen h-maxs w-screen bg-base-100 flex flex-col items-center pt-20">
        <div v-if="tableNumber === -1" class="text-5xl py-20">Select Your Table Number</div>
        <div class=" grid grid-flow-row grid-cols-8 gap-2" v-if="tableNumber === -1">
            <div v-for="table in tableNumbers" @click="tableNumber = table"
                class="cursor-pointer grid w-20 h-20 bg-base-200 place-items-center rounded-lg text-4xl hover:bg-base-300">
                {{ table }}</div>
        </div>
        <div v-if="tableNumber !== -1" class="h-full grid grid-flow-col grid-cols-2 grid-rows-2 gap-20">

            <div @click="loc = 0"
                class="h-64 w-64 bg-base-300 rounded-xl p-4 flex justify-center items-center border-dashed border-8 border-base-200 hover:border-primary cursor-pointer">
                <h1 class="text-5xl normal-case max-w-full font-bold ">Aperitive</h1>
            </div>


            <div @click="loc = 1"
                class="h-64 w-64 bg-base-300 rounded-xl p-4 flex justify-center items-center border-dashed border-8 border-base-200 hover:border-error cursor-pointer">
                <h1 class="text-5xl normal-case max-w-full font-bold ">Main</h1>
            </div>


            <div @click="loc = 2"
                class="h-64 w-64 bg-base-300 rounded-xl p-4 flex justify-center items-center border-dashed border-8 border-base-200 hover:border-info cursor-pointer">
                <h1 class="text-5xl normal-case max-w-full font-bold ">Deserts</h1>
            </div>


            <div @click="loc = 3"
                class="h-64 w-64 bg-base-300 rounded-xl p-4 flex justify-center items-center border-dashed border-8 border-base-200 hover:border-secondary cursor-pointer">
                <h1 class="text-5xl normal-case max-w-full font-bold ">Drinks</h1>
            </div>
        </div>

    </div>
    <div v-else class="min-h-screen h-max w-screen pt-20 px-20">
        <div v-for="category in sections[loc].categories">
            <div v-if="category.ids.length != 0" class="text-4xl py-3 pb-5">{{ category.name }}</div>
            <div class="grid grid-cols-4 grid-flow-row grid-rows-auto gap-2 p-2 bg-base-200 rounded-xl h-max ">
                <MenuItem v-for="id in category.ids" :id="id" :section="loc" />
            </div>
        </div>

        <div @click="loc = -1" class="absolute top-20 left-3 btn text-xl font-bold">{{ '<-' }}</div>

        </div>
</template>