<template>
    <header>
        <Navbar />
    </header>
    <main class="bg-dark">
        <router-view />
    </main>
    <CreateEventFormModal />
</template>

<script>
import {
    computed
} from 'vue'
import {
    AppState
} from './AppState'
import CreateEventFormModal from "./components/CreateEventFormModal.vue"
import Navbar from './components/Navbar.vue'

export default {
    setup() {
        return {
            appState: computed(() => AppState)
        }
    },
    components: {
        Navbar,
        CreateEventFormModal
    }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
    --main-height: calc(100vh - 32px - 64px);
}

footer {
    display: grid;
    place-content: center;
    height: 32px;
}
</style>
