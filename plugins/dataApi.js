export default function(context, inject) {
    const appId = '99FRVD479B'
    const apiKey = '4f3fb7137aaaa71dcac82a9c0df893d2'

    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    }

    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
    })

    async function getHome(homeId) {
        // two levels of errors to handle:
        // unexpected response
        // no response at all (DNS error, connectivity issue)
        try {
            return unWrap(await fetch(
                `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
                { headers }
            ))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return unWrap(await fetch(
                `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
                { 
                    headers,
                    method: 'POST',
                    body: JSON.stringify({
                        filters: `homeId:${homeId}`,
                        hitsPerPage: 6,
                        attributesToHighlight: [],
                    })
                }
            ))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId) {
        try {
            return unWrap(await fetch(
                `https://${appId}-dsn.algolia.net/1/indexes/users/query`,
                { 
                    headers,
                    method: 'POST',
                    body: JSON.stringify({
                        filters: `homeId:${homeId}`,
                        attributesToHighlight: [],
                    })
                }
            ))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText,
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}
