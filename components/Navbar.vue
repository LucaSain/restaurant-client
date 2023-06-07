<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart';
import * as Ably from 'ably'
const store = useCartStore();
const { data, tableNumber, orderId, loc } = storeToRefs(store);
const pageOrder = ref(0);
const payment = ref('cash');



const setPayment = (how) => {//  
    payment.value = how;
}
let tot = ref(0);
//add in total the price of each item
watchEffect(() => {

    // works for reactivity tracking
    tot.value = 0;
    data.value.forEach(section => {
        section.forEach(item => {


            tot.value += item.price //convert to int
        })
    })
})





const deleteItem = (index, section) => {

    data.value[section].splice(index, 1)
}

const Order = async () => {
    loc.value = -1;
    pageOrder.value = 1;
    const orderid = await $fetch('/api/id');
    orderId.value = orderid;
    const channel = ably.channels.get('orders');
    await channel.publish('orders', { cost: tot.value, id: 'a' + orderId.value, payment: payment.value, table: tableNumber.value, 'aperitive': data.value[0], 'main': data.value[1], 'desert': data.value[2], 'drinks': data.value[3] });
    data.value = [[], [], [], []];


}
let ably;

onMounted(async () => {
    ably = new Ably.Realtime.Promise("bNcHtg.6A3Skg:7GQVuc0J7PRA5E-eejCulzPmjPTZBkAkr69LXEDu6Eg")
    await ably.connection.once('connected');
})


</script>

<template>
    <div class="navbar navbar-accent bg-base-200 fixed top-0 z-[999]">
        <div class="flex-1">
            <a @click="loc = -1" class="nig btn btn-ghost normal-case text-xl">Acamponeza</a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <label @click="setTotal()" tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="badge badge-sm indicator-item">{{ data[0].length + data[1].length + data[2].length
                            + data[3].length }}</span>
                    </div>
                </label>
                <div tabindex="0"
                    class="mt-3 card card-compact dropdown-content w-96 bg-base-100 border-2 border-base-200 shadow">
                    <div class="card-body">
                        <span class="font-bold text-lg">Cart: {{ data[0].length + data[1].length + data[2].length
                            + data[3].length }}</span>
                        <div class="h-full flex flex-col gap-1  ">
                            <div v-for="section in data">
                                <div v-for="item in section"
                                    class="w-full rounded-xl p-1 mt-1 flex flex-row bg-base-200 gap-2 items-center">
                                    <h1 class="text-lg font-bold">{{ item.name }}</h1>
                                    <h1 class="text-lg"> {{ item.price }}</h1>
                                    <div v-if="item['options']" class="badge badge-accent badge-sm">optiune</div>
                                    <div class="flex-1"></div>
                                    <button @click="deleteItem(section.indexOf(item), data.indexOf(section))"
                                        class="btn btn-sm btn-error text-lg">X</button>
                                </div>
                            </div>
                        </div>
                        <span class="text-black">Subtotal: {{
                            tot
                        }}</span>
                        <div v-if="data[0].length + data[1].length + data[2].length
                                + data[3].length !== 0" class="card-actions">
                            <label for="order" class="btn btn-primary btn-block">Order</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <input type="checkbox" id="order" class="modal-toggle" />
    <label @click="pageOrder = 0" for="order" class="modal cursor-pointer">
        <label class="modal-box relative flex flex-col justify-center items-center" for="">
            <div class="flex flex-col justify-center items-center" v-if="pageOrder === 0">
                <h3 class="text-xl font-bold mb-2">Selecteaza o metoda de plata</h3>
                <div class="flex flex-row w-max h-max gap-2">
                    <div @click="setPayment('card')"
                        class="hover:border-neutral w-32 h-32 bg-base-200 rounded-lg border-4 border-dashed  flex justify-center items-center text-5xl border-base-300 text-base-300 cursor-pointer"
                        :class="{ 'border-neutral': payment == 'card', 'text-neutral': payment == 'card' }">
                        Card</div>
                    <div @click="setPayment('cash')"
                        class="hover:border-neutral w-32 h-32 bg-base-200 rounded-lg border-4 border-dashed  flex justify-center items-center text-5xl border-base-300 text-base-300 cursor-pointer"
                        :class="{ 'border-neutral': payment == 'cash', 'text-neutral': payment == 'cash' }">
                        Cash</div>
                </div>
                <label @click="Order" class="btn mt-2">Order</label>
            </div>
            <div v-else class="flex flex-col justify-center items-center">
                <div class="text-4xl">Thanks for ordering!</div>
                <label @click="pageOrder.value = 0" for="order" class="btn">New Order</label>
            </div>
        </label>
    </label>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap");

.nig {
    font-family: "Lobster Two", cursive;
}
</style>