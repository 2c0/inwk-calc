// Create a "close" button and append it to each list item

var myNodelist = document.getElementsByTagName("li");
var close = document.getElementsByClassName("checkbox-btn");
var calcBtn = document.getElementById('calcBtn');

//var initPrice = document.getElementById('job-price').value;

function createCheckboxes() {

  var i;

  for (i = 0; i < myNodelist.length; i++) {
    var input = document.createElement("input");
    input.setAttribute('type', 'checkbox');
    input.className = "checkbox-btn";
    myNodelist[i].appendChild(input);
  }
}

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


// Function to calculate price
function totalFn() {
  var initPrice = Number(document.getElementById('job-price').value);
  var jobName = document.getElementById('job-name').value;

  var tax = initPrice * 0.07;
  var margin = initPrice * 0.11;
  var extraMargin = initPrice * 0.05;

  //var sum = Math.round(initPrice + margin + extraMargin, 2);
  var sumNoTaxNoExtra = Math.round(initPrice + margin, 2);
  var sumNoExtra = Math.round(initPrice + tax + margin, 2);
  var sumAll = Math.round(initPrice + tax + margin + extraMargin, 2);


  console.log(jobName + " " + sumNoTaxNoExtra);
  console.log(jobName + " " + sumNoExtra);
  console.log(jobName + " " + sumAll);

}

// Create a new list item when clicking on the "Calc" button
function addItem() {
  
  //get initial value
  var initPrice = Number(document.getElementById('job-price').value);
  var jobName = document.getElementById('job-name').value;

  //creating dynamic content
  var itemWrap = document.createElement("div");
  itemWrap.className = 'item-wrap';
  var itemName = document.createElement("div");
  itemName.className = 'item-name';
  var itemPrice = document.createElement("div");
  itemPrice.className = 'item-price';

 

  // condition for calculation
  if (initPrice === 0 && jobName === "") {
    alert("You must fill in something!");
  } else if (initPrice === 0) {
    alert("You must fill in price");
  } else if (jobName === "") {
    alert("You must fill in name");
  } else {
    var itemCont = document.getElementById("item-container");
    itemCont.appendChild(itemWrap);
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemPrice);
    var t = document.createTextNode(jobName);
    itemName.appendChild(t);
    var p = document.createTextNode(initPrice);
    itemPrice.appendChild(p);
  }
  document.getElementById('job-price').value = '';
  document.getElementById('job-name').value = '';
}

/* function getItems() {
  var items = document.getElementsByClassName("item-price");
  var itemCount = items.length;
  var total = 0;
  for (var i = 0; i < itemCount; i++) {
    total = total + parseInt(items[i].innerText);
  }
  document.getElementById('tot').value = total;
} */


calcBtn.addEventListener('click', addItem);
//etItems();

