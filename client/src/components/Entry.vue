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
        
        <div class="col-md-6">
          <form method="post" action="#" id="#">
            <div class="form-group files">
              <label>Upload Your File </label>
              <!-- <input type="file" id="file" ref="myFiles" class="form-control" 
                      @change="previewFiles" multiple> -->

              <input  class = "form-control"
                      type="file" 
                      @change="filesChange" multiple>
              <!-- <input  type="file" 
                      class="form-control"
                      :name="uploadFieldName" 
                      :disabled="isSaving" 
                      @change="filesChange($event)" 
                       > -->
            </div>
          </form>   
        </div>

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


  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: "Entry",
    data: function () {
      return {
        store,
        fileinput : '',
        isProcessed : false,
        text: null,
        skills: ["a", "b", "c"],
        uploadedFile: null,
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'dataset'
      }
    },

    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },

    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFile = null;
        this.uploadError = null;
      },

      filesChange(event) {
        console.log("Hello world!");
        console.log(event.target.files[0]);
        // this.createInput(event.target.files[0]);
        var file = event.target.files[0];
        var reader = new FileReader();
        
        var data = '';

        reader.onload = function(event) {
          data = event.target.result
          printF(data);
          console.log("LIFE SUCKS --> " + data);
        }

        console.log("WHAT THE HELL MAN! --> " + data);
        reader.readAsText(file);

        var dataset = event.target.result

        // this.store.setText(dataset);
      },

      printF(f) {
        console.log(f);
      },

      setProcessedData(val) {
        this.isProcessed = val;
        store.setProcessedData(val);
      }
    },
    mounted() {
      this.reset();
    }
  }
</script>

<style scoped>
  
  /* input file design */

  .files input {
    outline: 2px dashed #92b0b3;
    outline-offset: -10px;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    padding: 120px 0px 85px 35%;
    text-align: center !important;
    margin: 0;
    width: 100% !important;
}
.files input:focus{     outline: 2px dashed #92b0b3;  outline-offset: -10px;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear; border:1px solid #92b0b3;
 }
.files{ position:relative}
.files:after {  pointer-events: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 50px;
    right: 0;
    height: 56px;
    content: "";
    background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
    display: block;
    margin: 0 auto;
    background-size: 100%;
    background-repeat: no-repeat;
}
.color input{ background-color:#f1f1f1;}
.files:before {
    position: absolute;
    bottom: 10px;
    left: 0;  pointer-events: none;
    width: 100%;
    right: 0;
    height: 57px;
    content: " or drag it here. ";
    display: block;
    margin: 0 auto;
    color: #2ea591;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
}


/* ------------------ */

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
