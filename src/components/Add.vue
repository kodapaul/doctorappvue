<template>
  <div>
    <p v-if="form.errors.length">
      <b>Please correct the following error(s):</b>
      <ul><li v-for="error in form.errors" v-bind:key="error">{{ error }}</li></ul>
    </p>

    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group label="Patient Name" label-for="name">
        <b-form-input
          id="name"
          name="name"
          v-model="$v.form.name.$model"
          :state="validateName('name')"
          aria-describedby="name-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="name-feedback"
        >This field must not be empty and atleast have 2 characters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Comments" label-for="comment">
        <b-form-input
          id="comment"
          name="comment"
          v-model="$v.form.comment.$model"
          :state="validateComment('comment')"
          aria-describedby="comment-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="comment-feedback"
        >This field must not be empty and atleast have 3 characters</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="date" label-for="date">
        <b-form-datepicker
          id="example-datepicker"
          v-model="$v.form.date.$model"
          :date-disabled-fn="dateDisabled"
          :state="validatedate('date')"
          aria-describedby="date-feedback"
        ></b-form-datepicker>

        <b-form-invalid-feedback
          id="date-feedback"
        >This field must not be empty and date must not be before today.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="time in" label-for="timein">
        <b-form-timepicker
          v-model="$v.form.timein.$model"
          :state="validatetimein('timein')"
          locale="en"
          aria-describedby="timein-feedback"
        ></b-form-timepicker>
        <b-form-invalid-feedback id="timein-feedback">Time in must greater than time out.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="time out" label-for="timeout">
        <b-form-timepicker
          v-model="$v.form.timeout.$model"
          :state="validatetimeout('timeout')"
          locale="en"
          aria-describedby="timeout-feedback"
        ></b-form-timepicker>

        <b-form-invalid-feedback id="timeout-feedback">Time out must not be less than time in</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button class="ml-2" @click="resetForm()">Reset</b-button>
    </b-form>
  </div>
</template>

<style>
body {
  padding: 1rem;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import axios from 'axios';

export default {
  mixins: [validationMixin],
  name: "Add",
  data() {
    return {
      form: {
        errors: [],
        name: null,
        comment: null,
        date: null,
        timein: null,
        timeout: null,
        root: 'http://127.0.0.1:5000/'
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2),
      },
      comment: {
        required,
        minLength: minLength(2),
      },
      date: {
        required,
        minValue: (value) => value > new Date().toISOString(),
      },
      timein: {
        required,
      },
      timeout: {
        required,
      },
    },
  },
  methods: {
    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      const day = date.getDate()
      return weekday === 0 || weekday === 6 || day === 13
    },
    validateName(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    validateComment(comment) {
      const { $dirty, $error } = this.$v.form[comment];
      return $dirty ? !$error : null;
    },
    validatedate(date) {
      const { $dirty, $error } = this.$v.form[date];
      return $dirty ? !$error : null;
    },
    validatetimein(timein) {
      const { $dirty, $error } = this.$v.form[timein];
      return $dirty ? !$error : null;
    },
    validatetimeout(timeout) {
      const { $dirty, $error } = this.$v.form[timeout];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        name: null,
        comment: null,
        date: null,
        timein: null,
        timeout: null,
        errors: []
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
        this.form.errors = [];
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      var startTime = this.form.timein;
      var endTime = this.form.timeout;
      console.log(startTime)
      if (startTime > endTime) {
        this.form.errors.push("time in should not be greated than time out");
        return;
      }

    if (startTime > "17:00:00" || endTime > "17:00:00" || startTime < "08:00:00" || endTime < "08:00:00" ) {
        this.form.errors.push("Time should be between 8:00am to 5:00pm");
        return;
      }

        const data = {
            name:this.form.name,
            comment:this.form.comment,
            date:this.form.date,
            time_in:this.form.timein,
            time_out:this.form.timeout
        }
        
        axios.post('http://127.0.0.1:5000/add',{
                data
            }).then(response => {
                console.log(response)
                    this.form = {
        name: null,
        comment: null,
        date: null,
        timein: null,
        timeout: null,
        errors: []
        
      };
      this.$nextTick(() => {
        this.$v.$reset();
      }); 
      alert('Success');
            }).catch(error => {
                console.log(error)
                this.form.errors.push("Time slot is already taken");
                return;
            });

    },
  },
};
</script>