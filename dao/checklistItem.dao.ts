import {HostClient} from "atlassian-connect-express";


export const getItems = async (
    httpClient: HostClient,
    addonKey: string,
    userId: string,
    issueId: string): Promise<string> => new Promise((resolve, reject) => {
    httpClient.asUserByAccountId(userId).get({
            url: `/rest/api/3/user/properties/${addonKey}_${issueId}?accountId=${userId}`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        },
        function (error, response, body) {
            resolve(response && response.statusCode == 200 ? JSON.parse(body)['value'] : '[]')
        })
})

export const replaceItems = async (
    httpClient: HostClient,
    addonKey: string,
    userId: string,
    issueId: string,
    newItems: string
): Promise<number> => new Promise((resolve, reject) => httpClient.asUserByAccountId(userId).put({
        url: `/rest/api/3/user/properties/${addonKey}_${issueId}?accountId=${userId}`,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: newItems,
        json: true
    },
    function (error, response, body) {
        if (!response) {
            reject(500)
        }
        if (response.statusCode !== 200 && response.statusCode !== 201) {
            reject(response.statusCode)
        } else {
            resolve(response.statusCode)
        }
    }))
