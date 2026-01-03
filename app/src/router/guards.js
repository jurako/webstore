import { useUserStore } from "@/stores/user";
import axios from "@/config/axios";

/**
 * Gets fired when user goes to verification link in email
 */
async function emailVerificationGuard(to, from) {

    const storeUser = useUserStore();

    if(!storeUser.isAuthenticated) {
        return { name: 'login' };
    }

    await axios
      .get(
        '/email/verify/' + to.params.id + '/' + to.params.hash,
        { params: { ...to.query } })
      .then((response) => {

        storeUser.isVerified = true;
        localStorage.setItem('isVerified', true);
      })
      .catch((err) => {
        console.log('error', err);
      })

    return { name: 'orders' }
}

export { emailVerificationGuard }