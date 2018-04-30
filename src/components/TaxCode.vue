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
            <input v-model="birthPlace" v-bind:class="{error: isBirthPlaceError}" type="text" class="form-control" id="birthPlace" placeholder="Luogo di Nascita">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="district">PROVINCIA</label>
          <div class="col-md-3">
            <input v-model="district" type="text" class="form-control" id="district" placeholder="Provincia" disabled>
          </div>
          <label class="col-sm-2 col-form-label" for="BirthData">DATA DI NASCITA</label>
          <div class="col-md-5">
            <datepicker v-model="birthDate" v-bind:class="{error: isBirthDateError}" id="BirthDate"></datepicker>
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
      isBirthDateError: false,
      isBirthPlaceError: false,
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
        return this.isBirthDateError = true;
      }
      return this.isBirthDateError = false;
    },

    checkBirthPlace: function() {
      this.errors = [];
      if (!this.birthPlace) {
        return this.isBirthPlaceError = true;
      }
      return this.isBirthPlaceError = false;
    },

    checkForm: function() {
      var checkName = this.checkName();
      var checkSurname = this.checkSurname();
      var checkDate = this.checkDate();
      var checkBirthPlace = this.checkBirthPlace();
      this.checkDate();

      if(!checkName && !checkSurname && !checkDate){
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

    birthDateResult: function(){
      var result = '';
      const date = new Date(this.birthDate);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      //console.log(`Birthate: ${day}/${month}/${year}`);

      var y = year.toString().substr(2);
      result += y;

      var genericMonth = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
      result += genericMonth[month];

      var d = '';
      if(this.sex === 'M'){
        day < 10 ? d = ('0' + day.toString()) : d = day.toString();
      } else if (this.sex === 'F') {
        d = (day + 40).toString();
      }
      result += d;
      return result;
    },

    lastCharResult: function(){
      var evenValues = [];
      var oddValues = [];

      for(var i = 0; i < this.taxCodeOut.length; i+=2){
        oddValues[oddValues.length] = [this.taxCodeOut[i]];
      }
      for(var i = 1; i < this.taxCodeOut.length; i+=2){
        evenValues[evenValues.length] = [this.taxCodeOut[i]];
      }

      var evenValuesSchema = new Array();
      evenValuesSchema.push({char: 0, value: 0});
      evenValuesSchema.push({char: 1, value: 1});
      evenValuesSchema.push({char: 2, value: 2});
      evenValuesSchema.push({char: 3, value: 3});
      evenValuesSchema.push({char: 4, value: 4});
      evenValuesSchema.push({char: 5, value: 5});
      evenValuesSchema.push({char: 6, value: 6});
      evenValuesSchema.push({char: 7, value: 7});
      evenValuesSchema.push({char: 8, value: 8});
      evenValuesSchema.push({char: 9, value: 9});
      evenValuesSchema.push({char: 'A', value: 0});
      evenValuesSchema.push({char: 'B', value: 1});
      evenValuesSchema.push({char: 'C', value: 2});
      evenValuesSchema.push({char: 'D', value: 3});
      evenValuesSchema.push({char: 'E', value: 4});
      evenValuesSchema.push({char: 'F', value: 5});
      evenValuesSchema.push({char: 'G', value: 6});
      evenValuesSchema.push({char: 'H', value: 7});
      evenValuesSchema.push({char: 'I', value: 8});
      evenValuesSchema.push({char: 'J', value: 9});
      evenValuesSchema.push({char: 'K', value: 10});
      evenValuesSchema.push({char: 'L', value: 11});
      evenValuesSchema.push({char: 'M', value: 12});
      evenValuesSchema.push({char: 'N', value: 13});
      evenValuesSchema.push({char: 'O', value: 14});
      evenValuesSchema.push({char: 'P', value: 15});
      evenValuesSchema.push({char: 'Q', value: 16});
      evenValuesSchema.push({char: 'R', value: 17});
      evenValuesSchema.push({char: 'S', value: 18});
      evenValuesSchema.push({char: 'T', value: 19});
      evenValuesSchema.push({char: 'U', value: 20});
      evenValuesSchema.push({char: 'V', value: 21});
      evenValuesSchema.push({char: 'W', value: 22});
      evenValuesSchema.push({char: 'X', value: 23});
      evenValuesSchema.push({char: 'Y', value: 24});
      evenValuesSchema.push({char: 'Z', value: 25});

      var oddValuesSchema = new Array();
      oddValuesSchema.push({char: 0, value: 1});
      oddValuesSchema.push({char: 1, value: 0});
      oddValuesSchema.push({char: 2, value: 5});
      oddValuesSchema.push({char: 3, value: 7});
      oddValuesSchema.push({char: 4, value: 9});
      oddValuesSchema.push({char: 5, value: 13});
      oddValuesSchema.push({char: 6, value: 15});
      oddValuesSchema.push({char: 7, value: 17});
      oddValuesSchema.push({char: 8, value: 19});
      oddValuesSchema.push({char: 9, value: 21});
      oddValuesSchema.push({char: 'A', value: 1});
      oddValuesSchema.push({char: 'B', value: 0});
      oddValuesSchema.push({char: 'C', value: 5});
      oddValuesSchema.push({char: 'D', value: 7});
      oddValuesSchema.push({char: 'E', value: 9});
      oddValuesSchema.push({char: 'F', value: 13});
      oddValuesSchema.push({char: 'G', value: 15});
      oddValuesSchema.push({char: 'H', value: 17});
      oddValuesSchema.push({char: 'I', value: 19});
      oddValuesSchema.push({char: 'J', value: 21});
      oddValuesSchema.push({char: 'K', value: 2});
      oddValuesSchema.push({char: 'L', value: 4});
      oddValuesSchema.push({char: 'M', value: 18});
      oddValuesSchema.push({char: 'N', value: 20});
      oddValuesSchema.push({char: 'O', value: 11});
      oddValuesSchema.push({char: 'P', value: 3});
      oddValuesSchema.push({char: 'Q', value: 6});
      oddValuesSchema.push({char: 'R', value: 8});
      oddValuesSchema.push({char: 'S', value: 12});
      oddValuesSchema.push({char: 'T', value: 14});
      oddValuesSchema.push({char: 'U', value: 16});
      oddValuesSchema.push({char: 'V', value: 10});
      oddValuesSchema.push({char: 'W', value: 22});
      oddValuesSchema.push({char: 'X', value: 25});
      oddValuesSchema.push({char: 'Y', value: 24});
      oddValuesSchema.push({char: 'Z', value: 23});

      var totalResult = 0;
      var singleValue = 0;
      for(var i = 0; i < oddValues.length; i++){
        singleValue = oddValuesSchema.filter(function (el){
          var value = 0
          if(el.char == oddValues[i][0]){
            value = el.value;
            totalResult += value;
            return value;
          }
        });
      }
      for(var i = 0; i < evenValues.length; i++){
        singleValue = evenValuesSchema.filter(function (el){
          var value = 0
          if(el.char == evenValues[i][0]){
            value = el.value;
            totalResult += value;
            return value;
          }
        });
      }

      var lastChar = '';
      lastChar = String.fromCharCode((totalResult % 26) + 65);
      return lastChar;
    },

    createTaxCode: function() {
      var surnameResult = this.stringResult(this.surname);
      var nameResult = this.stringResult(this.name);
      var birthResult = this.birthDateResult(this.birthDate);
      this.taxCodeOut = surnameResult;
      this.taxCodeOut += nameResult;
      this.taxCodeOut += birthResult;
      var lastCharResult = this.lastCharResult();
      this.taxCodeOut +=lastCharResult;
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
