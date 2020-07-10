import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseUrl = 'http://localhost:3000'

function EmailException() {
  this.message = "Нет аккаунта с таким email!"
}

function PasswordException() {
  this.message = "Неверный пароль!"
}

export default new Vuex.Store({
  state: {
    user: null,
    posts: null,
    totalCount: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setTotalCount(state, totalCount) {
      state.totalCount = totalCount
    },
    addClap(state, id) {
      state.posts.find((post) => {
        if (post.id == id) {
          post.claps += 1
          return true
        }
        return false
      })
    },
    deletePost(state, id) {
      const index = state.posts.findIndex((post) => post.id == id)
      state.posts.splice(index, 1)
    }
  },
  actions: {
    async loginUser({commit}, user) {
      const response = await fetch(baseUrl + '/users?login=' + user.email)
      const data = await response.json()

      if (data.length) {
        if (data[0].password == user.password) {
          commit('setUser', data[0])
          return data[0]
        } else {
          throw new PasswordException()
        }
      } else {
        throw new EmailException()
      }
    },
    async logoutUser({commit}) {
      commit('clearUser')
    },
    async getPosts({state, commit}, page) {
      const response = await fetch(baseUrl + '/posts?_page=' + page)
      const totalCount = response.headers.get('X-Total-Count')

      const data = await response.json()

      commit('setPosts', data)
      commit('setPagination', pagination)
      commit('setTotalCount', totalCount)
    },
    async clapPost({commit}, {id, claps}) {
      const sendBody = { claps: claps }

      const response = await fetch(baseUrl + '/posts/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sendBody)
      })
      const data = await response.json()

      commit('addClap', id)
    },
    async deletePost({commit}, id) {
      const response = await fetch(baseUrl + '/posts/' + id, {
        method: 'DELETE'
      })
      const data = await response.json()

      commit('deletePost', id)
    },
    async newPost({state}, post) {
      const sendBody = {
        ...post,
        claps: 0,
        userId: state.user.id,
        createdAt: new Date(Date.now()).toISOString()
      }
      const response = await fetch(baseUrl + '/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sendBody)
      })
    },
    async editPost({state, commit}, post) {
      const sendBody = {
        ...post,
        updateAt: new Date(Date.now()).toISOString()
      }
      const response = await fetch(baseUrl + '/posts/' + post.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sendBody)
      })
    }
  }
})
