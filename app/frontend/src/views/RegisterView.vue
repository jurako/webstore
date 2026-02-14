<template>
  <div class="w-96 rounded-xl border bg-white p-8 shadow sm:w-auto sm:max-w-screen-sm sm:flex-grow">
    <h1 class="text-center text-3xl font-bold text-neutral-600">Registration Form</h1>
    <section class="mb-7 mt-11 space-y-6">
      <div class="flex flex-col gap-y-6 sm:flex-row sm:items-center sm:gap-x-6">
        <InputField
          v-model="name"
          class="w-full sm:w-1/2"
          :class="{'input-error': errors.name}"
          placeholder="First Name"
        />
        <InputField
          v-model="lastname"
          class="w-full sm:w-1/2"
          :class="{'input-error': errors.lastname}"
          placeholder="Last Name"
        />
      </div>
      <div class="flex flex-col gap-y-6 sm:flex-row sm:items-center sm:gap-x-6">
        <InputField v-model="birthday" type="date" class="w-full sm:w-1/2" placeholder="Birthday" />
        <div class="w-full sm:w-1/2">
          <h2 class="mb-1 font-semibold sm:mb-0">Gender:</h2>
          <RadioButton v-model="gender" name="gender" value="F" label="Female" class="mr-2" />
          <RadioButton v-model="gender" name="gender" value="M" label="Male" />
        </div>
      </div>
      <div class="flex flex-col gap-y-6 sm:flex-row sm:items-center sm:gap-x-6">
        <InputField
          v-model="email"
          class="w-full sm:w-1/2"
          :class="{'input-error': errors.email}"
          placeholder="Email"
        />
        <InputField
          v-model="password"
          type="password"
          class="w-full sm:w-1/2"
          :class="{'input-error': errors.password}"
          placeholder="Password"
        />
      </div>
      <select v-model="country" class="w-full" name="country">
        <option value="Latvia">Latvia</option>
        <option value="Estonia">Estonia</option>
        <option value="Lithuania">Lithuania</option>
      </select>
      <ErrorMessage v-show="!isObjectEmpty(errors)">
        {{ errors.name || errors.lastname || errors.email || errors.password }}
      </ErrorMessage>
      <BaseButton @click="submit" class="uppercase"> Submit </BaseButton>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import InputField from '@/components/form_items/InputField.vue'
import RadioButton from '@/components/form_items/RadioButton.vue'
import ErrorMessage from '@/components/form_items/ErrorMessage.vue'
import BaseButton from '@/components/BaseButton.vue'

//TO DO: move rules into Validator class and set rules as strings (make map of rule names to rule objects)
import { isObjectEmpty } from '~/misc/helpers'
import { isEmpty, isInvalidEmail, Validator } from '~/misc/validator';
import { usePostWithValidation } from '~/composables/usePostWithValidation'

const storeUser = useUserStore()
const router = useRouter()

const name = ref('')
const lastname = ref('')
const birthday = ref(0)
const gender = ref('F')
const email = ref('')
const password = ref('')
const country = ref('')

const validator = new Validator([
  { rule: isEmpty, fields: { name, lastname, email, password } },
  { rule: isInvalidEmail, fields: { email } }
]);

const { errors, post } = usePostWithValidation();

function submit() {

  const thenCb = (response) => {
    storeUser.persistDataAfterLogin(response.data);
    router.push({ name: 'verification-notice' });
  }

  post(
    '/register',
    {
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value
    },
    validator,
    thenCb
  );
}
</script>
