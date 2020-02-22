
sheetProj.view.sheetLogic = {
  setupUserInterface: function () {

    $("#searchTags").tagit({caseSensitive:false});
    loadData();
    activateNavbar();
    Pages.Customize();
  }
};

function doneLoading(){
  //Pages.Feats();


}

function activateNavbar(){
  $("#featNav").click((event)=>{
    Pages.Feats();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");
  });
  $("#customNav").click(()=>{
    Pages.Customize();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");

  });
  $("#spellNav").click(()=>{
    Pages.Spells();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");
  });
}

const Pages={
  Feats:()=>{
    let pageContent=`<div id="featSearch">
      <!-- [Accepts Multiple comma seperated values]
      Filter Name: <input type="text">
      Filter Author: <input type="text"> -->
      <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
      By Name/Benefit:<input class="tagIt" id="searchTags"></input><br>
      By Source/Other: [disabled]<br>

      <button onclick="featSearch()">Confirm</button>
      <hr>
      <h3 class="sourceTag" style="background-color:grey;">Selected Feat:</h3>
    </div>
    <div id="featDisplay" style="padding-left:2vw;">

    </div>
    <h3 class="sourceTag" style="background-color:grey;">Valid Feats:</h3>
    <div id="featSelection" class="selectionSpace">
    </div>`;
    Pages.SetContent(pageContent);
  //  $("#searchTags").tagit({caseSensitive:false});
    createFeatList();

  },
  Customize:()=>{
    let pageContent=`<h3 class="sourceTag" style="background-color:grey;">Custom Content:</h3>
    Upload JSON files you made yourself, or got from your GM, here to add them to your compendium.
    If you're a GM making custom files for your players make sure to read our handy guide below to make sure you get the formatting right!  [Note, tutorial is under construction]
    <hr>
    Feats:<input type="file" multiple
   id="featInput" name="featInput"
   accept=".JSON">
   <br>
   <button onclick="Custom.loadFiles()">Upload!</button>`;
    Pages.SetContent(pageContent);
  },
  Spells:()=>{
    let pageContent=`<div id="spellSearch">
      <!-- [Accepts Multiple comma seperated values]
      Filter Name: <input type="text">
      Filter Author: <input type="text"> -->
      <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
      Search:<input class="tagIt" id="searchTags"></input><br>
      Spell Levels:<form id="spellLevelFilter" class="form-check form-check-inline">
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox0" value="0">
        <label class="form-check-label" for="spellCheckBox0">0</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox1" value="1">
        <label class="form-check-label" for="spellCheckBox1">1</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox2" value="2">
        <label class="form-check-label" for="spellCheckBox2">2</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox3" value="3">
        <label class="form-check-label" for="spellCheckBox3">3</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox4" value="4">
        <label class="form-check-label" for="spellCheckBox4">4</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox5" value="5">
        <label class="form-check-label" for="spellCheckBox5">5</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox6" value="6">
        <label class="form-check-label" for="spellCheckBox6">6</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox7" value="7">
        <label class="form-check-label" for="spellCheckBox7">7</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox8" value="8">
        <label class="form-check-label" for="spellCheckBox8">8</label>]&nbsp;
        [<input checked class="form-check-input" type="checkbox" id="spellCheckBox9" value="9">
        <label class="form-check-label" for="spellCheckBox9">9</label>]&nbsp;
      </form><br><br>
      Schools:<select id="spellSchoolFilter" title="NO SCHOOLS SELECTED!" class="selectpicker" multiple data-show-content=false data-actions-box=true data-selected-text-format="count">
          <option value="abjuration" selected>Abjuration</option>
          <option value="conjuration" selected>Conjuration</option>
          <option value="divination" selected>Divination</option>
          <option value="enchantment" selected>Enchantment</option>
          <option value="evocation" selected>Evocation</option>
          <option value="illusion" selected>Illusion</option>
          <option value="necromancy" selected>Necromancy</option>
          <option value="transmutation" selected>Transmutation</option>
          <option value="universal" selected>Universal</option>
        </select><br><br>


      <button onclick="Spells.search()">Confirm</button>
      <hr>
      <h3 class="sourceTag" style="background-color:grey;">Selected Spell:</h3>
    </div>
    <div id="spellDisplay" style="padding-left:2vw;">

    </div>
    <h3 class="sourceTag" style="background-color:grey;">Valid Spells:</h3>
    <div id="spellSelection" class="selectionSpace">
    </div>`;
    Pages.SetContent(pageContent);
    //$("#searchTags").tagit({caseSensitive:false});
    Spells.createList();

  },
  SetContent:(newContent)=>{
    $("#contentSpace").html(newContent);
    $(".selectpicker").selectpicker();
    $(".tagIt").tagit({caseSensitive:false});

  }
}

