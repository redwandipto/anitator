<template>
  <div>
    <form>
      <div class="row">
        <textarea cols="30" rows="10" class="form-control code">{{store.getCode() }}</textarea>
      </div>
      <div class="spacer"></div>
      <div class="row text-center">
        <div class="col-12">
          <button class="btn btn-success" v-on:click="store.reset()">Write and Start Over</button>
          <button class="btn btn-success" type="button" v-on:click="saveFile()">Save Dataset</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {store} from "../store/basic";

  export default {
    name: "Result",
    data: function () {
      return {
        store
      }
    },
    methods: {
      saveFile: function() {
        const data = JSON.stringify(store.getCode());
        window.localStorage.setItem('arr', data);
        writeJsonFile('foo.json', {foo: true}).then(() => {
            console.log('done');
        });
        console.log(JSON.parse(window.localStorage.getItem('arr')))
      }
    }   
  }
</script>

<style scoped>
  textarea.code {
    font-family: monospace;
  }

  div.spacer {
    margin-top: 50px;
  }
</style>
