<template>
  <div>
    <div class="row header">
      <div class="col-12 text-center">
        <h2>Anitator</h2>
      </div>
    </div>

    <div class = "row buttons">
      <button class = "btn btn-success"
              v-on:click="setProcessedData(true)">
        Load Processed Data
      </button>
      <button class = "btn btn-success"
              v-on:click="setProcessedData(false)">
        Insert Raw Article
      </button>
    </div>

    <div :hidden= !isProcessed>
      <!-- <h1>List of the data set</h1> -->
      <div class="holder">
        <table>
            <tr v-for="(data, index) in skills" :key='index'>
              {{ data.skill }}

              <span class="dtitle"> dataset 1 </span> 
              
              <div class="pull-right  btn2data">
                <button class="btn btn-sm btn-success">Load</button>
                <button class="btn btn-sm btn-success ">Done</button>
              </div>
              
            </tr>
          
        </table>

        <p>These are the skills that you possess.</p>
      </div>
    </div>

    <div :hidden= isProcessed>
      <div class="row entry-area" >
      <textarea cols="30" rows="10" class="form-control"
                placeholder="Begin by pasting or typing in the box, and pressing Start...."
                v-model="text"></textarea>
      </div>
      <div class="row buttons">
        <button class="btn btn-success"
                :disabled="!text || !text.length"
                v-on:click="store.setText(text)">Start</button>
        <button class="btn btn-danger"
                :disabled="!text || !text.length">Reset</button>
      </div>
    </div>

  </div>
</template>

<script>
  import {store} from "../store/basic";

  export default {
    name: "Entry",
    data: function () {
      return {
        store,
        isProcessed : false,
        text: null,
        skills: ["bro", "valo", "achi"]
      }
    },
    methods: {
      setProcessedData: function(val) {
        this.isProcessed = val;
        store.setProcessedData(true);
      }
    }
  }
</script>

<style scoped>
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .buttons button {
    margin: 7px;
  }
  .dtitle {
    padding: 10px;
    font-weight: 700;
    font-family:'Courier New', Courier, monospace;    
  }
  .entry-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .entry-area textarea {
    max-width: 960px;
    font-size: 20px;
    color: black;
  }

  .btn2data {
    /* padding: 2px; */
  }
  
  @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 
  .holder {
    background: #fff;
    padding-left: 15%;
    padding-right: 15%;
  }
  table {
    margin: 0;
    padding: 0;
    width: 80%;
    list-style-type: none;
  }

  table tr {
    padding: 15px;
    height: 30px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 10px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }
  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }
  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

i {
  float:right;
  cursor:pointer;
}
</style>
