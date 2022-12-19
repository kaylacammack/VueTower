<template>
    <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
        <div class="card" style="width: 18rem;">
            <img :src="event.coverImg" class="card-img-top eventImg" alt="...">
            <div class="card-body">
                <h5>{{ event.name }}</h5>
            </div>
        </div>
    </router-link>
</template>

<script>


export default {
    props: {
        event: { type: Object, required: true }
    },
    setup() {
        return {}
    }
}
</script>

<style scoped lang="scss">
.eventImg {
    height: 25vh;
}
</style>