const Custom={
  loadFiles:()=>{
    let files=$("#featInput")[0].files;

    Object.keys(files).forEach((fileKey)=>{
      var reader = new FileReader();
     reader.onload = function(evt) {
       appendToList(JSON.parse(evt.target.result), featList);
     };
     reader.readAsText(files[fileKey]);
    });

    function appendToList(newFeats, oldList){
      let startNum=Object.keys(oldList).length;
      let newKeys=Object.keys(newFeats);
      for (let i=0; i<newKeys.length; i++){
        oldList[i+startNum]=newFeats[newKeys[i]];
      }
    }

  }
}

const Spells={
  search:()=>{


    spellFilter.textTags=$("#searchTags").tagit("assignedTags");


    spellFilter.levelTags=[];
    $("#spellLevelFilter").children(":checked").each((index, elem)=>{

      spellFilter.levelTags.push(elem.value);
    });


    spellFilter.schoolTags=$("#spellSchoolFilter").val();

      console.log(spellFilter);
    Spells.createList();
  },
  createList:()=>{
    let spellKeys=Object.keys(spellList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;
    spellKeys.sort(alphabetizeKeys);

      spellKeys=spellKeys.filter((spell)=>{
        return spellKeyFilter(spell);
      });


    while (spellKeys.length){
      let key=spellKeys.shift();
      let spell=spellList[key];

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag" style="background-color:grey;">~</h3>
          <ul>`;
      }

      currentCollection+=`<li class="spellListing" data-spell-id="${key}">${spell.Name}</li>`;

      if (listingCount==4 || spellKeys.length==0){

          currentCollection+=`</ul>
        </div>`;
        finalCollection+=currentCollection;
        listingCount=0;
      }else{
        listingCount++;
      }



    }

    $("#spellSelection").html(finalCollection);

    if (finalCollection.length==0){
      ci.fyiUser("No spells to show, try loosening your search results!");
    }
    $(".spellListing").click(Spells.displaySpell);
    jumpTo("spellSelection");

    function alphabetizeKeys(a, b){
      return spellList[a].Name.localeCompare(spellList[b].Name);
    }

    function spellKeyFilter(spell){
      spell=spellList[spell];
      //search filter
      if (spellFilter.textTags.length){
        for (let i=0; i<spellFilter.textTags.length; i++){
          let textCheck=spell.Name+spell.CastTime+spell.Range+spell.Components+spell.Duration+spell.Description;
          if (!textCheck.toLowerCase().includes(spellFilter.textTags[i].toLowerCase())){

            console.log("doesn't include: "+spellFilter.textTags[i].toLowerCase());
            return false;
          }

        }
      }

      //level filter
      if (!spellFilter.levelTags.includes(spell.Level.toString())){
        console.log(spellFilter.levelTags);
        console.log("doesn't include: ");
        console.log(spell.Level);
        return false;
      }
      //school filter
      if (!spellFilter.schoolTags.includes(spell.School.toLowerCase())){
        console.log(spellFilter.schoolTags);
        console.log("doesn't include: ");
        console.log(spell.School);
        return false;
      }

      return true;
    }
  },
  displaySpell:(event)=>{
    // console.log(this);

    let spell = spellList[event.target.getAttribute("data-spell-id")];
    let displayText=`<hr>
    <h1 id="spellName">${spell.Name}</h1><br>
    <div style="padding-left:5vw;">
      <span id="spellStats"><i>Level ${spell.Level} ${spell.School} Spell ${spell.isRitual? '(Ritual)':''}</i></span><br><br>
      <span id="castTime"><b>Cast Time:</b> ${spell.CastTime}</span><br><br>
      <span id="range" style="white-space: pre-wrap;"><b>Range:</b>${spell.Range}</span><br><br>
      <span id="duration" style="white-space: pre-wrap;"><b>Duration:</b>${spell.Duration}</span><br><br>
      <span id="components" style="white-space: pre-wrap;"><b>Components:</b>${spell.Components}</span><br><br>
      <hr>
      <span id="spellDescription" style="white-space: pre-wrap;">${spell.Description}</span><br><br>
      <h3 class="sourceTag" style="background-color:grey;">Source:</h3>
      <span id="featSourcing"><b>Author:</b> ${spell.Author ? spell.Author:"Unknown"}, <b>Collection:</b>${spell.Source ? spell.Source:"Unknown"}</span>
    </div>
    <hr>`;
    $("#spellDisplay").html(displayText);
    jumpTo("spellDisplay");
  }
}

function displayFeat(){
  let feat = featList[this.getAttribute("data-feat-id")];
  let displayText=`<hr>
  <h1 id="featName">${feat.Name}</h1><br>
  <div style="padding-left:5vw;">
    <span id="featFlavor"><i>${feat.Flavor ? feat.Flavor:""}</i></span><br><br>
    <span id="featPrereqs"><b>Prerequisites:</b> ${feat.Prereq ? feat.Prereq:"None"}</span><br><br>
    <span id="featBenefit" style="white-space: pre-wrap;"><b>Benefit:</b>${feat.Benefit}</span><br><br>
    <h3 class="sourceTag" style="background-color:grey;">Source:</h3>
    <span id="featSourcing"><b>Author:</b> ${feat.Author ? feat.Author:"Unknown"}, <b>Collection:</b>${feat.Source ? feat.Source:"Unknown"}</span>
  </div>
  <hr>`;
  $("#featDisplay").html(displayText);
  jumpTo("featDisplay");
}

function jumpTo(anchor){
    window.location.href = "#"+anchor;
}


function loadData(){
  $.getJSON( "src/model/testFeats.json", function( data ) {

    featList=data;
    //doneLoading();
  });

  $.getJSON( "src/model/baseSpells.json", function( data ) {

    spellList=data;
    //doneLoading();
  });

}

function loadUserFeats(){

}

function createFeatList(){
  let featKeys=Object.keys(featList);
  let finalCollection="";
  let currentCollection="";
  let listingCount=0;
  featKeys.sort(alphabetizeKeys);
  if (searchTags.length){
    featKeys=featKeys.filter((feat)=>{
      return featFilter(feat);
    });
  }

  while (featKeys.length){
    let key=featKeys.shift();
    let feat=featList[key];

    if (listingCount==0){
      currentCollection=`<div class="resultCollection">
        <h3 class="collectionTag" style="background-color:grey;">~</h3>
        <ul>`;
    }

    currentCollection+=`<li class="featListing" data-feat-id="${key}">${feat.Name}</li>`;

    if (listingCount==4 || featKeys.length==0){

        currentCollection+=`</ul>
      </div>`;
      finalCollection+=currentCollection;
      listingCount=0;
    }else{
      listingCount++;
    }



  }

  $("#featSelection").html(finalCollection);
  console.log(finalCollection);
  console.log(Boolean(finalCollection));
  if (finalCollection.length==0){
    ci.fyiUser("No feats to show, try loosening your search results!");
  }
  $(".featListing").click(displayFeat);
  jumpTo("featSelection");

  function alphabetizeKeys(a, b){
    return featList[a].Name.localeCompare(featList[b].Name);
  }

  function featFilter(feat){
    feat=featList[feat];
    for (let i=0; i<searchTags.length; i++){
      if (!feat.Name.toLowerCase().includes(searchTags[i].toLowerCase()) && !feat.Benefit.toLowerCase().includes(searchTags[i].toLowerCase())){
        return false;
      }

    }

    return true;
  }
}

function featSearch(){
  console.log($("#searchTags").tagit("assignedTags"));
  searchTags=$("#searchTags").tagit("assignedTags");

  createFeatList();
}
