<template>
  <div class="container">
    <div ref="card" class="card">
      <header class="card-header">
        <p class="card-header-title">
          Войти в аккаунт
        </p>
      </header>
      <div class="card-content">
        <b-field 
          label="Email"
          label-position="on-border"
          :type="emailType"
          :message="emailMessage"
        >
          <b-input v-model="user.email"></b-input>
        </b-field>
        <b-field 
          label="Password"
          label-position="on-border"
          :type="passwordType"
          :message="passwordMessage"
        >
          <b-input
            v-model="user.password"
            type="password"
            maxlength="30"
          >
          </b-input>
        </b-field>
        <div class="columns">
          <div class="column is-one-third">
            <b-button            
              @click="loginClick"
              type="is-dark"
            >
              Войти
            </b-button>
          </div>
          <div class="column is-two-thirds">
            <span v-if="loginErrorMessage">
              {{ loginErrorMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: function() {
    return {
      user: {
        email: null,
        password: null
      },
      emailType: null,
      emailMessage: null,
      passwordType: null,
      passwordMessage: null,
      loginErrorMessage: null
    }
  },
  methods: {
    ...mapActions([
      'loginUser'
    ]),
    loginClick() {
      if (!this.validateEmail(this.user.email)) {
        this.emailType = 'is-danger'
        this.emailMessage = 'Некорректный e-mail!'
      } else {
        this.emailType = null
        this.emailMessage = null
      }

      if (!this.validatePassword(this.user.password)) {
        this.passwordType = 'is-danger'
        this.passwordMessage = 'Введите пароль!'
      } else {
        this.passwordType = null
        this.passwordMessage = null
      }

      if (this.validateEmail(this.user.email) && this.validatePassword(this.user.password)) {     
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.card
        })
        
        this.loginUser(this.user)
          .then((user) => {
            this.$buefy.toast.open('Вы вошли как ' + user.role + '!')
            this.$router.push('/')
          })
          .catch(error => {
            this.loginErrorMessage = error.message
          })
          .finally(() => {
            loadingComponent.close()
          })
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validatePassword(password) {
      return Boolean(password)
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
}
</style>