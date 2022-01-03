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
    <div v-for="review in reviews" :key="review.objectID">
        <img :src="review.reviewer.image"/><br/>
        <div>{{ review.reviewer.name }}</div>
        <div>{{ formatDate(review.date) }}</div>
        <short-text :text="review.comment" :target="150"/><br/>
    </div>
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
        const homeResponse = await $dataApi.getHome(params.id)
        if (!homeResponse.ok) { return error({ statusCode: homeResponse.status, message: homeResponse.statusText })}

        const reviewResponse = await $dataApi.getReviewsByHomeId(params.id)
        if (!reviewResponse.ok) { return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })}

        return {
            home: homeResponse.json,
            reviews: reviewResponse.json.hits,
        }
    },
    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },
    methods: {
        formatDate(dateStr) {
            const date = new Date(dateStr)
            return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
        }
    }
}
</script>
