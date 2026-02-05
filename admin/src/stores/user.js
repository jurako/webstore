import { defineStore } from 'pinia'
import { ref } from 'vue'


const useUserStore = defineStore('user', () => {
    let name = ref('');
    let isAuth = ref(false);

    return { name, isAuth }
});

export default useUserStore;