<template>
    Hello from admin!

    <button @click="login">Login</button>
    <button @click="testRequest">Test Admin</button>
    <button @click="logout">Logout</button>
</template>

<script setup>

import axios from '@/config/axios'

function login() {
  axios.post('admin/login', {
    'username': 'jurako',
    'password': 'test333'
  })
  .then(response => {
    console.log('Logged in! Data: ', response.data);

    localStorage.setItem('token', response.data.token);
  });
}

function logout() {
  axios.post('admin/logout')
    .then(response => {
      console.log('Logout successful!');
      localStorage.removeItem('token');
    })
}

function testRequest() {
  axios.get('test-admin')
  .then(response => {
    console.log(response.data);
  });
}

</script>