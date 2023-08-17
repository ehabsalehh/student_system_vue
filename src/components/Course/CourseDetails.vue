<template>
  <div>
    <div class="card-body course-details">
      <h3 class="card-title">{{ course.name }}</h3>
      <p class="card-text">Code: {{ course.code }}</p>
      <p class="card-text">Description: {{ course.description }}</p>
      <router-link :to="{ name: 'student-enrollments', params: { courseId: course.id } }">
        <button class="btn btn-primary">enroll & unroll students</button>
      </router-link>
    </div>
    <hr>
    <table class="table">
      <thead>
      <tr>
        <th>Students Full Name</th>
        <th>Student Code</th>
        <th v-for="gradeItem in course.grade_items" :key="gradeItem.id">
          {{ gradeItem.name }}
          (Max: {{ gradeItem.max_degree }})
        </th>
        <th>Total (Max: {{ getTotalMaxDegree() }})</th> <!-- Display total of max degrees -->
      </tr>

      </thead>
      <tbody>
      <tr v-for="student in course.students" :key="student.id">
        <td>{{ student.full_name }}</td>
        <td>{{ student.code }}</td>
        <td v-for="gradeItem in course.grade_items" :key="gradeItem.id">
          <!-- Display the student's score for the corresponding grade item -->
          {{ getStudentGrade(student, gradeItem) }}
        </td>
        <td>{{ getTotalScore(student) }}</td> <!-- Display Total score -->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {API_BASE_URL} from '../../config.js'; // Update the path as needed

export default {
  props: ['courseId'],
  data() {
    return {
      allStudents: [],
      course: {
        students: [],
        grade_items: [],
      },
    };
  },
  methods: {
    async fetchCourseDetails() {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/${this.courseId}`);
        const data = await response.json();
        this.course = data.data;
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    },
    getTotalMaxDegree() {
      let totalMaxDegree = 0;
      for (const gradeItem of this.course.grade_items) {
        totalMaxDegree += gradeItem.max_degree;
      }
      return totalMaxDegree;
    },
    getStudentGrade(student, gradeItem) {
      if (gradeItem.student_grades) {
        const studentGrade = gradeItem.student_grades.find(
            (grade) => grade.course_student.id === student.id
        );
        return studentGrade ? studentGrade.score : '---';
      }
      return '--';
    },
    getTotalScore(student) {
      let totalScore = 0;
      for (const gradeItem of this.course.grade_items) {
        if (gradeItem) {
          const studentGrade = gradeItem.student_grades.find(
              (grade) => grade.course_student.id === student.id
          );
          if (studentGrade) {
            totalScore += studentGrade.score;
          }
        }
      }
      return totalScore;

    },
  },
  created() {
    this.fetchCourseDetails();
  },
};
</script>

<style scoped>
.course-details {
  background-color: #f8f9fa; /* Light gray background */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Your styles here */
</style>
