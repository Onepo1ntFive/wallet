<template>
    <h3>AuthForm</h3>
    <form @submit.prevent="submitForm">
        <div>
            <input v-model.trim="login" type="email" placeholder="Email" />
        </div>
        <div>
            <input
                v-model.trim="password"
                type="password"
                placeholder="Password"
            />
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
</template>

<script>
import { submitLoginForm, CheckUserAuthorized } from "../../api/api.js";
export default {
    data() {
        return {
            login: null,
            password: null,
        };
    },
    methods: {
        submitForm() {
            submitLoginForm(
                this.login,
                this.password,
                this.successRequest,
                this.errorRequest
            );
        },
        successRequest(response) {
            const token = response.data.token;
            window.localStorage.setItem("token", token);
            this.$router.push("/main");
        },
        errorRequest(error) {
            console.log(error);
        },
        successUserAuthorized() {
            this.$router.push("/main");
        },
        errorSuccessAuthorized() {
            this.$router.push("/");
        },
    },
    created() {
        CheckUserAuthorized(
            this.successUserAuthorized,
            this.errorSuccessAuthorized
        );
    },
};
</script>