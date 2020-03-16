

// if (localStorage.getItem("savedChars") === null) {
//   localStorage.setItem('savedChars', JSON.stringify(savedChars));
// }
//
// if (localStorage.getItem("activeChar") === null) {
//   localStorage.setItem('activeChar', 0);
// }

let featList=false;
let spellList=false;
let itemList=false;
let creatureList=false;
let moduleList=false;
let classList=false;
let subraceList=false;
let raceList=false;
//let searchTags=[];
let spellFilter={
  textTags:[],
  levelTags:["0","1","2","3","4","5","6","7","8","9"],
  schoolTags:["transmutation", "abjuration", "conjuration", "necromancy", "enchantment", "evocation", "illusion", "divination", "universal"],

}
let itemFilter={
  textTags:[],
  attunement:"either", //attuned, unattuned or either
  itemTypes:["weapon", "armor", "rod", "wondrous", "potion", "ring", "scroll", "staff", "wand"],
  rarity:["common", "uncommon", "rare", "very rare", "legendary"],

}
let creatureFilter={
  textTags:[],
  cr:{min:0, max:30},
  type:[],
  alignment:["lawful good", "lawful neutral", "lawful evil", "neutral good", "neutral", "neutral evil", "chaotic good", "chaotic neutral", "chaotic evil", "unaligned"],
  //
  loadedTypes:[]
}
let featFilter={
  textTags:[],
  sourceTags:[]
}

let moduleFilter={
  tagList:[],
  sourceTags:[],
  validTags:[]
}

let classFilter={
  textTags:[],
  hitDice:["1d6", "1d8", "1d10", "1d12"],
}
let raceFilter={
  textTags:[],
}




let ci={
  dieRoll:function(dieSides){
    return Math.floor(Math.random()*dieSides)+1;
  },
  array_move:function(arr, old_index, new_index) {
    //https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  },
  checkCommonGround:function(array1, array2){
    //tests if array1 and 2 have ANY elements in common
    let commonGround=false;
    if (array1.length<array2.length){
      for (let i=0, len=array1.length; i<len; i++){
        if (array2.includes(array1[i])){commonGround=true; break;}
      }
    }else{
      for (let i=0, len=array2.length; i<len; i++){
        if (array1.includes(array2[i])){commonGround=true; break;}
      }
    }

    return commonGround;
  },
  copyToClipboard:(copyText)=>{
    /* Get the text field */


   /* Select the text field */

   let range = document.createRange();
   let selection=window.getSelection();
   range.selectNode(copyText);
   selection.removeAllRanges();
   selection.addRange(range);
   document.execCommand("copy");



   /* Alert the copied text */
   ci.fyiUser("Magic Word copied to clipboard");
 },
 fyiUser:(text)=>{
   $("#alertBanner").removeClass("activeAlert");
   $("#alertBanner").html(text);
   $("#alertBanner").addClass("activeAlert");
   setTimeout(removeBanner, 5000)

   function removeBanner(){
     $("#alertBanner").removeClass("activeAlert");
   }
 }

}



function resetStorage(){
  if (window.confirm("Do you really want to delete all your saved info?")) {
  localStorage.clear();
  location.reload();
}
}
