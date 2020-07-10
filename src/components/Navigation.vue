<template>
  <b-navbar :shadow="true" :type="'is-light'">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Medium_logo_Wordmark_Black.svg/1200px-Medium_logo_Wordmark_Black.svg.png"
          alt="Medium"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Посты
      </b-navbar-item>
      <b-navbar-item v-if="showAddPost" tag="router-link" :to="{ path: '/post?mode=create' }">
        Новый пост
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item
        v-if="!user"
        tag="div"
      >
        <b-button
          tag="router-link"
          to="/login"
          type="is-dark"
        >
          Войти
        </b-button>
      </b-navbar-item>
      <b-navbar-item
        v-if="user"
        tag="div"
      >
        <span class="email">{{ user.login }}</span>
        <b-button
          @click="logoutClick"
          type="is-dark"
        >
          Выйти
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapState([
      'user'
    ]),
    showAddPost() {
      if (this.user)
        if (this.user.role == 'writer')
         return true
      
      return false
    }
  },
  methods: {
    ...mapActions([
      'logoutUser'
    ]),
    logoutClick() {
      this.logoutUser()
        .then(() => {
          this.$buefy.toast.open('Вы вышли из аккаунта!')
          if (this.$route.path != '/')
            this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>
.email {
  margin-right: 20px;
}
</style>
