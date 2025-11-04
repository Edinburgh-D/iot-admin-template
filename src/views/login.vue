<template>
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">登录</h2>

            <el-form :model="loginForm" ref="loginFormRef" @submit.prevent="handleLogin" class="login-form">
                <el-form-item prop="username" class="login-form-item">
                    <label for="username" class="login-label">用户名</label>
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" :prefix-icon="User"
                        class="login-input" />
                </el-form-item>

                <el-form-item prop="password" class="login-form-item">
                    <label for="password" class="login-label">密码</label>
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large"
                        :prefix-icon="Lock" show-password class="login-input" />
                </el-form-item>

                <!-- 使用算术验证码组件 -->
                <el-form-item prop="captcha" class="login-form-item">
                    <label for="captcha" class="login-label">验证码</label>
                    <CaptchaArithmetic v-model="loginForm.captcha" ref="captchaRef" @enter-press="handleLogin" />
                </el-form-item>

                <el-form-item class="login-form-item !mb-0">
                    <el-button type="primary" size="large" native-type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                        :loading="loading">
                        登录
                    </el-button>
                </el-form-item>

                <div class="mt-6 text-center text-gray-600 text-sm">
                    <el-link type="primary" :underline="false">忘记密码？</el-link>
                </div>
            </el-form>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import CaptchaArithmetic from '@/components/captcha-arithmetic.vue'; // 导入验证码组件

// 定义表单数据，新增 captcha 字段
const loginForm = reactive({
    username: '',
    password: '',
    captcha: '', // 存储用户输入的验证码结果
});

const loading = ref(false); // 登录按钮加载状态

// 获取验证码组件实例，用于调用其方法
const captchaRef = ref<InstanceType<typeof CaptchaArithmetic> | null>(null);

const router = useRouter();

const handleLogin = () => {
    // 校验表单项是否填写
    if (!loginForm.username) {
        ElMessage.warning('请输入用户名！');
        return;
    }
    if (!loginForm.password) {
        ElMessage.warning('请输入密码！');
        return;
    }
    if (!loginForm.captcha) {
        ElMessage.warning('请输入验证码！');
        return;
    }

    // 校验验证码
    if (!captchaRef.value?.validateCaptcha(loginForm.captcha)) {
        ElMessage.error('验证码错误，请重试！');
        captchaRef.value?.generateCaptcha(); // 验证码错误时刷新
        return;
    }

    loading.value = true; // 开启加载状态

    // 模拟登录请求
    setTimeout(() => {
        loading.value = false; // 关闭加载状态
        if (loginForm.username === 'admin' && loginForm.password === '123456') {
            ElMessage.success('登录成功！');
            localStorage.setItem('isLoggedIn', 'true'); // 登录成功后设置标志
            router.push({ name: 'Home' });
        } else {
            ElMessage.error('用户名或密码错误！');
            captchaRef.value?.generateCaptcha(); // 登录失败时刷新验证码
        }
    }, 1000); // 模拟网络延迟
};
</script>
  
<style scoped>
/* 使用 Tailwind 的 @apply 结合 Element Plus 的穿透样式来定制 */

/* 针对 el-form-item 及其内部 label */
.login-form-item :deep(.el-form-item__label) {
    @apply block text-gray-700 text-sm font-bold mb-2;
}

.login-form-item {
    @apply mb-4;
    /* 统一表单项的底部间距 */
}

/* 针对 el-input 的内部 input 元素和容器 */
.login-input {
    @apply rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500  focus:ring-opacity-50 w-full;
}

.login-input :deep(.el-input__wrapper) {
    @apply rounded-lg px-3 py-2;
    box-shadow: none !important;
}

.login-input :deep(.el-input__inner) {
    @apply !h-auto !py-1;
}

/* 针对 el-button 的内部 span */
.el-button span {
    @apply text-white;
}
</style>