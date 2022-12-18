<template>
    <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
    </div>
    <div v-for="ticket in myTickets">
        <h4> {{ ticket }}</h4>
    </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
    setup() {
        return {
            account: computed(() => AppState.account),
            myTickets: computed(() => AppState.myTickets),

        }
    }
}
</script>

<style scoped>
img {
    max-width: 100px;
}
</style>
