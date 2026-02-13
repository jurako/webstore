import { ref } from 'vue'
import axios from '@/config/axios' //TO DO: make only a single instance of axios and move it to shared
import { isObjectEmpty } from '~/misc/helpers'

export function usePostWithValidation() {
    const errors = ref({});

    async function post(url, fields, validator, thenCb, catchCb = null) {

      validator.validate();
      errors.value = validator.errors;

      if(isObjectEmpty(errors.value)) {

        try {
          const result = await axios.post(url, fields);
          return result;
        } catch (err) {
          const backendErrors = err?.response?.data?.errors;

          if(!backendErrors) return false;

          for (const key in backendErrors) {
            errors.value[key] = backendErrors[key][0];
          }

          if(typeof catchCb == 'function') {
              catchCb();
          }
        }
      }
    }

    return { errors, post };
}