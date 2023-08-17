<template>
  <div id="course-managment">
    <h2 class="mt-4">Courses Management</h2>
    <div class="d-flex justify-content-end">
      <div class="custom-input">
        <input v-model="searchQuery" class="form-control" placeholder="Search by name or code"/>
        <button @click="searchCourses" class="btn btn-primary">Search</button>
      </div>
    </div>
    <div v-for="course in filteredCourses" :key="course.id" class="card mb-3">
      <div class="card-body">
        <h3 class="card-title">{{ course.name }}</h3>
        <p class="card-text">Code: {{ course.code }}</p>
        <p class="card-text">Description: {{ course.description }}</p>
        <router-link :to="{ name: 'course-details', params: { courseId: course.id } }">
          <button class="btn btn-primary">course details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import {API_BASE_URL} from '../../config.js'; // Update the path as needed
export default {
  data() {
    return {
      courses: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredCourses() {
      if (!this.searchQuery) {
        return this.courses;
      }
      const query = this.searchQuery.toLowerCase();
      return this.courses.filter(
          (course) =>
              course.name.toLowerCase().includes(query) ||
              course.code.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        const data = await response.json();
        this.courses = data.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    searchCourses() {
      this.fetchCourses();
    },
  },
  mounted() {
    this.fetchCourses();
  },
};
</script>

<style scoped>
#course-managment {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.custom-input {
  display: flex;
  align-items: center;
}
</style>