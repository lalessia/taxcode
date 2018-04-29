<template>
<!--div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    < <header class="masthead mb-auto">
      <div class="inner">
        <h3 class="masthead-brand">Codice Fiscale</h3>
        <nav class="nav nav-masthead justify-content-center">
          <a class="nav-link active" href="#">Home</a>
          <a class="nav-link" href="#">Features</a>
          <a class="nav-link" href="#">Contact</a>
        </nav>
      </div>
    </header> -->
<main role="main" class="inner cover">
  <div class="tax-code-card">
    <div class="header-card"></div>
    <div class="content-card">
      <form id="taxCodeForm" v-on:submit="checkForm">

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-bind:for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="taxCode">CODICE FISCALE</label>
          <div class="col-sm-10">
            <input v-model="taxCodeOut" type="text" class="form-control" id="taxCode" placeholder="Codice Fiscale" disabled>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="surname">COGNOME</label>
          <div class="col-sm-10">
            <input v-model="surname" v-bind:class="{error: isSurError}" type="text"
              class="form-control" id="surname" placeholder="Cognome"
              @input="forceUpperCase('surname')"
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="name">NOME</label>
          <div class="col-sm-6">
            <input v-model="name" v-bind:class="{error: isNameError}" type="text"
              class="form-control" id="name" placeholder="Nome"
              @input="forceUpperCase('name')"
            >
          </div>
          <label class="col-sm-2 col-form-label" for="sex">SESSO</label>
          <div class="col-sm-2">
            <select v-model="sex" id="sex" class="form-control">
                  <option selected>M</option>
                  <option>F</option>
                </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="birthPlace">LUOGO DI NASCITA</label>
          <div class="col-sm-10">
            <input v-model="birthPlace" type="text" class="form-control" id="birthPlace" placeholder="Luogo di Nascita">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="district">PROVINCIA</label>
          <div class="col-md-3">
            <input v-model="district" type="text" class="form-control" id="district" placeholder="Provincia">
          </div>
          <label class="col-sm-2 col-form-label" for="BirthData">DATA DI NASCITA</label>
          <div class="col-md-5">
            <datepicker v-model="birthDate" id="BirthDate"></datepicker>
          </div>
        </div>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</main>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'TaxCode',
  data() {
    return {
      isSurError: false,
      isNameError: false,
      errors: [],
      taxCodeOut: '',
      surname: '',
      name: '',
      birthPlace: '',
      sex: 'M',
      district: '',
      birthDate: '',
      districts: {}
    };
  },

  methods: {
    checkName: function() {
      const re = /[0-9[.,\\/#!$%^&*;:{}=\-_`~()\]\s]/g;
      const foundErr = this.name.match(re);
      this.errors = [];
      if (!this.name) {
        return this.isNameError = true;
      }
      if (foundErr) {
        this.errors.push('Not a valid name!');
        return this.isNameError = true;
      }
      return this.isNameError = false;
    },

    checkSurname: function() {
      const re = /[0-9[.,\\/#!$%^&*;:{}=\-_`~()\]\s]/g;
      const foundErr = this.surname.match(re);
      this.errors = [];
      if (!this.surname) {
        //this.isSurError = true;
        return this.isSurError = true;
      }
      if (foundErr) {
        this.errors.push('Not a valid surname!');
        return this.isSurError = true;
      }
      return this.isSurError = false;
    },

    checkDate: function() {
      this.errors = [];
      if (!this.birthDate) {
        this.errors.push('Please select your date of birth!');
      }
      const date = new Date(this.birthDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      console.log(`Birthate: ${day}/${month}/${year}`);
    },

    checkForm: function() {

      var checkName = this.checkName();
      var checkSurname = this.checkSurname();
      this.checkDate();

      if(!checkName && !checkSurname){
        this.createTaxCode();
      }
    },

    stringResult: function(stringCheck) {
      var result;
      var vocals = ['A', 'E', 'I', 'O', 'U'];
      for (var i = 0; i < stringCheck.length; i++) {
        var isVocal = vocals.includes(stringCheck[i]);
        // alert(this.surname[i] + ' è una vocale: ' + isVocal);
        if (!isVocal) {
          if (result === undefined) {
            result = stringCheck[i];
          } else {
            result += stringCheck[i];
          }
        }
      }

      if (result.length < 3) {
        for (var i = 0; i < stringCheck.length; i++) {
          var isVocal = vocals.includes(stringCheck[i]);
          // alert(this.surname[i] + ' è una vocale: ' + isVocal);
          if (isVocal) {
            if (result === undefined) {
              result = stringCheck[i];
            } else {
              result += stringCheck[i];
            }
          }
        }
      }

      if (result.length < 3) {
        for (var i = result.length; i < 3; i++) {
          if (result === undefined) {
            result = 'X';
          } else {
            result += 'X';
          }
        }
      }
      return result;
    },

    LastCharResult: function(){
      console.log("sono pronto a calcolare l'ultima cifra a partire da: " + this.taxCodeOut);
      var evenValues = [];
      var oddValues = [];

      for(var i = 0; i < this.taxCodeOut.length; i+=2){
        oddValues[oddValues.length] = [this.taxCodeOut[i]];
      }
      for(var i = 1; i < this.taxCodeOut.length; i+=2){
        evenValues[evenValues.length] = [this.taxCodeOut[i]];
      }
    },

    createTaxCode: function() {
      console.log('La data di nascita: ' + this.birthDate);
      var surnameResult = this.stringResult(this.surname);
      var nameResult = this.stringResult(this.name);
      this.taxCodeOut = surnameResult;
      this.taxCodeOut += nameResult;
      var LastCharResult = this.LastCharResult();
    },

    loadDistrict: function(callback) {
      const endpointUrl = 'https://query.wikidata.org/sparql';
      const sparqlQuery =
        `SELECT DISTINCT ?comune_it ?label ?codcat ?codice_immatricolazione WHERE {
            ?comune_it wdt:P31 wd:Q747074.
            ?comune_it rdfs:label ?label.
            OPTIONAL { ?comune_it wdt:P806 ?codcat. }
            FILTER(LANGMATCHES(LANG(?label), "it"))
            OPTIONAL { ?comune_it wdt:P395 ?codice_immatricolazione. }
          }`;
      const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
      const headers = {
        'Accept': 'application/sparql-results+json'
      };

      fetch(fullUrl, {
        headers
      }).then(body => body.json()).then(json => {
        // console.log(json);
        if (json) callback(json);
      });
    },
    forceUpperCase(prop) {
      this[prop] = this[prop].toUpperCase();
    }
  },
  beforeMount() {
    this.loadDistrict(output => {
      let test = output.results.bindings.filter(function(dist) {
        return dist.label.value === 'Palermo';
      });
    });
  },
  components: {
    Datepicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.error {
  border: 1px solid red;
}

.cover {
  padding: 0 1.5rem;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

.tax-code-card {
  height: 400px;
  width: 628px;
  border-radius: 25px;
  padding: 10px 10px 10px 10px;
  background-color: #FFFFFF;
  color: #009247;
  text-shadow: none;
}

.header-card {
  height: 41.2%;
  background-color: #009247;
  border-radius: 25px 25px 0px 0px;
}

.content-card {
  height: 52.8%;
  font-size: 11px;
}

.content-card>form>.form-group {
  margin-bottom: 0.3rem;
}
</style>
