<template>
  <div class="w-96 rounded-xl border bg-white p-8 shadow sm:w-auto sm:max-w-screen-sm sm:flex-grow">
    <h1 class="text-center text-3xl font-bold text-neutral-600">Sign in</h1>
    <section class="mb-7 mt-11 flex flex-col items-center gap-y-5">
      <InputField
        v-model="email"
        v-error="errors.email"
        class="w-full sm:w-1/2"
        placeholder="Email"
        ref="emailInput"
      />
      <InputField
        v-model="password"
        v-error="errors.password"
        class="w-full sm:w-1/2"
        inputType="password"
        placeholder="Password"
        ref="passwordInput"
      />
      <ErrorMessage v-show="!isObjectEmpty(errors)">
        {{ errors.email || errors.password }}
      </ErrorMessage>
      <BaseButton class="w-full uppercase sm:w-1/2" @click="submit">Login</BaseButton>
      <p>
        Not a member?
        <RouterLink class="text-han-blue hover:underline" :to="{ name: 'register' }"
          >Register</RouterLink
        >
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import InputField from '@/components/form_items/InputField.vue'
import ErrorMessage from '@/components/form_items/ErrorMessage.vue'
import BaseButton from '@/components/BaseButton.vue'

import { isObjectEmpty } from '~/misc/helpers'
import { isEmpty, isInvalidEmail, Validator } from '~/misc/validator'
import { usePostWithValidation } from '~/composables/usePostWithValidation'

const storeUser = useUserStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const validator = new Validator([
  { rule: isEmpty, fields: { email, password } },
  { rule: isInvalidEmail, fields: { email } }
])

const { errors, post } = usePostWithValidation();

function submit() {

  post(
    '/login',
    {
      email: email.value,
      password: password.value
    },
    validator
  ).then((response) => {

    if(!response) return;

    storeUser.persistDataAfterLogin(response.data)

    const redirectedFrom = route?.redirectedFrom;

    if(redirectedFrom?.name == 'verification-handler') {
      router.push({ name: 'verification-handler', params: { ...redirectedFrom.params }, query: { ...redirectedFrom.query } });
    } else {
      router.push({ name: 'orders' })
    }
  });
}
</script>
