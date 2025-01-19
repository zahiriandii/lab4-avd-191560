<script setup>
 import { ref,watch,defineProps,defineEmits } from 'vue';
 import { useSearch} from  '../composables/useSearch';

   const props = defineProps({
        blogs: 
        {
            type: Array,
            required: true
        },
        isLoading: 
        {
            type: Boolean,
            required: true
        },
        error: 
        {
            type: String,
            required: true
        }

   });

   const emits = defineEmits(['deleteBlog']);
   const blogs = ref(props.blogs);

   

   watch (
      () => props.blogs,
      (newBlog) => {
        blogs.value = newBlog;
      }
   );

   const {
    searchTerm,
    filters,
    filteredItems: filteredBlogs,
    } = useSearch(blogs);



</script>

<template>
 <div>
    <h1>Blogs</h1>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <section v-else>
      <div class="search">
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="searchTerm" />
      </div>
      <fieldset>
        <div>Filter by: </div>
        <input type="checkbox" id="title" value="title" v-model="filters" />
        <label for="title">By Title</label>
        <input
          type="checkbox"
          id="content"
          value="description"
          v-model="filters"
        />
        <label for="content">By Content</label>
      </fieldset>
      <ul class="articles-list">
        <li>
          <article v-for="(blog, i) in filteredBlogs" :key="i">
            <div class="article-item-info">
                <img
                v-if="blog.heroImage"
                class="thumbnail"
                :src="`${blog.heroImage.fields.file.url}?fit=scale&w=350&h=196`"
                />
                <div class="article-text">
                <div class="date">
                    {{ new Date(blog.publishDate).toDateString() }}
                </div>
                <h4>{{ blog.title }}</h4>
                <p>{{ blog.description }}</p>
                </div>
            </div>            
            <button @click="emits('deleteBlog', blog.id)">Delete</button>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>