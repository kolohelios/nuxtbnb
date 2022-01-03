<template>
<div style="text-align: center;">
    <img src="https://www.hera.org.nz/wp-content/uploads/20150918_Notice_HERAreportR4-103Error_STRUC.jpg" width="200"/><br/><br/>
    <h1>Error!</h1>
    <div>{{ error.message }} {{ error.statusCode }}</div>
</div>
</template>
<script>
export default {
    head() {
        return {
            title: 'BIG PROBLEMS!',
        }
    },
    props: {
        error: {
            type: Object,
            required: true,
        }
    }
}
</script>
