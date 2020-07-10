<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ title }}
      </p>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p>{{ text }}</p>
        </div>
      </div>

      <div class="level">
        <div class="level-left">
          {{ parsedDate }}
        </div>      
        <div class="level-right">
          <b-button
            v-if="showWriterButtons"
            @click="clickDelete"
            icon-left="trash-alt"
          >
          </b-button>
          <b-button
            v-if="showWriterButtons"
            @click="clickEdit"
            icon-left="edit"
          >
            Изменить
          </b-button>
          <b-button
            @click="clickClap"
            icon-left="thumbs-up"
            :disabled="likeDisabled"
          >
            {{ claps }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostCard',
  props: {
    id: Number,
    title: String,
    text: String,
    date: String,
    claps: Number,
    userId: Number
  },
  computed: {
    ...mapState([
      'user'
    ]),
    parsedDate() {
      const date = new Date(this.date)
      return date.toUTCString()
    },
    likeDisabled() {
      if (this.user)
        if (this.user.role == 'reader')
          return false
      return true
    },
    showWriterButtons() {
      if (this.user)
        if (this.user.role == 'writer' && this.user.id == this.userId)
          return true
      return false
    }
  },
  methods: {
    ...mapActions([
      'clapPost',
      'deletePost'
    ]),
    clickClap() {
      const claps = this.claps + 1
      this.clapPost({ id: this.id, claps: claps })
        .then()
    },
    clickEdit() {
      this.$router.push({ path: '/post?mode=edit&id=' + this.id })
    },
    clickDelete() {
      this.$buefy.dialog.confirm({
        title: 'Удаление поста',
        message: 'Вы уверены что хотите удалить пост?',
        confirmText: 'Удалить',
        cancelText: 'Отмена',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deletePost(this.id)
            .then(() => {
              this.$buefy.toast.open('Пост удалён!')
            })            
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  margin-left: auto;
  margin-right: auto;
  width: 550px;
}
</style>
