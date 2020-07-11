<template>
  <div class="container-md box">
    <div class="row" v-if="appNum">
      <v-app  id="inspire">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <h2>Application ID:</h2><h2 class="app-info" >{{ appNum }}</h2>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-account</v-icon>
            Personal Information
          </v-tab>
          <v-tab>
            <v-icon left>mdi-lock</v-icon>
            Contact, Address
          </v-tab>
          <v-tab>
            <v-icon left>mdi-access-point</v-icon>
             Passport Information
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <h3>Personal Information</h3>
                 <v-divider></v-divider>
                 <v-form v-model="valid" class="v-application">
                   <v-container>
                     <v-row>
                       <v-col cols="12" md="4">
                         <v-text-field
                           v-model="model.firstname"
                           :rules="nameRules"
                           :counter="10"
                           label="First name"
                           required
                         ></v-text-field>
                       </v-col>

                       <v-col cols="12"  md="4">
                         <v-text-field
                           v-model="model.middlename"
                           :rules="nameRules"
                           :counter="10"
                           label="Middle name"
                           required
                         ></v-text-field>
                       </v-col>

                       <v-col cols="12" md="4">
                         <v-text-field
                           v-model="model.lastname"
                           :rules="nameRules"
                           label="Last Name"
                           required
                         ></v-text-field>
                       </v-col>
                     </v-row>

                      <v-row>
                        <v-col cols="12" md="4">
                          <v-radio-group v-model="model.gender" row>
                            <v-radio label="Female" value="1"></v-radio>
                            <v-radio label="Male" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>

                        <v-col cols="12"  md="4">
                          <v-autocomplete
                            v-model="model.martialstatus"
                            :items="martialstatuses"
                            :filter="customFilter"
                            item-text="name"
                            item-value="id"
                            required
                            label="Martial Status"
                          ></v-autocomplete>
                        </v-col>

                      </v-row>
                   </v-container>
                 </v-form>

              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                </p>

                <p>
                  Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                </p>

                <p>
                  Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                </p>

                <p>
                  Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                </p>

                <p class="mb-0">
                  Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-app>
    </div>
    <div class="row alert alert-danger" role="alert" v-else>
      <div >
          No application number
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PersonalInfo',

  computed: {
   appNum: function() {
     return this.$store.state.appNum;
   }
 },

 data: () => ({
      valid: false,
      model:{
        firstname:"",
        middlename:"",
        lastname:"",
        gender:null,
        martialstatus:""
      },
      martialstatuses: [],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),

    mounted() {
       this.getMartialStatuses()
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
