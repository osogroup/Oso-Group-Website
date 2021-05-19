$(document).ready(function(){

  var options = {
    valueNames: [ 'id', 'name', 'desc', 'status', 'tags', 'due', 'est' ]
  };

  var contactList = new List('contacts', options);

  var idField = $('#id-field'),
    nameField = $('#name-field'),
    descField = $('#desc-field'),
    statusField = $('#status-field'),
    tagsField = $('#tags-field'),
    dueField = $('#due-field'),
    estField = $('#est-field'),


    addBtn = $('#add-btn'),
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn');

    refreshCallbacks(contactList);

  addBtn.click(function() {
    contactList.add({
      id: Math.floor(Math.random()*110000),
      name: nameField.val(),
      desc: descField.val(),
      status: statusField.val(),
      tags: tagsField.val(),
      due: dueField.val(),
      est: estField.val()
    });
    clearFields();
    refreshCallbacks();
  });


// editBtn.click(function() {
//   var item = contactList.get('id', idField.val())[0];
//   item.values({
//     id:idField.val(),
//     name: nameField.val(),
//     city: cityField.val(),
//     problem: problemField.val(),
//     solution: solutionField.val()
//   });
//   clearFields();
//   editBtn.hide();
//   addBtn.show();
// });

  function refreshCallbacks(contactList) {
    var idField = $('#id-field'),
      nameField = $('#name-field'),
      descField = $('#desc-field'),
      statusField = $('#status-field'),
      tagsField = $('#tags-field'),
      dueField = $('#due-field'),
      estField = $('#est-field'),
      addBtn = $('#add-btn'),
      editBtn = $('#edit-btn').hide(),
      removeBtns = $('.remove-item-btn'),
      editBtns = $('.edit-item-btn');
    // Needed to add new buttons to jQuery-extended object
    removeBtns = $('.remove-item-btn');
    editBtns = $(editBtns.selector);

    removeBtns.click(function() {
      console.log("Entering remove function", this);
      var itemId = $(this).parent().parent().find('.id').text();
      console.log($(this).parent().parent().find('.id'));
      console.log("this is the item id " + itemId);
      contactList.remove('id', itemId);
    });

    editBtns.click(function() {
      var itemId = $(this).closest('tr').find('.id').text();
      var itemValues = contactList.get('id', itemId)[0].values();
      idField.val(itemValues.id);
      nameField.val(itemValues.name);
      descField.val(itemValues.desc);
      statusField.val(itemValues.status);
      tagsField.val(itemValues.tags);
      dueField.val(itemValues.due);
      estField.val(itemValues.est);

      editBtn.show();
      addBtn.hide();
    });
  }

  function clearFields() {
    idField.val('');
    nameField.val('');
    descField.val('');
    statusField.val('');
    tagsField.val('');
    dueField.val('');
    estField.val('');

  }

createHTML();

});



var type = 'x'; // This one is the Tag/Task/Deliverable, it will temporarily be X
var col = 1;  // This one is the amount of columns for the table header thing, it will temporarily be 1

const getData = async () => {
  var objVars = await fetch("../tempData/listOfObjects.json").then(response=>{return response.json();});
  console.log(objVars);
  return objVars;
}

const createHTML = async () => {
  var data = await getData();
  // var listHTML = '<div id="contacts" class="container>';
  //   listHTML +=  '<div class="row">';
  //   listHTML +=  '<div class="col-12">';
  //   listHTML +=  '<p id="header"><img src="https://brandmark.io/logo-rank/random/pepsi.png" alt="LogoImage" width="80px">'
  //   + '<a class="headerLinks" href="#">Tag</a>'
  //   + '<a class="headerLinks" href="#">Task</a>'
  //   + '<a class="headerLinks" href="#">Deliverable</a>'
  //   + '</p></div>';
    var listHTML =  '<div class="col-12" id="TitleOfList">OAS Object List</div>';
    listHTML +=  '</div><div class="row" id="hacker-list"><div class="col-12">';

    //------------------------------------------------------- Input Boxes ------------------------------------------------------------------

    // '<div class="row">'
    // + '<div class="col-1"><span class="id"></span></div>'
    // + '<div class="col-2"><span class="name"></span></div>'
    // + '<div class="col-2"><span class="desc"></span></div>'
    // + '<div class="col-2"><span class="status"></span></div>'
    // + '<div class="col-1"><span class="tags"></span></div>'
    // + '<div class="col-2"><span class="due"></span></div>'
    // + '<div class="col-1"><span class="est"></span></div>'
    // + '<div class=col-1><button class="remove-item-btn"> - </button></div>'
    // + '</div>'

    for (const [key, val] of Object.entries(data)) {
      var top = '<h1>'+key+'</h1>';
      $('#forLoop').append(top);
      for (const [kee, value] of Object.entries(val)) {
        var nameDesc = '<div class="row">'
            + '<div class="col-1">'+value.id+'</div>'
            + '<div class="col-2">'+value.name+'</div>'
            + '<div class="col-2">'+value.description+'</div>'
            + '<div class="col-2">'+value.status+'</div>'
            + '<div class="col-1">'+value.tags+'</div>'
            + '<div class="col-2">'+value.dueDate+'</div>'
            + '<div class="col-1">'+value.estEff+'</div>'
            + '<div class=col-1><button class="remove-item-btn"> - </button></div>'
            + '</div>';
            console.log(kee);
        $('#forLoop').append(nameDesc);
      }
    }



    // for (const [major, minor] of Object.entries(data)) {
    //   for (const [maj, min] of Object.entries(minor)) {
    //     for (const [first, last] of Object.entries(min)) {
    //       listHTML += '<div class="col-3">'
    //       + '<input type="text" id="'+first+'-field" placeholder="'+first+'" />'
    //       + '</div>';
    //
    //     }
    //   }
    // }

    listHTML +=  '<div class=col-1">'
    + '<button id="add-btn">Add</button>'
    + '<button id="edit-btn">Edit</button>'
    + '</div>'
    + '</div>';

    // ----------------------------------------------------- The Search Box ----------------------------------------------------------------

    listHTML += '<div class="col-12"><div class="col-4"><input class="search" placeholder="Search"/></div></div>';
    listHTML += '<div class="col-12">';

    //---------------------------------------------------- The Table's Headers -------------------------------------------------------------

    for (const [key, value] of Object.entries(data)) {
      console.log(value);
      for (const [first, last] of Object.entries(value)) {
        listHTML += '<div class="col-'+col+'"><span class="sort" data-sort="'+first+'">'+first+'</span></div>';

      }
    }
    listHTML += '</div>';
    $('#contacts').append(listHTML);
}


// This variable is stacking up all the stuff that will go into the HTML and show all the tempData
// from the JSON file in GitHub




















//
