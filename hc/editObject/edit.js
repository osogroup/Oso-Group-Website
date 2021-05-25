$(document).ready(function(){
  outputHTML();
});
// get information from URL (objType, objItemID, objItemName, objItemDesc, and objItemTags) 
// ex. task, 0, COI: Design Wireframes, These tasks will result in a user interface to create an object item, and 0


// pull in data from objectList.JSON and configuration JSON file 
const configData = async () => {
  var listConfig = await fetch("../tempData/objectConfig.json").then(response=>{return response.json();});
  // console.log("configData output ", listConfig);
  return listConfig;
}
  
  // gets all the Objects/Arrays from listOfObjects.json and returns them
const tempData = async () => {
  var objVars = await fetch("../tempData/listOfObjects.json").then(response=>{return response.json();});
  // console.log("tempData output ", objVars);
  return objVars;
}

// function to create editObject HTML
const outputHTML = async () => {
  console.log("Entering outputHTML()");
  var data = await tempData();
  var config = await configData();
  var inputBoxes = '';


  // ------------------------------------------- Navigation Bar -------------------------------------------


  var headerHTML = '<div id="contacts">'
  + '<div class="row">'
    + '<p id="header">'
      + '<img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80">';
  
  // creating the links for the header
  for(const [headerKey, headerValue] of Object.entries(data)) {
    headerHTML += '<a class="headerLinks" href="../listObjects/?type='+headerKey+'">'+headerKey+'</a>';
  }
  
  // closing header row
  headerHTML += '</p>';

  // H1 header to let the user know which object they're editing
  headerHTML += '<h1>Edit '+objType+' Item</h1>'
            + '</div>';
  $('#HTMLoutput').append(headerHTML);


  // ------------------------------------------- Items Header -------------------------------------------


  // create the items header row
  var itemHeader = '<div class="row">';

                 for (const [headerKey, headerValue] of Object.entries(data[objType])) {
                   console.log("This is headerKey: ", headerKey);
                   console.log("This is headerValue: ", headerValue);
                   
                 }
      itemHeader += '<div class="col-1"><div class="col-12">ID</div></div>'
                    + '<div class="col-2"><div class="col-12">Name</div></div>'
                    + '<div class="col-2"><div class="col-12">Description</div></div>'
                    + '<div class="col-2"><div class="col-12">Status</div></div>'
                    + '<div class="col-2"><div class="col-12">Tags</div></div>'
                    + '<div class="col-2"><div class="col-12">Due Date</div></div>'
                    + '<div class="col-1"><div class="col-12">EstEff</div></div>'
                  + '</div>';  
  $('#HTMLoutput').append(itemHeader);


  // ------------------------------------------- Items Values -------------------------------------------
  
  
  // creating the item value row
  var itemFields = '<div class="row">'
 
                 // for (every item in the objType list) {
                   // if (the objItem is in the editable list) 
                   // {
                     // make it an input textbox
                   // }
                   // else
                   // {
                     // make it a regular div
                   // }
                 // }

                   // creating item area
                   + '<div class="col-1"><div class="col-12">'+objItemID+'</div></div>'

                   // creating item input boxes
                   + '<div class="col-2"><input class="col-12" type="textarea" placeholder="'+objItemName+'"></div>'
                   + '<div class="col-2"><input class="col-12" type="textarea" placeholder="'+objItemDesc+'"></div>'

                   // creating item area
                   + '<div class="col-2"><div class="col-12">'+objItemStatus+'</div></div>'

                   //  creating item input box
                   + '<div class="col-2"><input class="col-12" type="textarea" placeholder="'+objItemTags+'"></div>'

                   //  creating item areas
                   + '<div class="col-2"><div class="col-12">'+objItemDue+'</div></div>'
                   + '<div class="col-1"><div class="col-12">'+objItemEstEff+'</div></div>'

                 // closing item row
                 + '</div>';
  $('#HTMLoutput').append(itemFields);

  // making the Update Button
  var updateButton = '<div class="row">'
                    +  '<div class="col-11"></div>'
                    +  '<div class="col-1"><button>Update</button></div>'
                   + '</div>';
   $('#HTMLoutput').append(updateButton);


  // use objItemID (and the other ones) to get data out of the JSON file that create and fill in the input boxes











  console.log("Exiting outputHTML()");
}
