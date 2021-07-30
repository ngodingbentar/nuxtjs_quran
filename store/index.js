export const state = () => ({
  audio: 'On',
  sub: '',
  theme: {
    darktheme: false,
    // background: '#f7f7f7',
    background: 'white',
    color: 'black',
    boxShadow: '5px 5px 12px #dedede,-5px -5px 12px #ffffff'
  },
  weather: [],
  initTheme: {
    darktheme: false,
    // background: '#f7f7f7',
    background: 'white',
    color: 'black',
    boxShadow: '5px 5px 12px #dedede,-5px -5px 12px #ffffff'
  },
  loadingTheme: true,
  loadingAudio: false,
  loadingweather: true,
  searchvalue: ''
})

export const actions = {
  setSub (data) {
    this.$cookies.set('sub', data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  },
  getSub ({ commit }) {
    const subCookie = this.$cookies.get('sub')
    commit('setState', { sub: subCookie })
  },
  changeSub ({ commit }) {
    const subCookie = this.$cookies.get('sub')
    if (subCookie === 'On') {
      this.dispatch('setSub', 'Off')
      commit('setState', { sub: 'Off' })
    } else {
      this.dispatch('setSub', 'On')
      commit('setState', { sub: 'On' })
    }
  },

  setAudio () {
    console.log('this.state.audio', this.state.audio)
    this.$cookies.set('audio', this.state.audio, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    setTimeout(() => {
      this.dispatch('getAudio')
    }, 100)
  },
  getAudio ({ commit }) {
    const audioCookie = this.$cookies.get('audio')
    commit('setState', { audio: audioCookie })
    console.log('audioCookie', audioCookie)
  },
  changeAudio ({ commit }) {
    const audioCookie = this.$cookies.get('audio')
    if (audioCookie === 'On') {
      commit('setState', { audio: 'Off' })
      setTimeout(() => {
        this.dispatch('setAudio')
      }, 100)
    } else {
      commit('setState', { audio: 'On' })
      setTimeout(() => {
        this.dispatch('setAudio')
      }, 100)
    }
  },

  setTheme () {
    this.$cookies.set('theme', this.state.theme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    this.dispatch('getTheme')
  },
  getTheme ({ commit }) {
    const themeCookie = this.$cookies.get('theme')
    commit('setState', { theme: themeCookie })
    setTimeout(function () {
      commit('setState', { loadingTheme: false })
    }, 200)
  },
  changeTheme ({ commit }) {
    const data = this.$cookies.get('theme')
    if (data.darktheme) {
      const classObject = {
        darktheme: false,
        // 'background': '#f7f7f7',
        background: 'white',
        icon: 'sun',
        color: 'black',
        boxShadow: '5px 5px 12px #dedede,-5px -5px 12px #ffffff'
      }
      commit('setState', { theme: classObject })
      this.$cookies.set('theme', this.state.theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      this.dispatch('getTheme')
      // setTimeout(() => {
      //   this.dispatch('setTheme', classObject)
      // }, 100)
    } else {
      const classObject = {
        darktheme: true,
        background: '#36454f',
        icon: 'moon',
        color: 'white',
        boxShadow: '5px 5px 10px #29343c,-5px -5px 10px #435662'
      }
      commit('setState', { theme: classObject })
      // this.dispatch('setTheme', classObject)
      this.$cookies.set('theme', this.state.theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      this.dispatch('getTheme')
    }
  },

  setLoadingAudio ({ commit }) {
    commit('setState', { loadingAudio: false })
  },

  setWeather (data) {
    this.$cookies.set('weather', data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    this.dispatch('getWeather')
  },
  getWeather ({ commit }) {
    const weatherCookie = this.$cookies.get('weather')
    commit('setState', { weather: weatherCookie })
    setTimeout(function () {
      commit('setState', { loadingweather: false })
    }, 200)
  }
}

export const mutations = {
  setState (state, params) {
    for (const [key, value] of Object.entries(params)) {
      state[key] = value
    }
  },
  setSearchValue (state, params) {
    state.searchvalue = params
  }
}
