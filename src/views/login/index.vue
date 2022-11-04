<script setup lang="ts">
import { reactive, ref, watchEffect, onMounted, h } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import AnimatedInput from '@/components/AnimatedInput/index.vue'
import { userStore } from '@/store/user'
import { message } from 'ant-design-vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { notification } from 'ant-design-vue'

const useUserStore = userStore()

interface FormState {
  username: string
  password: string
}

const loginFormRef = ref<FormInstance>()

const formState = reactive<FormState>({
  username: '',
  password: ''
})

const handleUsernameChange = (value: string) => {
  formState.username = value
  loginFormRef!.value!.validateFields('username')
}

const handlePasswordChange = (value: string) => {
  formState.password = value
  loginFormRef!.value!.validateFields('password')
}

const usernameTextDecorationColor = ref('#000000')
const passwordTextDecorationColor = ref('#000000')

const usernameValidator = async (_rule: Rule, value: string) => {
  if (value === '') {
    usernameTextDecorationColor.value = '#ff0000'
    return Promise.reject('Please input the username!')
  }
  usernameTextDecorationColor.value = '#000000'
  return Promise.resolve()
}

const passwordValidator = async (_rule: Rule, value: string) => {
  if (value === '') {
    passwordTextDecorationColor.value = '#ff0000'
    return Promise.reject('Please input the password!')
  }
  passwordTextDecorationColor.value = '#000000'
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: usernameValidator,
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      validator: passwordValidator,
      trigger: 'change'
    }
  ]
}

let redirect = ref(undefined)
const otherQuery = ref({})
const route = useRoute()

const getOtherQuery = (query: object) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      // @ts-ignore
      acc[cur] = query[cur]
    }
    return acc
  }, [])
}

watchEffect(() => {
  const query = route.query
  if (query) {
    redirect.value = query.redirect
    otherQuery.value = getOtherQuery(query)
  }
})

const key = `open${Date.now()}`

const handleLogin = async (formState: FormState) => {
  let res
  try {
    res = await useUserStore.login(formState)
  } catch (error) {
    console.log('error', error)
    message.error('error')
    return
  }
  const { code, message: msg } = res
  if (code !== 0) {
    message.error(msg)
  } else {
    message.success('Login Success')
    router.push({ path: redirect.value || '/', query: otherQuery.value })
    notification.close(key)
  }
}

onMounted(() => {
  notification['info']({
    message: '示例账号密码',
    duration: null,
    placement: 'topLeft',
    description: () =>
      h('div', { class: 'container' }, [
        h('div', null, '账号：admin'),
        h('div', null, '密码：123456')
      ]),
    key
  })
})
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center login-container">
    <div class="form-container">
      <h1 class="text-center font-bold">Login</h1>
      <a-form
        :model="formState"
        name="basic"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        :rules="rules"
        ref="loginFormRef"
        class="flex flex-col items-center"
        @finish="handleLogin"
      >
        <a-form-item name="username" :wrapper-col="{ span: 24 }">
          <animated-input
            v-model="formState.username"
            label="Username"
            type="text"
            :text-decoration-color="usernameTextDecorationColor"
            @update:modelValue="handleUsernameChange"
          >
          </animated-input>
        </a-form-item>

        <a-form-item name="password" :wrapper-col="{ span: 24 }">
          <animated-input
            v-model="formState.password"
            label="Password"
            type="password"
            :text-decoration-color="passwordTextDecorationColor"
            @update:modelValue="handlePasswordChange"
          >
          </animated-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 6 }">
          <a-button type="primary" html-type="submit" block class="submit-btn">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  background-color: #f6f5f7;
  .form-container {
    background-color: #ffffff;
    width: 768px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 30px;
    padding: 40px;
    h1 {
      margin: 40px;
      font-size: 24px;
      font-family: Helvetica;
    }
    .ant-form-item {
      width: 70%;
      padding-bottom: 20px;
    }
    .submit-btn {
      margin-top: 20px;
    }
  }
}
</style>
