<template>
  <div>
    <h2>Student Enrollments</h2>
    <table class="table">
      <thead>
      <tr>
        <th>Full Name</th>
        <th>Student Code</th>
        <th>Enrollment</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.full_name }}</td>
        <td>{{ student.code }}</td>
        <td>
          <button v-if="!isStudentEnrolled(student)" @click="enrollStudent(student)" class="btn btn-success">
            Enroll
          </button>
          <button v-else @click="unenrollStudent(student)" class="btn btn-danger">
            Unenroll
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {API_BASE_URL} from '../../config.js';

export default {
  props: ['courseId'],
  data() {
    return {
      students: [],
      enrolledStudentIds: [],

    };
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const data = await response.json();
        this.students = data.data;
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    async fetchEnrolledStudents() {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/${this.courseId}/students`);
        const data = await response.json();
        this.enrolledStudentIds = data.data.students.map(student => student.id);
      } catch (error) {
        console.error('Error fetching enrolled students:', error);
      }
    },
    async enrollStudent(student) {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/${this.courseId}/enroll/${student.id}`, {
          method: 'POST',
        });
        if (response.ok) {
          this.fetchStudents();
          this.fetchEnrolledStudents();

        }
      } catch (error) {
        console.error('Error enrolling student:', error);
      }
    },
    async unenrollStudent(student) {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/${this.courseId}/unroll/${student.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          this.fetchStudents();
          this.fetchEnrolledStudents();

        }
      } catch (error) {
        console.error('Error unenrolling student:', error);
      }
    },
    isStudentEnrolled(student) {
      return this.enrolledStudentIds.includes(student.id);
    },
  },
  created() {
    this.fetchStudents();
    this.fetchEnrolledStudents();

  },
};
</script>

<style scoped>
/* Your styles here */
</style>
