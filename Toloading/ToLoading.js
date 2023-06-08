export default class ToLoading {
  #shake
  show
  close
  constructor () {
    this.#shake = null
    this.show = () => {
      const bgdiv = document.getElementById('loading')
      bgdiv.style = 'opacity: 1;z-index: 9999;'
      const loadingTrans = document.createElement('img')
      loadingTrans.src = require('@/assets/img/0161305aa1ed29a80121246d14b083.gif') + `?${new Date().getTime()}`
      loadingTrans.style = 'width: 50vw;'
      bgdiv.innerHTML = ''
      bgdiv.appendChild(loadingTrans)
      clearInterval(this.#shake)
      this.#shake = setInterval(() => {
        loadingTrans.src = require('@/assets/img/0161305aa1ed29a80121246d14b083.gif') + `?${new Date().getTime()}`
      }, 8000)
    }
    this.close = () => {
      clearInterval(this.#shake)
      const bgdiv = document.getElementById('loading')
      bgdiv.innerHTML = ''
      bgdiv.style = 'opacity: 0;z-index: -9999;'
    }
  }

  static init () {
    const body = document.querySelector('body')
    const bgdiv = document.createElement('div')
    bgdiv.id = 'loading'
    bgdiv.className = 'loadingwhite'
    body.appendChild(bgdiv)
  }
}
