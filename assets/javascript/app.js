// Initialize Firebase
var config = {
  apiKey: "AIzaSyBkv6FmC-BKlN-pOt5T4yTjX5dzb45rqc0",
  authDomain: "groupfb120817.firebaseapp.com",
  databaseURL: "https://groupfb120817.firebaseio.com",
  projectId: "groupfb120817",
  storageBucket: "groupfb120817.appspot.com",
  messagingSenderId: "284215947796"
};
firebase.initializeApp(config);

// Ebay API and AJAX items
$("#item-search").on("click", function (event) {

  event.preventDefault();

  $("#ebay").empty();

  var appKey = "DrewZele-priceche-PRD-c5d8a3c47-8e4e1b10";
  var item = $("#enter-product").val().trim();
  var queryURL = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=" + appKey +"&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + item + "&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0"

  console.log(queryURL);
  $.ajax({
    dataType: "jsonp",
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    console.log(response);

    var ebayItem = response.findItemsByKeywordsResponse[0].searchResult[0]

    for (i = 0; i < 9; i++) {

    $("#ebay").append("<h4>" + ebayItem.item[i].title["0"] + "</h4>");
    $("#ebay").append("<img src = " + ebayItem.item[i].galleryURL["0"] + " class='img-thumbnail'>");
    $("#ebay").append("<p> $" + ebayItem.item[i].sellingStatus["0"].currentPrice["0"].__value__ + "</p>");
    $("#ebay").append("<p><a href = " + ebayItem.item[i].viewItemURL["0"] + ">Click here for eBay page</a></p><br>")
    }
    
  }).catch(function (error) {
    console.log("status", error.status);
    console.log(error);
  });
  
})


// Walmart Ajax Call

 
$("#item-search").on("click", function(event) {
  
  $("#walmart").empty();

  event.preventDefault();
  
  var Key = "m293p2wqduce6kc3xusuz4ug";
  var product = $("#enter-product").val().trim();
  queryURL= "https://api.walmartlabs.com/v1/search?apiKey=" + Key + "&query=" + product;
  
  $.ajax({
    url: queryURL,
    method: "GET",
    // contentType: 'text/plain',
    // xhrFields: {withCredentials: false},
    dataType: "jsonp",
    // Headers: {'Access-Control-Allow-Origin': '*'}
}).done(function(res){
  console.log(res);

  for (i = 0; i < res.items.length; i++) {
    
    var newDiv = $("<div>");
    newDiv.html("<h4>" + res.items[i].name + "</h4>");
    newDiv.append("<a href = " + res.items[i].productUrl + " target='_blank'><img src = " + res.items[i].imageEntities["0"].mediumImage + " class='img-thumbnail'></a>");
    newDiv.append("<p>$" + res.items[i].salePrice + "</p>");
    newDiv.append("<a class='button' href = " + res.items[i].addToCartUrl + " target='_blank'>Add To Cart</a>");
    $("#walmart").append(newDiv);

  };
  
  
});
});



// 