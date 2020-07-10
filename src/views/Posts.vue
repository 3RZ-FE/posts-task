<template>
  <div class="container">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :text="post.description"
      :date="post.createdAt"
      :claps="post.claps"
      :userId="post.userId"
    />
    <b-pagination
      @change="getPosts"
      class="pagination"
      :total="totalCount"
      :per-page="10"
      :current.sync="currentPage"
      :size="'is-medium'"
      :order="'is-centered'"
    >
    </b-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostCard from '@/components/PostCard.vue'

export default {
  name: 'Posts',
  data: function () {
    return {
      currentPage: 1
    }
  },
  components: {
    PostCard
  },
  computed: {
    ...mapState([
      'posts',
      'pagination',
      'totalCount'
    ])
  },
  methods: {
    ...mapActions([
      'getPosts'
    ])
  },
  created: function() {
    this.getPosts(1)
  }
}
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
.pagination {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
