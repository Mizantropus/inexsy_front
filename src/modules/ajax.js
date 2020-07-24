import axios from 'axios'


class Ajax {
  constructor () {
    this.apiClient = axios.create({
      baseURL: "http://inexsy.site:8000/api",
      headers: {}
    })
  }

  get (url, token=undefined) {
    if(token) this.apiClient.headers["Authorization"] = "Token " + token
    return this.apiClient.get(url)
  }

  post (url, data, token=undefined) {
    if(token) this.apiClient.headers["Authorization"] = "Token " + token
    return this.apiClient.post(url, data)
  }
}

export default new Ajax()
