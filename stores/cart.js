import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', () => {
    const data = ref([[], [], [], []]);
    const tableNumber = ref(-1);
    const orderId = ref(-1);
    const loc = ref(-1);
    return { data, tableNumber, orderId, loc };
}


)