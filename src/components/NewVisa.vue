<template>
  <div class="container-md box">
    <div class="row">
      <div class="half">
        <div class="wrapper">
          <h2>Apply for a new Visa</h2>
          <v-divider></v-divider>
          <h5>You are about to apply for a new Visa. Please fill the required information to generate an application ID which you can use for future references.</h5>
        </div>

      </div>
        <div class="half">
          <div class="wrapper">
            <h2 v-if="!formSaved">Basic Information</h2>
            <h2 v-else>Application ID</h2>
            <v-divider></v-divider>
             <v-app v-if="!formSaved" id="inspire">
               <ValidationObserver ref="observer"  v-slot="{ invalid }">
                <form>
                  <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field
                      v-model="model.email"
                      :error-messages="errors"
                      label="E-mail"
                      required
                    ></v-text-field>
                   </ValidationProvider>

                   <ValidationProvider v-slot="{ errors }" name="passportNumber" rules="required|max:10">
                      <v-text-field
                        v-model="model.passportNumber"
                        :counter="10"
                        :error-messages="errors"
                        label="Passport Number"
                        required
                      ></v-text-field>
                   </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" name="country" rules="required">
                    <v-autocomplete
                      v-model="model.country"
                      :items="countries"
                      :filter="customFilter"
                      item-text="name"
                      item-value="id"
                      :error-messages="errors"
                      required
                      label="Passport Issue Country"
                    ></v-autocomplete>
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" name="question" rules="required">
                    <v-autocomplete
                      v-model="model.question"
                      :items="questions"
                      :filter="customFilter"
                      item-text="name"
                      item-value="id"
                      :error-messages="errors"
                      label="Security Question"
                      required
                    ></v-autocomplete>
                </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" name="securityAnswer" rules="required">
                    <v-text-field
                      v-model="model.securityAnswer "
                      :counter="10"
                      label="Security Answer "
                      :error-messages="errors"
                      required
                    ></v-text-field>
                </ValidationProvider>

                  <div class="top-small right">
                   <v-btn small  color="botswana" :disabled="invalid" @click="save">Start New Application</v-btn>
               </div>

              </form>
              </ValidationObserver>
              </v-app>
              <div v-else>
                 <div class="form-row">
                   <div class="form-group col-md-12">
                     <label for="inputEmail4">Your Application ID is</label>
                     <input type="text" class="form-control" disabled  v-model="result.appNum">
                   </div>
                   <div class="form-group col-md-12">
                     <label for="inputEmail4">Date</label>
                     <input type="text" class="form-control" disabled   v-model="result.date">
                   </div>
                 </div>

                  <div class="bottom bottom-large">
                    <div class="container-md">
                      <v-btn to="/personalinfo"  x-middle class="right" color="botswana" dark>Proceed to next step</v-btn>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider,setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
  name: 'NewVisa',

  components: {
       ValidationProvider,
       ValidationObserver,
     },

  data: () => ({
     formSaved: false,
     model:{},
     result:{},
     questions: [],
     countries: [],
   }),

   mounted() {
      this.getCountries()
      this.getQuestions()
  },


   methods: {
     async getCountries() {
        try {
          const response = await fetch('https://localhost:44372/api/dictionary/countries')
          const data = await response.json()
          this.countries = data
        } catch (error) {
          console.error(error)
        }
      },
      async getQuestions() {
         try {
           const response = await fetch('https://localhost:44372/api/dictionary/questions')
           const data = await response.json()
           this.questions = data
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
