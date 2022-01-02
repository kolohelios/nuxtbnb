export default function(context, inject) {
    const appId = '99FRVD479B'
    const apiKey = '4f3fb7137aaaa71dcac82a9c0df893d2'

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        console.log({ homeId })
        const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': appId,
            }
        })
        const json = await response.json()
        return json
    }
}
