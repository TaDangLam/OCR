<template >
    <div  ng-if="currentPage.registerPage"  class="flex items-center justify-center min-h-screen">
        <div class="flex flex-col bg-slate-200 h-auto w-full max-w-xl shadow-2xl rounded-[25px] pt-6 pb-2 mx-2">
            <div class="flex flex-col items-center justify-center w-full gap-3 pt-2">
                <div class="text-5xl font-bold text-[#005AA7]">Sign Up {{ abc }}</div>
                <div class="text-[#005AA7] pt-5">---------------------------</div>
                <div ng-click="showLogin()" class="hover:text-[#005AA7] hover:opacity-75 duration-300 cursor-pointer">If you have an account, Login </div>
            </div>
    
            <form ng-submit="registerUser()" class="flex flex-col items-center justify-center w-full mt-5 pt-5">
                <div class="flex flex-col md:flex-row items-center justify-center gap-3 w-full px-5">
                    <!-- First Column -->
                    <div class="flex flex-col items-end gap-2 w-full md:w-1/3">
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="text" placeholder="Username" ng-model="user.username" class="w-full bg-slate-100 outline-none" />
                        </label>
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="password" placeholder="Password" ng-model="user.password" class="w-full bg-slate-100 outline-none" />
                        </label>
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="password" placeholder="Repeat Password" ng-model="user.confirmPassword" class="w-full bg-slate-100 outline-none" />
                        </label>
                    </div>
    
                    <!-- Second Column -->
                    <div class="flex flex-col items-start gap-2 w-full md:w-1/3">
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="text" placeholder="Full Name" ng-model="user.fullname" class="w-full bg-slate-100 outline-none" />
                        </label>
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="email" placeholder="Email" ng-model="user.email" class="w-full bg-slate-100 outline-none" />
                        </label>
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="text" placeholder="Phone" ng-model="user.phone" class="w-full bg-slate-100 outline-none" />
                        </label>
                    </div>
    
                    <!-- Third Column -->
                    <div class="flex flex-col items-start gap-2 w-full md:w-1/3">
                        <label class="flex items-center gap-2 w-full bg-slate-100 p-3">
                            <input type="date" ng-model="user.dateOfBirth" class="w-full bg-slate-100 outline-none" />
                        </label>
                    </div>
                </div>
    
                <!-- Gender Radio Buttons -->
                <div class="flex gap-10 w-full items-center justify-center mt-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" ng-model="user.gender" value="male" /> Male
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" ng-model="user.gender" value="female" /> Female
                    </label>
                </div>
    
                <!-- Sign Up Button -->
                <div class="flex flex-col items-center justify-center mt-4">
                    <button type="submit" class="bg-[#005AA7] text-white font-semibold w-36 h-10 rounded-full hover:opacity-75 duration-300">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    
</style>