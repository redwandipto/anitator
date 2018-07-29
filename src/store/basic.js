import {tagSet} from "./tags";
import dataset  from "../dataset/sample1.json" 

function toObject(sentence) {
  const parts = sentence.replace(/[\.\,\?।\'\"\(\)\@\$৳\&\+]+/g, '').match(/\S+/g) || [];
  return parts.map(function (p) {
    return {
      text: p,
      tag: null
    }
  });
}

function makeTag(part) {
  if (part.tag !== null) {
    return part.tag.tag;
  } else {
    return '';
  }
}

export const store = {
  state: {
    selectedIndex: 0,
    currentSentence: [],
    sentences: [],
    sentenceIndex: 0,
    finished: false,
    isProcessedData: false,
    relation : []
  },
  reset: function() {
    this.state.sentenceIndex = 0;
    this.state.selectedIndex = 0;
    this.state.currentSentence = [];
    this.state.setSentences = [];
    this.state.finished = false;
  },
  setSentence: function (sentence) {
    this.state.currentSentence = sentence;
    this.state.selectedIndex = 0;
  },
  setSentences: function (sentences) {
    this.state.sentences = sentences.map(toObject);
    this.state.sentenceIndex = 0;
    this.setSentence(this.state.sentences[0]);
  },
  changeSentence(i) {
    this.state.sentenceIndex = i;
    this.setSentence(this.state.sentences[i])
    return this.state.currentSentence;
  },
  nextSentence() {
    return this.changeSentence(this.state.sentenceIndex + 1);
  },
  previousSentence() {
    return this.changeSentence(this.state.sentenceIndex - 1);
  },
  hasNextSentence() {
    return this.state.sentenceIndex + 1 < this.state.sentences.length;
  },
  hasPreviousSentence() {
    return this.state.sentenceIndex > 0;
  },
  setText: function (text) {

    var sentences = null;

    if(!this.state.isProcessedData) {
      sentences = text
        .split(/(\.|।)/g)
        .map((v) => v.trim())
        .filter((v) => v !== "." && v !== "।" && v !== "");
    }
    else {
      console.log("Dataset----->> " + dataset );
      sentences = []
      for (var key in dataset){
        // console.log( key, dataset[key] );
        sentences.push(dataset[key].join(' '));
      }
    }

    // console.log(dataset);
    this.setSentences(sentences);
  },
  setProcessedData: function(val) {
    this.state.isProcessedData = val;
  },
  setSelectedIndex: function (index) {
    this.state.selectedIndex = index;
  },
  resetSelectedIndex: function (index) {
    this.state.selectedIndex = 0;
  },
  getMaxIndex: function () {
    return this.state.currentSentence.length - 1;
  },
  // insertRelation: function(entity) {
  //   if (!this.state.currentSentence.length) return;
  //   this.state.currentSentence.relation[entity] =
  // },
  assignTag: function (tag) {
    if (!this.state.currentSentence.length) return;
    this.state.currentSentence[this.state.selectedIndex].tag = tag;
    this.nextSelection();
  },
  nextSelection: function () {
    if (this.state.selectedIndex < store.getMaxIndex())
      this.state.selectedIndex++;
    else
      this.state.selectedIndex = 0;
  },
  previousSelection: function () {
    if (store.state.selectedIndex > 0)
      store.state.selectedIndex--;
    else
      store.state.selectedIndex = store.getMaxIndex();
  },
  getCode() {
    var Dataset = this.state.sentences
      .map((s) => [s.map((p) => p.text),
        {tags: s.map(makeTag)}]);
      
    var tempDataset = {}

    for(var idx = 0; idx < Dataset.length; idx ++) {
      console.log(Dataset[idx][0]);
      for(var t = 0; t < Dataset[idx][1]["tags"].length; t ++) {
        if( Dataset[idx][1]["tags"][t] == "") {
          Dataset[idx][1]["tags"][t] = "O";
        } 
      }
      tempDataset[idx] =  { 
            "sentence" : Dataset[idx][0],
            "tags"     : Dataset[idx][1]["tags"]
      }
    }
    
    // console.log("Json -> " + tempDataset[0]["sentence"]);
    return tempDataset;
  }
};

const KEYS = tagSet.map(function (tag) {
  return tag.shortKey;
});

document.addEventListener('keyup', function (e) {
  if ((e.code) === 'ArrowRight') {
    store.nextSelection();
  }
  else if ((e.code) === 'ArrowLeft') {
    store.previousSelection();
  }
  else {
    const index = KEYS.indexOf(e.key.toLowerCase());
    if (index > -1) {
      store.assignTag(tagSet[index]);
    }
  }
});

// store.setSentence('কলিমদ্দি ছেলেটার সাথেই আলাপ জমানোর চেষ্টা করলো');
