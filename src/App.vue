<template>
    <router-view />
    <!-- <div>
    <button v-if="!token" @click="login">Login</button>
    <button @click="getData">GET DATA! BITCH!</button>
  </div>
  <ul v-if="!isLoading">
    <li
      v-for="transaction in transactions"
      :key="transaction.cloudId"
      :style="{
        backgroundColor: getItemByCloudID(categories, transaction.categoryId)
          .color,
      }"
    >
      <div>
        <em>{{ transaction.date }}</em>
        {{ getItemByCloudID(categories, transaction.categoryId).name }},
        {{ getItemByCloudID(accounts, transaction.accountId).name }}
      </div>

      <strong>
        {{
          getItemByCloudID(categories, transaction.categoryId).type === "income"
            ? "+"
            : "-"
        }}
        {{ transaction.amount }}
        {{ getItemByCloudID(accounts, transaction.accountId).currency }}</strong
      >
    </li>
  </ul> -->
</template>

<script>
import axios from "axios";
export default {
    name: "App",
    data() {
        return {
            hasData: false,
            isLoading: false,
            baseURL: "https://qwertyway.noip.me/wallet/",
            regURL: "https://qwertyway.noip.me/wallet/auth/register",
            authURL: "https://qwertyway.noip.me/wallet/auth/login",
            transactionsURL:
                "https://qwertyway.noip.me/wallet/data/transactions",
            accountsURL: "https://qwertyway.noip.me/wallet/data/accounts",
            categoriesURL: "https://qwertyway.noip.me/wallet/data/categories",
            token: null,
            authData: {
                email: "name.diesel@gmail.com",
                password: "123asdqwezxc",
            },
            headers: {
                "X-Auth-Token": this.token,
            },
            transactions: Array,
            accounts: Array,
            categories: Array,
        };
    },
    computed: {},
    methods: {
        async login() {
            await this.postToServer(this.authURL, this.authData, (response) => {
                this.token = response.data.token;
            });
        },
        async getData() {
            if (!this.isLoading) {
                this.isLoading = true;
                await this.getFromServer(this.transactionsURL, (response) => {
                    console.log("transactions", response.data);
                    this.transactions = response.data;
                    this.hasData = true;
                    this.isLoading = false;
                });
                await this.getFromServer(this.accountsURL, (response) => {
                    console.log("accounts", response.data);
                    this.accounts = response.data;
                    this.hasData = true;
                    this.isLoading = false;
                });
                await this.getFromServer(this.categoriesURL, (response) => {
                    console.log("categories", response.data);
                    this.categories = response.data;
                    this.hasData = true;
                    this.isLoading = false;
                });
            }
        },
        postToServer(route, data, callback) {
            return axios
                .post(route, data)
                .then(function (response) {
                    console.log(response);
                    if (callback) {
                        callback(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getFromServer(route, callback) {
            axios
                .get(route, {
                    headers: {
                        "X-Auth-Token": this.token,
                    },
                })
                .then(function (response) {
                    if (callback) {
                        callback(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getItemByCloudID(array, cloudId) {
            if (Array.isArray(array) && array.length) {
                let filteredItem = array.filter(
                    (item) => item.cloudId === cloudId
                );
                return filteredItem[0];
            }
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
pre {
    margin-bottom: 15px;
    text-align: left;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #f1f1f1;
    font-size: 12px;
    font-family: "Fira Code", serif;
}
</style>
