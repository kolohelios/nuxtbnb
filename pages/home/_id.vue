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
import homes from '~/data/homes'

export default {
    head() {
        return {
            title: this.home.title,
            script: [
                {
                    src: 'https://maps.googleapis.com/maps/api/js?key=<GoogleMapsKey>&libraries=places&callback=initMap',
                    hid: 'map',
                    defer: true,
                    skip: process.client && window.mapLoaded,
                },
                {
                    innerHTML: "window.initMap = function() { window.mapLoaded = true }",
                    hid: 'map-init'
                }
            ],
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
    },
    mounted() {
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
            disableDefaultUI: true,
            zoomControl: true,
        }
        const map = new window.google.maps.Map(this.$refs.map, mapOptions)
        const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
        const marker = new window.google.maps.Marker({ position })
        marker.setMap(map)
}
}
</script>
