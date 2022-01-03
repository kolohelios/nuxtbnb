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
    <div>{{ home.description }}</div>
    <div style="height:800px;width:800px" ref="map"></div>
</div>
</template>
<script>
export default {
    head() {
        return {
            title: this.home.title,
        }
    },
    async asyncData({ params, $dataApi, error }) {
        const response = await $dataApi.getHome(params.id)
        if (!response.ok) { return error({ statusCode: response.status, message: response.statusText })}
        return { home: response.json }
    },
    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    }
}
</script>
