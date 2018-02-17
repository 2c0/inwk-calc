// Create a "close" button and append it to each list item

var myNodelist = document.getElementsByTagName("li");
var close = document.getElementsByClassName("checkbox-btn");
var addBtn = document.getElementById('addBtn');

function createCheckboxes() {

  var i;

  for (i = 0; i < myNodelist.length; i++) {
    var input = document.createElement("input");
    input.setAttribute('type', 'checkbox');
    input.className = "checkbox-btn";
    myNodelist[i].appendChild(input);
  }
}

createCheckboxes();

// Click on a close button to hide the current list 

for (var i = 0; i < close.length; i++) {
  close[i].addEventListener('click', function () {
    var div = this.parentElement;
    setTimeout(function () {

      //div.style.display = "none";
      div.remove();
      console.log('test');

    }, 500);
  });
}


// Create a new list item when clicking on the "Add" button
function newElement() {

    //adding list item
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
      var input = document.createElement("input");
      input.setAttribute('type', 'checkbox');
      input.className = "checkbox-btn";
      li.appendChild(input);
    }
    document.getElementById("myInput").value = "";


  console.log('btn works');

}

addBtn.addEventListener('click', newElement);

