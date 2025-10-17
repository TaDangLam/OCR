<template >
     <div class=" flex items-center justify-center min-h-screen">
        <div class="flex flex-col  h-3/6 w-11/12 sm:w-3/6 md:w-2/5 lg:w-1/3 shadow-2xl border border-gray-100 rounded-[25px]">
            <div class="flex flex-col w-full h-5/6 rounded-t-[25px] p-5 ">
                <div class="flex text-5xl font-bold items-center justify-center text-[#005AA7]">Login</div>
                <div class="flex items-center justify-center text-[#005AA7]" >---------------------------</div>
                <form @submit="handleLogin" class="py-5 flex flex-col items-center gap-4 w-full">
                    <label class="flex items-center gap-2 w-72 p-3 bg-slate-100">
                        <i class="fa-solid fa-envelope w-1/12"></i>
                        <input 
                            v-model="email"
                            type="text" 
                            placeholder="Email" 
                            class="w-full bg-slate-100 outline-none"
                            required
                        />
                    </label>
                    <label class="flex items-center gap-2 w-72 p-3 bg-slate-100">
                        <i class="fa-solid fa-lock w-1/12"></i>
                        <input 
                            v-model="password"
                            type="password" 
                            placeholder="Password" 
                            class="w-full bg-slate-100 outline-none"
                            required
                        />
                    </label>
                    <button type="submit" class="flex items-center font-bold justify-center bg-[#005AA7] text-white w-36 rounded-full my-3 p-3 hover:opacity-75 duration-300 cursor-pointer">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from '@/libs/vue-export.js';
    import { useMutation } from '@/libs/apollo-client.js'
    import { LOGIN_USER } from '@/graphql/index.js'
    import { useRouter } from "vue-router";
    const router = useRouter();
    
    const email = ref('');
    const password = ref('');

    const { mutate } = useMutation(LOGIN_USER)

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const { data } = await mutate({email: email.value, password: password.value});
            console.log('data: ', data);
                if (data?.login?.accessToken) {
                    localStorage.setItem('accessToken', data.login.accessToken)
                    localStorage.setItem('refreshToken', data.login.refreshToken)
                    router.push('/home')
                }
        } catch (error) {
            console.error('Lỗi login:', error.message)
        }
    }
</script>

<style scoped>
    
</style>