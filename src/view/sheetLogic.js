
sheetProj.view.sheetLogic = {
  setupUserInterface: function () {

    $("#searchTags").tagit({caseSensitive:false});
    loadData();
  }
};


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
    createFeatList();
  });
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
