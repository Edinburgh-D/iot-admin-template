<template>
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">登录</h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">用户名</label>
                    <input type="text" id="username" v-model="username"
                        class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="请输入用户名" required />
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">密码</label>
                    <input type="password" id="password" v-model="password"
                        class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="请输入密码" required />
                </div>

                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 w-full">
                        登录
                    </button>
                </div>

                <div class="mt-6 text-center text-gray-600 text-sm">
                    <a href="#" class="text-blue-600 hover:text-blue-800 transition duration-200">忘记密码？</a>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 假设你已经配置了 Vue Router
 
const username = ref('');
const password = ref('');
const router = useRouter(); // 获取 router 实例

const handleLogin = () => {
    // 这里可以添加你的登录逻辑，例如发送 API 请求
    console.log('用户名:', username.value);
    console.log('密码:', password.value);

    // 示例：登录成功后跳转到首页
    if (username.value === 'admin' && password.value === '123456') {
        alert('登录成功！');
        router.push('/'); // 跳转到首页 (请确保你的路由配置中 '/' 对应的是你的管理后台主页)
    } else {
        alert('用户名或密码错误！');
    }
};
</script>
  
<style scoped>
/* 这里可以添加组件特有的样式，但 Tailwind CSS 已经处理了大部分 */
</style>