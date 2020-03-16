
sheetProj.view.sheetLogic = {
  setupUserInterface: function () {

    $("#searchTags").tagit({caseSensitive:false});
    loadData();
    activateNavbar();
    //Pages.Customize();
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
  $("#itemNav").click(()=>{
    Pages.MagicItems();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");
  });
  $("#creatureNav").click(()=>{
    Pages.Creatures();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");
  });
  $("#moduleNav").click(()=>{
    Pages.Modules();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");
  });
  $("#classNav").click(()=>{
    Pages.Classes();
    $(".selectedNav").removeClass("selectedNav");
    $(event.target).addClass("selectedNav");
  });
  $("#raceNav").click(()=>{
    Pages.Races();
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
      By Name/Benefit:<input class="tagit" id="searchTags"></input><br>
      Source/Author Search:<input class="tagit" id="sourceTags"></input><br><br>

      <button onclick="Feats.search()">Confirm</button>
      <hr>
      <h3 class="sourceTag" style="background-color:grey;">Selected Feat:</h3>
    </div>
    <div id="featDisplay" style="padding-left:2vw;">

    </div>
    <h3 class="sourceTag" style="background-color:grey;">Valid Feats:</h3>
    <div id="featSelection" class="selectionSpace">
    </div>`;
    Pages.SetContent(pageContent);
    Feats.createList();

  },
  Modules:()=>{
    let pageContent=`<div id="moduleSearch">
      <!-- [Accepts Multiple comma seperated values]
      Filter Name: <input type="text">
      Filter Author: <input type="text"> -->
      <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
      Tag Search:<input id="searchTags" class="tagit"></input><br>


      Source/Author Search:<input id="sourceTags" class="tagit"></input><br>


      <button onclick="Modules.search()">Search</button>
      <hr>
      <h3 class="sourceTag" style="background-color:grey;">Selected Module:</h3>
    </div>
    <div id="moduleDisplay" style="padding-left:2vw;">

    </div>
    <h3 class="sourceTag" style="background-color:grey;">Valid Articles:</h3>
    <div id="moduleSelection" class="selectionSpace">
    </div>`;
    Pages.SetContent(pageContent);
    Modules.createList();
    $("#searchTags").tagit({availableTags: moduleFilter.validTags});

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
  Classes:()=>{
    let pageContent=`<div id="classSearch">
              <!-- [Accepts Multiple comma seperated values]
              Filter Name: <input type="text">
              Filter Author: <input type="text"> -->
              <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
              General Search:<input id="searchText" class="tagit"></input><br>
              Hit Dice Filter:<select id="searchDice" title="SELECT 1+ HIT DIE!" class="selectpicker" multiple data-show-content=false data-actions-box=true data-selected-text-format="count">
                        <option value="1d6" selected>1d6</option>
                        <option value="1d8" selected>1d8</option>
                        <option value="1d10" selected>1d10</option>
                        <option value="1d12" selected>1d12</option>
                      </select><br><br>




              <button onclick="Classes.search()">Search</button>
              <hr>
              <h3 class="sourceTag" style="background-color:grey;">Selected Class:</h3>
            </div>
            <div id="classDisplay" style="padding-left:2vw;">
              <hr>

              <hr>

            </div>
            <h3 class="sourceTag" style="background-color:grey;">Valid Classes:</h3>

            <div id="classSelection" class="selectionSpace">
            </div>`;
    Pages.SetContent(pageContent);
    Classes.createList();
    $("#searchTags").tagit({availableTags: moduleFilter.validTags});

  },
  Races:()=>{
    let pageContent=`<div id="raceSearch">
              <!-- [Accepts Multiple comma seperated values]
              Filter Name: <input type="text">
              Filter Author: <input type="text"> -->
              <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
              General Search:<input id="searchText" class="tagit"></input><br>
              <button onclick="Races.search()">Search</button>
              <hr>
              <h3 class="sourceTag" style="background-color:grey;">Selected Race:</h3>
            </div>
            <div id="raceDisplay" style="padding-left:2vw;">
              <hr>

              <hr>

            </div>
            <h3 class="sourceTag" style="background-color:grey;">Valid Races:</h3>

            <div id="raceSelection" class="selectionSpace">
            </div>`;
    Pages.SetContent(pageContent);
    Races.createList();
    $("#searchTags").tagit({availableTags: moduleFilter.validTags});

  },
  Spells:()=>{
    let pageContent=`<div id="spellSearch">
      <!-- [Accepts Multiple comma seperated values]
      Filter Name: <input type="text">
      Filter Author: <input type="text"> -->
      <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
      Search:<input class="tagit" id="searchTags"></input><br>
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
    $("#searchTags").tagit({caseSensitive:false});
    Spells.createList();

  },
  MagicItems:()=>{
    let pageContent=`  <div id="itemSearch">
        <!-- [Accepts Multiple comma seperated values]
        Filter Name: <input type="text">
        Filter Author: <input type="text"> -->
        <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
        Text Search:<input id="searchTags" class="tagit"></input><br>
        Attunement Filter:<br><form id="attunementFilter">
            <label class="radio-inline">
              <input type="radio" name="attuneRadio" checked value="either">Either
            </label>
            <label class="radio-inline">
              <input type="radio" name="attuneRadio"  value="attuned">Requires attunement
            </label>
            <label class="radio-inline">
              <input type="radio" name="attuneRadio" value="unattuned">No attunement required
            </label>
          </form>
        <br><br>
        Item Type Filter:<br><select id="itemTypeFilter" title="NO TYPES SELECTED!" class="selectpicker" multiple data-show-content=false data-actions-box=true data-selected-text-format="count">
            <option value="weapon" selected>Weapons</option>
            <option value="armor" selected>Armor</option>
            <option value="ring" selected>Rings</option>
            <option value="wondrous" selected>Wondrous Items</option>
            <option value="staff" selected>Staves</option>
            <option value="rod" selected>Rods</option>
            <option value="wand" selected>Wands</option>
            <option value="potion" selected>Potions</option>
            <option value="scroll" selected>Scrolls</option>
          </select><br><br>
        Item Rarity Filter:<br><select id="itemRarityFilter" title="NO RARITIES SELECTED!" class="selectpicker" multiple data-show-content=false data-actions-box=true data-selected-text-format="count">
            <option value="common" selected>Common</option>
            <option value="uncommon" selected>Uncommon</option>
            <option value="rare" selected>Rare</option>
            <option value="very rare" selected>Very Rare</option>
            <option value="legendary" selected>Legendary</option>

          </select><br><br>


        <button onclick="Items.search()">Search</button>
        <hr>
        <h3 class="sourceTag" style="background-color:grey;">Selected Item:</h3>
      </div>
      <div id="itemDisplay" style="padding-left:2vw;">
        <hr>
        <hr>
      </div>
      <h3 class="sourceTag" style="background-color:grey;">Valid Items:</h3>
      <div id="itemSelection" class="selectionSpace">
      </div>`;
    Pages.SetContent(pageContent);
    Items.createList();
  },
  Creatures:()=>{
    let pageContent=`<div id="creatureSearch">
      <!-- [Accepts Multiple comma seperated values]
      Filter Name: <input type="text">
      Filter Author: <input type="text"> -->
      <h3 class="sourceTag" style="background-color:grey;">Filter:</h3>
      Text Search:<input id="searchTags" class="tagit"></input><br>

      <div style="display:flex;">
        <div style="text-align:center;"><u>Min</u><br>
          <input id="crMinFilter" type="number" value=${creatureFilter.cr.min}>
        </div>
        <div  style="text-align:center; align-self:flex-end; font-size:1.5em;">-|CR Range|-</div>
        <div  style="text-align:center;"><u>Max</u><br>
          <input id="crMaxFilter" type="number" value=${creatureFilter.cr.max}></div>
      </div>
      <br><br>
      Alignment Filter:<br><select id="creatureAlignmentFilter" title="NO ALIGNMENTS SELECTED!" class="selectpicker" multiple data-show-content=false data-actions-box=true data-selected-text-format="count">
          <option value="lawful good" ${creatureFilter.alignment.includes("lawful good")? "selected":""}>Lawful Good</option>
          <option value="lawful neutral" ${creatureFilter.alignment.includes("lawful neutral")? "selected":""}>Lawful Neutral</option>
          <option value="lawful evil" ${creatureFilter.alignment.includes("lawful evil")? "selected":""}>Lawful Evil</option>
          <option value="neutral good" ${creatureFilter.alignment.includes("neutral good")? "selected":""}>Neutral Good</option>
          <option value="neutral" ${creatureFilter.alignment.includes("neutral")? "selected":""}>True Neutral</option>
          <option value="neutral evil" ${creatureFilter.alignment.includes("neutral evil")? "selected":""}>Neutral Evil</option>
          <option value="chaotic good" ${creatureFilter.alignment.includes("chaotic good")? "selected":""}>Chaotic Good</option>
          <option value="chaotic neutral" ${creatureFilter.alignment.includes("chaotic neutral")? "selected":""}>Chaotic Neutral</option>
          <option value="chaotic evil" ${creatureFilter.alignment.includes("chaotic evil")? "selected":""}>Chaotic Evil</option>
          <option value="unaligned" ${creatureFilter.alignment.includes("unaligned")? "selected":""}>Unaligned</option>
        </select><br><br>
      Type Filter:<br><select id="creatureTypeFilter" title="NO TYPES SELECTED!" class="selectpicker" multiple data-show-content=false data-actions-box=true data-selected-text-format="count">
          ${getCreatureTypes()}
        </select><br><br>


      <button onclick="Creatures.search()">Search</button>
      <hr>
      <h3 class="sourceTag" style="background-color:grey;">Selected Creature:</h3>
    </div>
    <div id="creatureDisplay" style="padding-left:2vw;">
      <hr>

      <hr>
    </div>
    <h3 class="sourceTag" style="background-color:grey;">Valid Items:</h3>
    <div id="creatureSelection" class="selectionSpace">
    </div>`;

    function getCreatureTypes(){
      let options=``;
      creatureFilter.loadedTypes.forEach((type)=>{
        options+=`<option value="${type}" ${creatureFilter.type.includes(type)? "selected":""}>${type}</option>`;
      });
      return options;

    }
    creatureFilter.textTags=[];
    Pages.SetContent(pageContent);
    Creatures.createList();
  },
  SetContent:(newContent)=>{
    $("#contentSpace").html(newContent);
    $(".selectpicker").selectpicker();
    $(".tagit").tagit({caseSensitive:false});

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
          <h3 class="collectionTag"></h3>
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


            return false;
          }

        }
      }

      //level filter
      if (!spellFilter.levelTags.includes(spell.Level.toString())){

        return false;
      }
      //school filter
      if (!spellFilter.schoolTags.includes(spell.School.toLowerCase())){

        return false;
      }

      return true;
    }
  },
  displaySpell:(event)=>{


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

const Items={
  search:()=>{


    itemFilter.textTags=$("#searchTags").tagit("assignedTags");


    itemFilter.attunement=$("input[name*='attuneRadio']:checked").val();

    itemFilter.itemTypes=$("#itemTypeFilter").val();
    itemFilter.rarity=$("#itemRarityFilter").val();





    Items.createList();
  },
  createList:()=>{
    let itemKeys=Object.keys(itemList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;

    //sort and filter
    itemKeys.sort(alphabetizeKeys);

    itemKeys=itemKeys.filter((item)=>{
      return itemKeyFilter(item);
    });


    while (itemKeys.length){
      let key=itemKeys.shift();
      let item=itemList[key];

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag"></h3>
          <ul>`;
      }

      currentCollection+=`<li class="itemListing" data-item-id="${key}">${item.Name}</li>`;

      if (listingCount==4 || itemKeys.length==0){

          currentCollection+=`</ul>
        </div>`;
        finalCollection+=currentCollection;
        listingCount=0;
      }else{
        listingCount++;
      }



    }

    $("#itemSelection").html(finalCollection);

    if (finalCollection.length==0){
      ci.fyiUser("No items to show, try loosening your search results!");
    }
    $(".itemListing").click(Items.displayItem);
    jumpTo("itemSelection");

    function alphabetizeKeys(a, b){
      return itemList[a].Name.localeCompare(itemList[b].Name);
    }

    function itemKeyFilter(item){

      item=itemList[item];
      //search filter
      if (itemFilter.textTags.length){
        for (let i=0; i<itemFilter.textTags.length; i++){
          let textCheck=item.Name+item.Type+item.Rarity+item.Description;
          if (item.Attunement){textCheck+=item.Attunement};
          if (!textCheck.toLowerCase().includes(itemFilter.textTags[i].toLowerCase())){


            return false;
          }

        }
      }

      //attunement filter
      switch (itemFilter.attunement){
        case "attuned":
          if(!item.Attunement){

            return false;
          }
          break;
        case "unattuned":
          if(item.Attunement){

            return false;
          }
          break;
        case "either":
          break;
        default:
          console.log("item attune filter made a mistake");
          break;
      }
      //rarity filter
      if (!itemFilter.rarity.includes(item.Rarity)){

        return false;
      }

      //type filter
      for (let i=0; i<itemFilter.itemTypes.length; i++){
        if (item.Type.toLowerCase().includes(itemFilter.itemTypes[i])){
          break;
        }
        if (i+1>=itemFilter.itemTypes.length){
          return false
        }
      }


      return true;
    }
  },
  displayItem:(event)=>{


    let item = itemList[event.target.getAttribute("data-item-id")];
    let displayText=`<hr>
    <h1 id="itemName">${item.Name}</h1><br>
    <div style="padding-left:5vw;">
      <span id="itemTypeline"><i>${item.Type}, ${item.Rarity} ${item.Attunement? `(${item.Attunement})`:""}</i></span><br><br>
      <span id="itemDescription" style="white-space: pre-wrap;">${item.Description}</span><br><br>
      <h3 class="sourceTag" style="background-color:grey;">Source:</h3>
      <span id="itemSourcing"><b>Author:</b> ${item.Author ? item.Author:"Unknown"}, <b>Collection:</b>${item.Source ? item.Source:"Unknown"}</span>
    </div>
    <hr>`;
    $("#itemDisplay").html(displayText);
    jumpTo("itemDisplay");
  }
}

const Modules={
  search:()=>{

    //TODO
    moduleFilter.tagList=$("#searchTags").tagit("assignedTags");
    moduleFilter.sourceTags=$("#sourceTags").tagit("assignedTags");





    Modules.createList();
  },
  createList:()=>{
    let moduleKeys=Object.keys(moduleList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;

    //sort and filter

    moduleKeys.sort(alphabetizeKeys);


    moduleKeys=moduleKeys.filter((mod)=>{
      return moduleKeyFilter(mod);
    });


    while (moduleKeys.length){
      let key=moduleKeys.shift();
      let mod=moduleList[key];

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag"></h3>
          <ul>`;
      }

      currentCollection+=`<li class="moduleListing" data-module-id="${key}">${key}</li>`;

      if (listingCount==4 || moduleKeys.length==0){

          currentCollection+=`</ul>
        </div>`;
        finalCollection+=currentCollection;
        listingCount=0;
      }else{
        listingCount++;
      }



    }

    $("#moduleSelection").html(finalCollection);

    if (finalCollection.length==0){
      ci.fyiUser("No modules to show, try loosening your search results!");
    }
    $(".moduleListing").click(Modules.displayModule);
    jumpTo("moduleSelection");

    function alphabetizeKeys(a, b){
      return a.localeCompare(b);
    }

    function moduleKeyFilter(mod){

      let modtags;
      mod=moduleList[mod];

      modTags=mod.Tags.sectionText;
      //search filter
      if (moduleFilter.tagList.length){

        for (let i=0; i<moduleFilter.tagList.length; i++){

          if (!modTags.map(elem=>elem.toLowerCase()).includes(moduleFilter.tagList[i].toLowerCase())){
            return false;
          }
        }
      }
      if (moduleFilter.sourceTags.length){

        for (let i=0; i<moduleFilter.sourceTags.length; i++){
          let textCheck=(mod.Source.sectionText+mod.Author.sectionText).toLowerCase();
          if (!textCheck.includes(moduleFilter.sourceTags[i].toLowerCase())){
            return false;
          }
        }
      }






      return true;
    }
  },
  displayModule:(event)=>{


    let mod = moduleList[event.target.getAttribute("data-module-id")];
    let displayText=`<hr>
    <h1>${event.target.getAttribute("data-module-id")}</h1>
    <h6>Tags:${mod.Tags.sectionText}</h6>
    <div class="navBox">
      <ul>
        ${createNavBox(mod)}

      </ul>
    </div>
    <hr>
      ${createSections(mod)}

    <hr>`;
    $("#moduleDisplay").html(displayText);
    jumpTo("moduleDisplay");

    function createNavBox(mod){
      let navList='';
      let keys=Object.keys(mod);
      keys.forEach((key)=>{
        if (key.toLowerCase()=="tags"){return;}
        else{
          navList+=`<li class="navEntry" onclick="jumpTo('${key.replace(/\s/g,'')}Section')">${key}</li>`;
        }

      });
      return navList;
    }

    function createSections(mod){
      let sectionHTML='';
      let keys=Object.keys(mod);
      keys.forEach((key)=>{
        if (key.toLowerCase()=="tags"){return;}

          sectionHTML+=`<h4 class="sourceTag moduleSectionTitle"  id="${key.replace(/\s/g,'')}Section">${key}</h4>
          <p class="moduleContent">
            ${mod[key].sectionText}
          </p>`;


      });
      return sectionHTML;
    }
  }
}

const Creatures={
  search:()=>{


    creatureFilter.textTags=$("#searchTags").tagit("assignedTags");

    creatureFilter.cr.min=$("#crMinFilter").val();
    creatureFilter.cr.max=$("#crMaxFilter").val();
    // itemFilter.attunement=$("input[name*='attuneRadio']:checked").val();

    creatureFilter.type=$("#creatureTypeFilter").val();
    creatureFilter.alignment=$("#creatureAlignmentFilter").val();





    Creatures.createList();
  },
  createList:()=>{
    let creatureKeys=Object.keys(creatureList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;

    //sort and filter

    creatureKeys.sort(alphabetizeKeys);

    creatureKeys=creatureKeys.filter((creature)=>{
      return creatureKeyFilter(creature);
    });



    while (creatureKeys.length){
      let key=creatureKeys.shift();
      let creature=creatureList[key];

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag"></h3>
          <ul>`;
      }

      currentCollection+=`<li class="creatureListing" data-creature-id="${key}">${creature.name}</li>`;

      if (listingCount==4 || creatureKeys.length==0){

          currentCollection+=`</ul>
        </div>`;
        finalCollection+=currentCollection;
        listingCount=0;
      }else{
        listingCount++;
      }



    }

    $("#creatureSelection").html(finalCollection);

    if (finalCollection.length==0){
      ci.fyiUser("No creatures to show, try loosening your search results!");
    }
    $(".creatureListing").click(Creatures.displayCreature);
    jumpTo("creatureSelection");

    function alphabetizeKeys(a, b){

      if (!creatureList[a].name){
        console.log(creatureList[a]);
      }
      return creatureList[a].name.localeCompare(creatureList[b].name);
    }

    function creatureKeyFilter(creature){

      creature=creatureList[creature];
      //search filter
      if (creatureFilter.textTags.length){
        let textCheck=creature.toSring().toLowerCase();
        for (let i=0; i<creatureFilter.textTags.length; i++){


          if (!textCheck.includes(creatureFilter.textTags[i].toLowerCase())){

            console.log("doesn't include: "+creatureFilter.textTags[i].toLowerCase());
            return false;
          }

        }
      }

      //cr filter
      if (parseInt(creature.challenge_rating)>creatureFilter.cr.max || parseInt(creature.challenge_rating)<creatureFilter.cr.min){
        return false;
      }
      //alignmenty filter
      if (!creatureFilter.alignment.includes(creature.alignment)){
        console.log(creatureFilter.alignment);
        console.log("doesn't include: ");
        console.log(creature.alignment);
        return false;
      }

      //type filter
      for (let i=0; i<creatureFilter.type.length; i++){
        if (creature.type.toLowerCase().includes(creatureFilter.type[i])){
          break;
        }
        if (i+1>=creatureFilter.type.length){
          return false
        }
      }


      return true;
    }
  },
  displayCreature:(event)=>{


    let creature = creatureList[event.target.getAttribute("data-creature-id")];
    let displayText=`<hr>
    <h1 id="creatureName">${creature.name} [CR:${creature.challenge_rating}]</h1><br>
    <div style="padding-left:5vw;">
      <span id="creatureTypeline"><i>${creature.size} ${creature.type}${creature.subtype? ` [${creature.subtype}]`:""}, ${creature.alignment}</i></span><br><br>

      <h5 class="sourceTag" style="background-color:grey;">Quick Stats:</h5><br>
        <p><b>Armor Class:</b> ${creature.armor_class}</p>
        <p><b>Hit Points:</b>${creature.hit_points} (${creature.hit_dice})</p>
        <p><b>Speed:</b>${creature.speed}</p>
        <table style="width:100%" class="statTable">
          <tr>
            <th></th>
            <th>STR</th>
            <th>DEX</th>
            <th>CON</th>
            <th>INT</th>
            <th>WIS</th>
            <th>CHA</th>
          </tr>
          <tr>
            <td>Score:</td>
            <td>${creature.strength+"("+appendMod(creature.strength)+")"}</td>
            <td>${creature.dexterity+"("+appendMod(creature.dexterity)+")"}</td>
            <td>${creature.constitution+"("+appendMod(creature.constitution)+")"}</td>
            <td>${creature.intelligence+"("+appendMod(creature.intelligence)+")"}</td>
            <td>${creature.wisdom+"("+appendMod(creature.wisdom)+")"}</td>
            <td>${creature.charisma+"("+appendMod(creature.charisma)+")"}</td>
          </tr>
          <tr>
            <td>Save:</td>
            <td>${creature.strength_save!==undefined? `<b>+${creature.strength_save}</b>`:appendMod(creature.strength)}</td>
            <td>${creature.dexterity_save!==undefined? `<b>+${creature.dexterity_save}</b>`:appendMod(creature.dexterity)}</td>
            <td>${creature.constitution_save!==undefined? `<b>+${creature.constitution_save}</b>`:appendMod(creature.constitution)}</td>
            <td>${creature.intelligence_save!==undefined? `<b>+${creature.intelligence_save}</b>`:appendMod(creature.intelligence)}</td>
            <td>${creature.wisdom_save!==undefined? `<b>+${creature.wisdom_save}</b>`:appendMod(creature.wisdom)}</td>
            <td>${creature.charisma_save!==undefined? `<b>+${creature.charisma_save}</b>`:appendMod(creature.charisma)}</td>
          </tr>
        </table>

        <p><b>Senses:</b>${creature.senses}</p>
        <p><b>Languages:</b>${creature.languages}</p>
      <h5 class="sourceTag" style="background-color:grey;">Defenses:</h5><br>
        ${creature.damage_vulnerabilities? ` <p><b>Vulnerable to:</b>${creature.damage_vulnerabilities}</p>`:""}
        ${creature.damage_vulnerabilities? ` <p><b>Resistant to:</b>${creature.damage_resistances}</p>`:""}
        ${creature.damage_immunities|creature.condition_immunities? ` <p><b>Immune to:</b>${creature.damage_resistances+creature.condition_immunities}</p>`:""}
      <h5 class="sourceTag" style="background-color:grey;">Specials:</h5><br>
        ${getSpecials(creature)}
      <h5 class="sourceTag" style="background-color:grey;">Actions:</h5><br>
        ${getActions(creature)}
      <h5 class="sourceTag" style="background-color:grey;">Legendary Actions:</h5><br>
        ${getLegendaryActions(creature)}
      <h3 class="sourceTag" style="background-color:grey;">Source:</h3>
      <span id="creatureSourcing"><b>Author:</b> ${creature.Author ? creature.Author:"Unknown"}, <b>Collection:</b>${creature.Source ? creature.Source:"Unknown"}</span>
    </div>
    <hr>`;
    $("#creatureDisplay").html(displayText);
    jumpTo("creatureDisplay");
    function appendMod(stat){
      let moddedStat="";
      let mod;
      stat=parseInt(stat);
      //-5 is the penalty for haivng a stat of 0.  every 2 points in a stat is a +1 bonus
      mod = Math.floor(stat/2)-5;
      moddedStat+=`${mod>=0? "+":""}${mod}`;
      return moddedStat;
    }

    function getSpecials(creature){
      let markedText="";
      if (creature.special_abilities===undefined){return markedText}
      creature.special_abilities.forEach((ability)=>{
        markedText+=`<p><b>${ability.name}:</b></p>
        <p>${ability.desc}</p>`;
      });

      return markedText;
    }
    function getActions(creature){
      let markedText="";
      if (creature.actions===undefined){return markedText}
      creature.actions.forEach((ability)=>{
        markedText+=`<p><b>${ability.name}:</b></p>
        <p>${ability.desc}</p>`;
      });

      return markedText;
    }
    function getLegendaryActions(creature){
      let markedText="";
      if (creature.legendary_actions===undefined){return markedText}
      creature.legendary_actions.forEach((ability)=>{
        markedText+=`<p><b>${ability.name}:</b></p>
        <p>${ability.desc}</p>`;
      });

      return markedText;
    }
  }
}

const Feats={
  search:()=>{

    featFilter.textTags=$("#searchTags").tagit("assignedTags");
    featFilter.sourceTags=$("#sourceTags").tagit("assignedTags");


    Feats.createList();
  },
  createList:()=>{
    let featKeys=Object.keys(featList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;
    featKeys.sort(alphabetizeKeys);

      featKeys=featKeys.filter((feat)=>{
        return featKeyFilter(feat);
      });


    while (featKeys.length){
      let key=featKeys.shift();
      let feat=featList[key];

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag"></h3>
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

    if (finalCollection.length==0){
      ci.fyiUser("No feats to show, try loosening your search results!");
    }
    $(".featListing").click(Feats.displayFeat);
    jumpTo("featSelection");

    function alphabetizeKeys(a, b){
      return featList[a].Name.localeCompare(featList[b].Name);
    }

    function featKeyFilter(feat){

      let sourceText="";
      let bodyText="";
      feat=featList[feat];

      sourceText+=feat.Source.toLowerCase()+feat.Author.toLowerCase();


      bodyText=feat.Name.toLowerCase()+feat.Benefit.toLowerCase();

      for (let i=0; i<featFilter.textTags.length; i++){
        if (!bodyText.includes(featFilter.textTags[i].toLowerCase()) ){

          return false;
        }

      }
      for (let i=0; i<featFilter.sourceTags.length; i++){
        if (!sourceText.includes(featFilter.sourceTags[i].toLowerCase()) ){

          return false;
        }

      }

      return true;
    }
  },
  displayFeat:()=>{
    let feat = featList[event.target.getAttribute("data-feat-id")];
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
}

const Classes={
  search:()=>{

    //TODO
    classFilter.textTags=$("#searchText").tagit("assignedTags");
    classFilter.hitDice=$("#searchDice").val();
    //moduleFilter.sourceTags=$("#sourceTags").tagit("assignedTags");





    Classes.createList();
  },
  createList:()=>{
    let classKeys=Object.keys(classList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;

    //sort and filter

    classKeys.sort(alphabetizeKeys);


    classKeys=classKeys.filter((elem)=>{
      return classKeyFilter(elem);
    });


    while (classKeys.length){
      let key=classKeys.shift();
      let mod=classList[key];

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag"></h3>
          <ul>`;
      }

      currentCollection+=`<li class="classListing" data-class-id="${key}">${key}</li>`;

      if (listingCount==4 || classKeys.length==0){

          currentCollection+=`</ul>
        </div>`;
        finalCollection+=currentCollection;
        listingCount=0;
      }else{
        listingCount++;
      }



    }

    $("#classSelection").html(finalCollection);

    if (finalCollection.length==0){
      ci.fyiUser("No classs to show, try loosening your search results!");
    }
    $(".classListing").click(Classes.displayClass);
    jumpTo("classSelection");

    function alphabetizeKeys(a, b){
      return a.localeCompare(b);
    }

    function classKeyFilter(elem){

      //let classTags;
      let genText="";

      elem=classList[elem];

      if (elem.IsArchetype.sectionText){
        return false;
      }

      Object.keys(elem).forEach((key=>{
        genText+=key;
        genText+=elem[key].sectionText;
      }));
      genText=genText.toLowerCase();
      //classTags=elem.Tags.sectionText;
      //search filter
      if (classFilter.textTags.length){
        for (let i=0, len=classFilter.textTags.length; i<len; i++){
          if (!genText.includes(classFilter.textTags[i].toLowerCase())){
            return false;
          }
        }
      }
      if (!classFilter.hitDice.includes(elem.HitDice.sectionText)){
        return false;
      }






      return true;
    }
  },
  displayClass:(event)=>{


    let elem = classList[event.target.getAttribute("data-class-id")];


    let displayText=`<hr>
    <h1>${elem.Name.sectionText}</h1>

    <hr>
      ${createSections(elem)}
      Class Archetype:<select onchange="Classes.appendArchetype()" id="classArchetypeSelect" title="SELECT AN ARCHETYPE!" class="selectpicker"  data-actions-box=true >
                ${getArchetypes(event.target.getAttribute("data-class-id"))}
              </select><br><br>
      <div id="classArchetypeSection">


      </div>
    <hr>`;
    $("#classDisplay").html(displayText);
    jumpTo("classDisplay");
    $(".selectpicker").selectpicker();

    // function createNavBox(elem){
    //   let navList='';
    //   let keys=Object.keys(elem);
    //   keys.forEach((key)=>{
    //     if (key.toLowerCase()=="tags"){return;}
    //     else{
    //       navList+=`<li class="navEntry" onclick="jumpTo('${key.replace(/\s/g,'')}Section')">${key}</li>`;
    //     }
    //
    //   });
    //   return navList;
    // }

    function getArchetypes(baseClass){
      let archetypes=``;
      Object.keys(classList).forEach((key)=>{

        if (classList[key].IsArchetype.sectionText && classList[key].IsArchetype.sectionText==baseClass){
          archetypes+=`<option value="${key}">${key}</option>`;

        }
      });
      return archetypes;
      //<option value="1d6">1d6</option>
      //<option value="1d8" >1d8</option>
      //<option value="1d10">1d10</option>
    //  <option value="1d12">1d12</option>
    }

    function createSections(elem){
      let sectionHTML='';
      let keys=Object.keys(elem);
      keys.forEach((key)=>{
        let prof;

        switch (key.toLowerCase()){

          case "tags":
            break;
          case "proficiencies":
            //// TODO:

            prof=elem[key].sectionText;
            sectionHTML+=`<h4 class="sourceTag classSectionTitle"  id="${key.replace(/\s/g,'')}Section">${key}</h4>
            <p class="classContent">
              <b>Armor:</b>${prof.Armor}<br>
              <b>Weapons:</b>${prof.Weapons}<br>
              <b>Tools:</b>${prof.Tools}<br>
              <b>Saving Throws:</b>${prof["Saving Throws"]}<br>
              <b>Skills:</b>${prof.Skills}<br>

            </p>`;
            break;
          case "isarchetype":
            break;
          case "name":
            break;
          case "":
            break;

          default:
            sectionHTML+=`<h4 class="sourceTag classSectionTitle"  id="${key.replace(/\s/g,'')}Section">${key}</h4>
            <p class="classContent">
              ${elem[key].sectionText}
            </p>`;

          break;
        }




      });


      return sectionHTML;
    }
  },
  appendArchetype:()=>{
    let archetype=classList[event.target.value];
    if (!archetype){
      ci.fyiUser("Uh oh, something went wrong when loading this archetype!");
      return;
    }else{
      $("#classArchetypeSection").html(createSections(archetype));
    }
    function createSections(elem){
      let sectionHTML='';
      let keys=Object.keys(elem);
      keys.forEach((key)=>{
        let prof;

        switch (key.toLowerCase()){

          case "tags":
            break;
          case "proficiencies":
            //// TODO:

            prof=elem[key].sectionText;
            sectionHTML+=`<h4 class="sourceTag classSectionTitle"  id="${key.replace(/\s/g,'')}Section">${key}</h4>
            <p class="classContent">
              <b>Armor:</b>${prof.Armor}<br>
              <b>Weapons:</b>${prof.Weapons}<br>
              <b>Tools:</b>${prof.Tools}<br>
              <b>Saving Throws:</b>${prof["Saving Throws"]}<br>
              <b>Skills:</b>${prof.Skills}<br>

            </p>`;
            break;
          case "isarchetype":
            break;
          case "name":
            break;
          case "":
            break;

          default:
            sectionHTML+=`<h4 class="sourceTag classSectionTitle"  id="${key.replace(/\s/g,'')}Section">${key}</h4>
            <p class="classContent">
              ${elem[key].sectionText}
            </p>`;

          break;
        }




      });


      return sectionHTML;
    }

  }
}

const Races={
  search:()=>{

    //TODO
    raceFilter.textTags=$("#searchText").tagit("assignedTags");
    //moduleFilter.sourceTags=$("#sourceTags").tagit("assignedTags");





    Classes.createList();
  },
  createList:()=>{
    let raceKeys=Object.keys(raceList);
    let finalCollection="";
    let currentCollection="";
    let listingCount=0;

    //sort and filter

    raceKeys.sort(alphabetizeKeys);


    raceKeys=raceKeys.filter((elem)=>{
      return raceKeyFilter(elem);
    });


    while (raceKeys.length){
      let key=raceKeys.shift();

      if (listingCount==0){
        currentCollection=`<div class="resultCollection">
          <h3 class="collectionTag"></h3>
          <ul>`;
      }

      currentCollection+=`<li class="raceListing" data-race-id="${key}">${key}</li>`;

      if (listingCount==4 || raceKeys.length==0){

          currentCollection+=`</ul>
        </div>`;
        finalCollection+=currentCollection;
        listingCount=0;
      }else{
        listingCount++;
      }



    }

    $("#raceSelection").html(finalCollection);

    if (finalCollection.length==0){
      ci.fyiUser("No races to show, try loosening your search results!");
    }
    $(".raceListing").click(Races.displayRace);
    jumpTo("raceSelection");

    function alphabetizeKeys(a, b){
      return a.localeCompare(b);
    }

    function raceKeyFilter(elem){

      //let classTags;
      let genText="";

      elem=raceList[elem];

      // if (elem.IsSubrace.sectionText){
      //   return false;
      // }

      Object.keys(elem).forEach((key=>{
        genText+=key;
        genText+=elem[key].sectionText;
      }));
      genText=genText.toLowerCase();
      //classTags=elem.Tags.sectionText;
      //search filter

      for (let i=0, len=raceFilter.textTags.length; i<len; i++){

          if (!genText.includes(raceFilter.textTags[i].toLowerCase())){
            return false;
          }
      }








      return true;
    }
  },
  displayRace:(event)=>{


    let elem = raceList[event.target.getAttribute("data-race-id")];


    let displayText=`<hr>
    <h1>${elem.Name.sectionText}</h1>

    <hr>
      ${createSections(elem)}
      Subrace:<select onchange="Races.appendSubrace()" id="subraceSelect" title="Available Subraces" class="selectpicker"  data-actions-box=true >
                ${getSubraces(event.target.getAttribute("data-race-id"))}
              </select><br><br>
      <div id="subraceSection">


      </div>
    <hr>`;
    $("#raceDisplay").html(displayText);
    jumpTo("raceDisplay");
    $(".selectpicker").selectpicker();

    // function createNavBox(elem){
    //   let navList='';
    //   let keys=Object.keys(elem);
    //   keys.forEach((key)=>{
    //     if (key.toLowerCase()=="tags"){return;}
    //     else{
    //       navList+=`<li class="navEntry" onclick="jumpTo('${key.replace(/\s/g,'')}Section')">${key}</li>`;
    //     }
    //
    //   });
    //   return navList;
    // }

    function getSubraces(baseRace){
      let subraces=``;
      Object.keys(subraceList).forEach((key)=>{

        if (subraceList[key].BaseRace==baseRace){
          subraces+=`<option value="${key}">${subraceList[key].Name}</option>`;

        }
      });
      return subraces;
      //<option value="1d6">1d6</option>
      //<option value="1d8" >1d8</option>
      //<option value="1d10">1d10</option>
    //  <option value="1d12">1d12</option>
    }

    function createSections(elem){
      let sectionHTML='';
      let keys=Object.keys(elem);
      keys.forEach((key)=>{
        let prof;

        switch (key.toLowerCase()){

          case "tags":
            break;

          case "issubrace":
            break;
          case "name":
            break;
          case "":
            break;

          default:
            sectionHTML+=`<h4 class="sourceTag raceSectionTitle"  id="${key.replace(/\s/g,'')}Section">${key}</h4>
            <p class="raceContent">
              ${elem[key].sectionText}
            </p>`;

          break;
        }




      });


      return sectionHTML;
    }
  },
  appendSubrace:()=>{
    let subrace=subraceList[event.target.value];
    if (!subrace){
      ci.fyiUser("Uh oh, something went wrong when loading this subrace!");
      return;
    }else{
      $("#subraceSection").html(createSections(subrace));
    }


    function createSections(elem){
      let sectionHTML='';
      let keys=Object.keys(elem);
      sectionHTML+=`<h4 class="sourceTag raceSectionTitle"  id="${elem.Name.replace(/\s/g,'')}Section">${elem.Name}</h4>
      <p class="raceContent">
        ${elem.Flavor}<hr>
        <div style="white-space:pre-wrap;">
        ${elem.Benefit}
        </div>
      </p>`;
      // keys.forEach((key)=>{
      //   let prof;
      //
      //   switch (key.toLowerCase()){
      //
      //     case "baserace":
      //       break;
      //
      //     case "benefit":
      //       break;
      //     case "name":
      //       break;
      //     case "":
      //       break;
      //
      //     default:
      //     console.log(elem[key]);
      //
      //
      //     break;
      //   }
      //
      //
      //
      //
      // });


      return sectionHTML;
    }

  }
}

// function displayFeat(){
//   let feat = featList[this.getAttribute("data-feat-id")];
//   let displayText=`<hr>
//   <h1 id="featName">${feat.Name}</h1><br>
//   <div style="padding-left:5vw;">
//     <span id="featFlavor"><i>${feat.Flavor ? feat.Flavor:""}</i></span><br><br>
//     <span id="featPrereqs"><b>Prerequisites:</b> ${feat.Prereq ? feat.Prereq:"None"}</span><br><br>
//     <span id="featBenefit" style="white-space: pre-wrap;"><b>Benefit:</b>${feat.Benefit}</span><br><br>
//     <h3 class="sourceTag" style="background-color:grey;">Source:</h3>
//     <span id="featSourcing"><b>Author:</b> ${feat.Author ? feat.Author:"Unknown"}, <b>Collection:</b>${feat.Source ? feat.Source:"Unknown"}</span>
//   </div>
//   <hr>`;
//   $("#featDisplay").html(displayText);
//   jumpTo("featDisplay");
// }

function jumpTo(anchor){

    window.location.href = "#"+anchor;
}


function loadData(){
  $.getJSON( "src/model/testFeats.json", function( data ) {


    featList=data;
    Object.keys(featList).forEach((feat)=>{
      featList[feat]=stringNulls(featList[feat]);
    });

    //doneLoading();
  });

  $.getJSON( "src/model/baseSpells.json", function( data ) {

    spellList=data;
    //doneLoading();
  });
  $.getJSON( "src/model/baseItems.json", function( data ) {

    itemList=data;
    //doneLoading();
  });
  $.getJSON( "src/model/baseMonsters.json", function( data ) {

    creatureList=data;

    creatureList.forEach((creature)=>{
      if (!creatureFilter.loadedTypes.includes(creature.type)){
        creatureFilter.loadedTypes.push(creature.type);
        creatureFilter.type.push(creature.type);
      }
    });

    //doneLoading();
  });
  $.getJSON( "src/model/ruleModules.json", function( data ) {

    moduleList=data;

    Object.keys(moduleList).forEach((key)=>{
      let mod=moduleList[key];

      // mod.Tags.sectionText=JSON.parse(mod.Tags.sectionText);

      mod.Tags.sectionText.forEach((tag)=>{
        if (!moduleFilter.validTags.includes(tag)){
          moduleFilter.validTags.push(tag);
          }
      });
    });
    //doneLoading();
  });

  $.getJSON( "src/model/baseClasses.json", function( data ) {

    classList=data;
    delete classList[""];

    // Object.keys(moduleList).forEach((key)=>{
    //   let mod=moduleList[key];
    //
    //   // mod.Tags.sectionText=JSON.parse(mod.Tags.sectionText);
    //
    //   mod.Tags.sectionText.forEach((tag)=>{
    //     if (!moduleFilter.validTags.includes(tag)){
    //       moduleFilter.validTags.push(tag);
    //       }
    //   });
    // });
    //doneLoading();
  });

  $.getJSON( "src/model/baseRaces.json", function( data ) {

    raceList=data;
    delete raceList[""];


    // Object.keys(moduleList).forEach((key)=>{
    //   let mod=moduleList[key];
    //
    //   // mod.Tags.sectionText=JSON.parse(mod.Tags.sectionText);
    //
    //   mod.Tags.sectionText.forEach((tag)=>{
    //     if (!moduleFilter.validTags.includes(tag)){
    //       moduleFilter.validTags.push(tag);
    //       }
    //   });
    // });
    //doneLoading();
  });

  $.getJSON( "src/model/baseSubraces.json", function( data ) {

    subraceList=data;
    delete subraceList[""];


    // Object.keys(moduleList).forEach((key)=>{
    //   let mod=moduleList[key];
    //
    //   // mod.Tags.sectionText=JSON.parse(mod.Tags.sectionText);
    //
    //   mod.Tags.sectionText.forEach((tag)=>{
    //     if (!moduleFilter.validTags.includes(tag)){
    //       moduleFilter.validTags.push(tag);
    //       }
    //   });
    // });
    //doneLoading();
  });

}

function stringNulls(obj){

  Object.keys(obj).forEach((key)=>{

    if (obj[key]==null){

      obj[key]="";
    }
  });
  return obj;
}
