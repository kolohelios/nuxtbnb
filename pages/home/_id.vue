<template>
<div>
    <div style="display:flex;">
        <img v-for="image in home.images" :key="image" :src="image" alt="something descriptive" width="200" height="150"/>
    </div>
    <div>{{ home.title }}</div>
    <div>${{ home.pricePerNight }} / night </div>
    <div><img src="/images/marker.svg" width="20" height="20" /> {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}</div>
    <div><img src="/images/star.svg" width="20" height="20" /> {{ home.reviewValue }}</div>
    <div>{{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bathrooms</div>
</div>
</template>
<script>
import homes from '~/data/homes'
export default {
    head() {
        return {
            title: this.home.title
        }
    },
    data() {
        return {
            home: {}
        }
    },
    created() {
        const home = homes.find(home => home.objectID == this.$route.params.id)
        this.home = home
    }
}
</script>
