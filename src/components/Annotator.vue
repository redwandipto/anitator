<template>
  <div>
    <p>
      <sentence-part
        v-for="(part, index) in store.state.currentSentence"
        :content="part.text" :index="index" :key="index">
      </sentence-part>
    </p>
    <div class="spacer"></div>
    <div class="buttons row">
      <button class="btn btn-danger"
              v-on:click="store.assignTag(tag)"
              v-for="tag of outSide">{{ tag.display }}
      </button>
      <button class="btn btn-primary"
              v-on:click="store.assignTag(tag)"
              v-for="tag of pertags">{{ tag.display }}
      </button>
      <button class="btn btn-success"
              v-on:click="store.assignTag(tag)"
              v-for="tag of loctags">{{ tag.display }}
      </button>
      <button class="btn btn-info"
              v-on:click="store.assignTag(tag)"
              v-for="tag of orgtags">{{ tag.display }}
      </button>
      <button class="btn btn-warning"
              v-on:click="store.assignTag(tag)"
              v-for="tag of objtags">{{ tag.display }}
      </button>
    </div>
    <div class="spacer"></div>
    <div class="buttons row">
      <button class="btn btn-warning"
              autofocus
              v-if="store.hasPreviousSentence()"
              v-on:click="store.previousSentence()">Previous
      </button>
      <button class="btn btn-info"
              autofocus
              v-if="store.hasNextSentence()"
              v-on:click="store.nextSentence()">Next
      </button>
      <button class="btn btn-success" v-on:click="store.state.finished = true">Finish</button>
    </div>


    <br><br>
    <div class = "row">

      <div class="col-md-6">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">TAG</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>PER</td>
                  <td>Person entity</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>LOC</td>
                  <td>Location Entity</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>ORG</td>
                  <td>Organization entity</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>ATTR</td>
                  <td>Attribute entity</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>OBJ</td>
                  <td>Object entity</td>
                </tr>
              </tbody>
            </table>

      </div>

      <div class="col-md-6">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">SUB-TAG</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">1</th>
                  <td>S-TAG</td>
                  <td>Single enitity</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>B-TAG</td>
                  <td>Beginning of a multivalued tag</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>I-TAG</td>
                  <td>Inside of a multivalued tag</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>E-TAG</td>
                  <td>End of a multivalued tag</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>O-TAG</td>
                  <td>Out of consideration</td>
                </tr>
              </tbody>
            </table>
      </div>
      
    </div>

    <br>
    <h4> BIOES - notation is used for this annotation task </h4>

  </div>

</template>

<script>
  import SentencePart from "./SentencePart";
  import {store} from "../store/basic";
  import {tagSet} from "../store/tags";
  // import {loctagSet} from "../store/loctagSet";
  // import {orgtagSet} from "../store/orgtagSet";
  // import {objtagSet} from "../store/objtagSet";

  export default {
    name: "Annotator",
    components: {SentencePart},
    data: function () {

      // console.log("-->" + store);
      // console.log("-->" + tagset);

      console.log([tagSet[13],tagSet[14],tagSet[15],tagSet[16]])

      return {
        store,
        outSide: [tagSet[0]] ,
        pertags: [tagSet[1],tagSet[2],tagSet[3],tagSet[4]],
        loctags: [tagSet[5],tagSet[6],tagSet[7],tagSet[8]],
        orgtags: [tagSet[9],tagSet[10],tagSet[11],tagSet[12]],
        objtags: [tagSet[13],tagSet[14],tagSet[15],tagSet[16]]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .spacer {
    margin-top: 50px;
  }

  .btn {
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 2px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  p {
    text-align: center;
  }
</style>
