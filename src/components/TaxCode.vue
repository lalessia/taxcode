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
      <div class="header-card">
        HEADER VERDE
      </div>
      <div class="content-card">
        <form id="taxCodeForm" v-on:submit="createTaxCode">
          <div class="form-group row">
              <label class="col-sm-2 col-form-label" for="taxCode">CODICE FISCALE</label>
              <div class="col-sm-10">
                <input v-model="taxCodeOut" type="text" class="form-control" id="taxCode" placeholder="Codice Fiscale" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label" for="surname">COGNOME</label>
              <div class="col-sm-10">
                <input v-model="surname" type="text" class="form-control" id="surname" placeholder="Cognome">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label" for="name">NOME</label>
              <div class="col-sm-6">
                <input v-model="name" type="text" class="form-control" id="name" placeholder="Nome">
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
                <!-- <datepicker :value="state.date"></datepicker> -->
                <input v-model="birthDate" type="datepicker" class="form-control" id="BirthData" placeholder="Data di nascita">
              </div>
            </div>
          <button type="submit">Calcola</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'TaxCode',
  data () {
    return {
      taxCodeOut: '',
      surname: '',
      name: '',
      birthPlace: '',
      sex: 'M',
      district: '',
      birthDate: ''
    }
  },
  methods: {
    createTaxCode: function (event) {
      this.taxCodeOut = `tredas ${this.birthDate}`
    }
  }
}
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
.content-card > form > .form-group {
    margin-bottom: 0.3rem;
}
</style>
