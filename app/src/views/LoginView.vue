<template>
  <div class="w-96 rounded-xl border bg-white p-8 shadow sm:w-auto sm:max-w-screen-sm sm:flex-grow">
    <h1 class="text-center text-3xl font-bold text-neutral-600">Sign in</h1>
    <section class="mb-7 mt-11 flex flex-col items-center gap-y-5">
      <InputField
        class="w-full sm:w-1/2"
        :class="[errors.email ? Validator.errorClasses : '']"
        v-model="email"
        placeholder="Email"
        ref="emailInput"
      />
      <InputField
        class="w-full sm:w-1/2"
        :class="[errors.password ? Validator.errorClasses : '']"
        inputType="password"
        v-model="password"
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
import InputField from '@/components/form_items/InputField.vue'
import ErrorMessage from '@/components/form_items/ErrorMessage.vue'
import BaseButton from '@/components/BaseButton.vue'
import { axiosBackend } from '@/config/axios'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { isEmpty, isInvalidEmail, Validator, isObjectEmpty } from '@/misc/helpers'

const storeUser = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errors = ref({})

const validator = new Validator([
  { rule: isEmpty, fields: { email, password } },
  { rule: isInvalidEmail, fields: { email } }
])

function submit() {
  validator.validate()
  errors.value = validator.errors

  if (isObjectEmpty(errors.value)) {
    axiosBackend
      .post('/login', {
        email: email.value,
        password: password.value
      })
      .then((response) => {
        storeUser.persistDataAfterLogin(response.data)

        router.push({ name: 'orders' })
      })
      .catch((err) => {
        errors.value = err.response.data
      })
  }
}
</script>
