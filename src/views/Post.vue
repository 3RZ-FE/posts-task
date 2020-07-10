<template>
  <div class="container">
    <div ref="card" class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ currentAction }}
        </p>
      </header>
      <div class="card-content">
        <b-field
          label="Название поста"
          label-position="on-border"
          :type="titleType"
          :message="titleMessage"
        >
          <b-input v-model="post.title"></b-input>
        </b-field>
        <b-field
          label="Содержимое поста"
          label-position="on-border"
          :type="descriptionType"
          :message="descriptionMessage"
        >
          <b-input
            v-model="post.description"
            type="textarea"
          >
          </b-input>
        </b-field>        
        <div class="columns">
          <div class="column">
            <b-button
              @click="clickSave"
              type="is-dark"
            >
              {{ mode == 'create' ? 'Опубликовать' : 'Сохранить' }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Post',
  props: {
    mode: {
      type: String,
      required: true
    },
    id: String
  },
  data: function() {
    return {
      post: {
        title: null,
        description: null
      },
      titleType: null,
      titleMessage: null,
      descriptionType: null,
      descriptionMessage: null
    }
  },
  computed: {
    ...mapState([
      'posts'
    ]),
    currentAction() {
      if (this.mode == 'create')
        return 'Новый пост'
      return 'Редактировать пост'
    }
  },
  methods: {
    ...mapActions([
      'newPost',
      'editPost'
    ]),
    clickSave() {
      if (!this.validateText(this.post.title)) {
        this.titleType = 'is-danger'
        this.titleMessage = 'Введите название поста!'
      } else {
        this.titleType =  null
        this.titleMessage = null
      }

      if (!this.validateText(this.post.description)) {
        this.descriptionType = 'is-danger'
        this.descriptionMessage = 'Введите содержимое поста!'
      } else {
        this.descriptionType = null
        this.descriptionMessage = null
      }

      if (this.validateText(this.post.title) && this.validateText(this.post.description)) {
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.card
        })

        if (this.mode == 'create') {
          this.newPost(this.post)
            .then(() => {
              this.$buefy.toast.open('Пост опубликован!')
              this.$router.push('/')
            })
            .catch()
            .finally(() => {
              loadingComponent.close()
          })
        } else {
          const post = {
            ...this.post,
            id: this.id
          }
          this.editPost(post)
            .then(() => {
              this.$buefy.toast.open('Пост отредактирован!')
              this.$router.push('/')
            })
            .catch()
            .finally(() => {
              loadingComponent.close()
            })
        }        
      }      
    },
    validateText(text) {
      return Boolean(text)
    }
  },
  created: function() {
    if (this.mode == 'edit') {
      const post = this.posts.find((post) => post.id == this.id)

      this.post.title = post.title
      this.post.description = post.description
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
.card {
  margin-left: auto;
  margin-right: auto;
  width: 550px;
}
</style>
