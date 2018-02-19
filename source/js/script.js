/* MAIN JS FILE */

// Function to calculate price
function totalFn() {
  // get value from inputs
  var initPrice = Number(document.getElementById('job-price').value);
  var jobName = document.getElementById('job-name').value;

  var tax = initPrice * 0.07;
  var margin = initPrice * 0.11;
  var extraMargin = initPrice * 0.06;

  // MAIN calculation with basic decimal rounding
  var sumNoTaxNoExtra = Math.round((initPrice + margin)*100)/100;
  var sumNoTaxExtra = Math.round((initPrice + margin + extraMargin)*100)/100;
  var sumNoExtra = Math.round((initPrice + tax + margin)*100)/100;
  var sumAll = Math.round((initPrice + tax + margin + extraMargin)*100)/100;

  // get value of the checkboxes
  var taxChecked = document.getElementById("tax-free").checked;
  var extraChecked = document.getElementById("extra-margin").checked;

  // Conditions for calculation
  if (taxChecked && extraChecked) {
    console.log('sum no tax and extra');
    return sumNoTaxExtra;

  } else if (taxChecked) {
    console.log('tax free no extra');
    return sumNoTaxNoExtra;

  } else if (extraChecked) {
    console.log('extra');
    return sumAll;
  } else if (!taxChecked && !extraChecked) {
    console.log('tax + no extra');
    return sumNoExtra;

  } else {
    console.log('no condition');
  }

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


  // condition for item addition
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

    var price = totalFn();
    var p = document.createTextNode(price);
    itemPrice.appendChild(p);
  }
  // clear inputs after calculation
  document.getElementById('job-price').value = '';
  document.getElementById('job-name').value = '';
  getTotalPrice(); // run the getTotalPrice function
}

function getTotalPrice() {
  var items = document.getElementsByClassName("item-price");
  var itemCount = items.length;
  var total = 0;

  // loop through all items and save total amount to var total
  for (var i = 0; i < itemCount; i++) {
    total = total + parseInt(items[i].innerText);
  }
  document.getElementById('total-sum').value = total;
}

// run the addItem(), when the calculate btn is clicked
calcBtn.addEventListener('click', addItem);

