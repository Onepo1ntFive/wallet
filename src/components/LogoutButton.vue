<template>
    <button @click="logout">Logout</button>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        logout(){
             window.localStorage.removeItem('token');
             this.$router.push('/');
        }
    },
}
</script>