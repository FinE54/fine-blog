import axios from 'axios'
import { stringify } from 'querystring'
import { baseUrl } from 'config'

class Request {
    options = {
        baseUrl: '',
        url: '',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    }

    static reqInt(option) {
        return option
    }
    constructor(options) {
        if (options) Object.assign(this.options, options)
    }

    request(option) {
        const { baseUrl, url, ...otherOpt } = {
            ...this.options,
            ...Request.reqInt(option)
        }
        const fetchUrl = baseUrl + url
        return axios({
            ...otherOpt,
            url: fetchUrl
        }).then(({ data }) => {
            return data
        })
    }

    get(url, param, opt = {}) {
        if (param) url = `${url}?${stringify(param)}`
        const options = {
            ...opt,
            url,
            method: 'GET',
        }
        return this.request(options)
    }

    post(url, data, opt = {}) {
        const options = {
            ...opt,
            url,
            body: JSON.stringify(data),
            method: 'POST'
        }
        return this.request(options)
    }

    put(url, data, opt = {}) {
        const options = {
            ...opt,
            url,
            body: JSON.stringify(data),
            method: 'PUT'
        }
        return this.request(options)
    }

    delete(url, data, opt = {}) {
        const options = {
            ...opt,
            url,
            body: JSON.stringify(data),
            method: 'DELETE'
        }
        return this.request(options)
    }
}

export const defHttp = new Request({
    baseUrl
})
export default Request