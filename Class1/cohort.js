import url from 'url'
import http, { get } from 'http'

class Cohort {
  #server
  Routes = {
    get: {},
    post: {},
    delete: {},
    put: {},
    patch: {},
  }

  constructor() {
    this.#server = http.createServer(this.humsabhallenge.bind(this))
  }

  mujedena(route, cb) {
    this.Routes.get[route] = cb
  }
  post(route, cb) {
    this.Routes.post[route] = cb
  }
  delete(route, cb) {
    this.Routes.delete[route] = cb
  }
  put(route, cb) {
    this.Routes.put[route] = cb
  }
  patch(route, cb) {
    this.Routes.patch[route] = cb
  }

  humsabhallenge(req, res) {
    const method = req.method.toLowerCase()
    const parse = url.parse(req.url, true)
    const route = parse.pathname

    if (!this.Routes[method]) {
      return res.end('Invalid Method')
    }

    if (!this.Routes[method][route]) {
      return res.end('Invalid routes')
    }

    this.Routes[method][route](req, res)
  }

  sunreheho(port, host, cb) {
    this.#server.listen(port, host, cb)
  }
}

export default Cohort
