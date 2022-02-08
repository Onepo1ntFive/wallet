<template>
    <the-header></the-header>
    <h2>Main app view</h2>
    <pre>
        {{ transactions }}
    </pre>
</template>

<script>
import { getTransactions, CheckUserAuthorized } from "../api/api.js";
import TheHeader from "../components/Layout/TheHeader.vue";
export default {
    data() {
        return {
            transactions: null,
        };
    },
    components: { TheHeader },
    methods: {
        successRequest(response) {
            console.log("successRequest", response);
            this.transactions = response.data;
        },
        errorRequest(error) {
            console.log(error);
        },
        successUserAuthorized() {
            getTransactions(this.successRequest, this.errorRequest);
        },
        errorSuccessAuthorized() {
            this.$router.push("/");
        },
    },
    mounted() {
        CheckUserAuthorized(
            this.successUserAuthorized,
            this.errorSuccessAuthorized
        );
    },
};
</script>