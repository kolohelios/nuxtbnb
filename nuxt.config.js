export default {
    components: true,
    head: {
        titleTemplate: 'MasteringNuxt: %s',
        htmlAttrs: {
            lang: 'en'
        },
        bodyAttrs: {
            class: ["my-style"]
        },
        meta: [{
            charset: 'utf-8'
        }]
    },
    router: {
        prefetchLinks: false
    },
    plugins: [
        // commented-out object form followed by simple string form
        // {
        //     src: '~/plugins/maps.client',
        //     mode: 'client' // don't need this since the string include src string include "client"
        // }
        '~/plugins/maps.client',
    ]
}
