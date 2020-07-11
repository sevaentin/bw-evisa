<template>
  <v-app id="inspire">
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <v-autocomplete
        v-model="model.martialstatus"
        :items="martialstatuses"
        :filter="customFilter"
        item-text="name"
        item-value="id"
        required
        label="Martial Status"
      ></v-autocomplete>

      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
   mixins: [validationMixin],
  name: 'About',

  validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

  data: () => ({
    martialstatuses: [],
    model:{},
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    states: [
      { name: 'Florida', abbr: 'FL', id: 1 },
      { name: 'Georgia', abbr: 'GA', id: 2 },
      { name: 'Nebraska', abbr: 'NE', id: 3 },
      { name: 'California', abbr: 'CA', id: 4 },
      { name: 'New York', abbr: 'NY', id: 5 },
    ],
  }),

  mounted() {
     this.getMartialStatuses()
 },

  computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      async getMartialStatuses() {
         try {
           const response = await fetch('https://localhost:44372/api/dictionary/martialStatuses')
           const data = await response.json()
           this.martialstatuses = data
           console.log(this.martialstatuses);
         } catch (error) {
           console.error(error)
         }
       },
      customFilter (item, queryText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.code.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async save () {
        this.$refs.observer.validate()
        try {
             const response = await fetch('https://localhost:44372/api/application/start', {
               method: 'POST',
               body: JSON.stringify(this.model),
               headers: { 'Content-type': 'application/json; charset=UTF-8' },
             })
             const data = await response.json()
             this.result = data
             this.$store.dispatch('saveAppNum', this.result.appNum);
             console.log(this.result.appNum);
             this.formSaved = true
           } catch (error) {
             console.error(error)
           }
      },
    },
    
}
</script>
<style>
</style>
