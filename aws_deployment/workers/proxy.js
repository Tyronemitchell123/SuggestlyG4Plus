export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api')) {
      url.host = new URL(env.API_ORIGIN).host
      return fetch(new Request(url, request))
    }
    return new Response('OK', { status: 200 })
  }
}


