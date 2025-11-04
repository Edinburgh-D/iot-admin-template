<template>
    <div class="flex items-center">
        <el-input v-model="captchaInput" placeholder="请输入结果" size="large" :prefix-icon="Picture"
            class="login-input flex-grow !w-auto" maxlength="4" @keyup.enter="emit('enter-press')" />
        <div class="w-32 h-12 ml-2 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center cursor-pointer text-lg font-bold text-gray-700 bg-gray-50 select-none hover:bg-gray-100 transition duration-200"
            @click="generateCaptcha" title="点击刷新">
            {{ captchaExpression }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Picture } from '@element-plus/icons-vue';

const emit = defineEmits(['update:modelValue', 'change', 'enter-press']);

// 组件外部传入的 v-model 绑定值，用于用户输入结果
const props = defineProps<{
    modelValue: string;
}>();

const captchaInput = ref(props.modelValue); // 用户输入的验证码
const captchaExpression = ref(''); // 验证码题目字符串，如 "5 + 3 ="
const captchaAnswer = ref(0); // 验证码的正确答案

// 生成算术验证码
const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1; // 1-9
    const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
    const operator = Math.random() > 0.5 ? '+' : '-'; // 加或减

    let answer;
    let expression;

    if (operator === '+') {
        answer = num1 + num2;
        expression = `${num1} + ${num2} =`;
    } else {
        // 确保减法结果不为负数
        if (num1 < num2) {
            answer = num2 - num1;
            expression = `${num2} - ${num1} =`;
        } else {
            answer = num1 - num2;
            expression = `${num1} - ${num2} =`;
        }
    }

    captchaExpression.value = expression;
    captchaAnswer.value = answer;
    captchaInput.value = ''; // 刷新题目时清空用户输入
    emit('update:modelValue', ''); // 同步清空父组件的 v-model 绑定值
    emit('change', ''); // 通知父组件值已改变
};

// 暴露给父组件，用于校验
const validateCaptcha = (value: string): boolean => {
    return parseInt(value) === captchaAnswer.value;
};

// 监听组件内部输入变化，同步给父组件
watch(captchaInput, (newValue) => {
    emit('update:modelValue', newValue);
    emit('change', newValue);
});

// 监听父组件 modelValue 变化，同步给内部输入 (例如父组件重置了表单)
watch(() => props.modelValue, (newValue) => {
    if (newValue !== captchaInput.value) {
        captchaInput.value = newValue;
    }
});


// 组件挂载时生成初始验证码
onMounted(() => {
    generateCaptcha();
});

// 暴露方法给父组件
defineExpose({
    generateCaptcha,
    validateCaptcha,
    captchaAnswer, // 暴露答案给父组件用于校验
});
</script>
  
<style scoped>
/* 仍然使用 Tailwind CSS 样式，确保和 Element Plus 的 input 保持一致 */
.login-input {
    @apply rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50;
}

.login-input :deep(.el-input__wrapper) {
    @apply rounded-lg px-3 py-2;
    box-shadow: none !important;
}

.login-input :deep(.el-input__inner) {
    @apply !h-auto !py-1;
}
</style>