<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/" exact-active-class="active">Home</router-link>
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link class="nav-link" to="/login" exact-active-class="active">Login</router-link
                    >
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link class="nav-link" to="/signup" exact-active-class="active">Signup</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <router-link class="nav-link" to="/dashboard" exact-active-class="active">Dashboard</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <a
                        href="#"
                        class="nav-link"
                        @click.prevent="onLogout()"
                        >Logout</a
                    >
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
    IS_USER_AUTHENTICATE_GETTER,
    LOGOUT_ACTION,
} from '../store/storeconstants';
export default {
    computed: {
        ...mapGetters('auth', {
            isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
        }),
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION,
        }),
        onLogout() {
            this.logout();
            this.$router.replace('/login');
        },
    },
    name: 'Nav-bar',
};
</script>