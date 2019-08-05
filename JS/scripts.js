
$(document).ready(function(){

  var Shopping_Basket =[];
  var CostTotal = 0.00;


  $('.ImageSlider').bxSlider({
    mode: 'fade', // try 'horizontal', 'vertical', 'fade'
    captions: true,
    //auto: true,
    //slideWidth: 500
  })

  $(".Logo").click(function(e){
    e.preventDefault();
    location.href ="index.html";
  });

  $("#Menu").click(function(e){
    if ($(this).text() === "menu" ) {
      $(this).text("close");
      $(this).css("color", "red");
      $(".DropDown").show();
    }else{
      $(".DropDown").hide();
      $(this).css("color", "white");
      $(this).text("menu");
    }
  });
  $("#Home").click(function(e){
    location.href = "index.html";
  });
  $("#ff").click(function(e){
    location.href = "FinalFantasy.html";
  });
  $("#DQ").click(function(e){
    location.href = "DragonQuest.html";
  });
  $("#Shop").click(function(e){
    location.href = "Shop.html";
  });
  $("#DEMO").click(function(e){
    location.href = "DEMO.html";
  });

  $("#Buy1").click(function(e){
    UpdateBasket("Final Fantasy XIV Shadowbringers - £29.99");

  });

  $("#Buy2").click(function(e){
  UpdateBasket("Final Fantasy XII - Zodiac Age - £11.08");

  });

  $("#Buy3").click(function(e){
    UpdateBasket("Worlds of Final Fantasy Ultima - £15.99");

  });

  $("#Buy4").click(function(e){
    UpdateBasket("Dragon Quest Heroes 2 - £39.99");

  });
  $("#Buy5").click(function(e){
    UpdateBasket("Dragon Quest Builders 2 - £19.99");

  });
  $("#Buy6").click(function(e){
    UpdateBasket("Dragon Quest XI: Echoes of an Elusive Age - £39.99");

  });

  $(".Delete").click(function(e){
    ClearBasket();
  });

   $("Shop.html").ready(function(){
    if(localStorage.getItem("Basket")!=null){
     var StoredItems = localStorage.getItem("Basket");
     Shopping_Basket= JSON.parse(StoredItems);
     for (var i = 0; i <Shopping_Basket.length; i++) {
       AddToShop(Shopping_Basket[i]);
     }
   }
 });

     $(document).on('click', '.Remove', function(){
       var parentElement = $(this).parent().clone();
       var RemovedItem = parentElement.children('button').remove();
       var NewTexts
       var sometext = parentElement.text();
       if(sometext.includes("Final Fantasy XIV Shadowbringers - £29.99")){
         NewTexts = "Final Fantasy XIV Shadowbringers - £29.99";
       }else if (sometext.includes("Final Fantasy XII - Zodiac Age - £11.08")){
         NewTexts = "Final Fantasy XII - Zodiac Age - £11.08";
       }else if (sometext.includes("Worlds of Final Fantasy Ultima - £15.99")){
         NewTexts = "Worlds of Final Fantasy Ultima - £15.99";

       }else if (sometext.includes("Dragon Quest Heroes 2 - £39.99")){
         NewTexts = "Dragon Quest Heroes 2 - £39.99";

       }else if (sometext.includes("Dragon Quest Builders 2 - £19.99")){
         NewTexts = "Dragon Quest Builders 2 - £19.99";

       }else if (sometext.includes("Dragon Quest XI: Echoes of an Elusive Age - £39.99")){
         NewTexts = "Dragon Quest XI: Echoes of an Elusive Age - £39.99";

       }
       $(this).parent().remove();
       UpdateCost(NewTexts,false)
       RemoveFromBasket(NewTexts);
       DisplayPrice();


});

  function UpdateBasket(Data){
    Shopping_Basket.push(Data);
    localStorage.setItem("Basket",JSON.stringify(Shopping_Basket));
    AddToShop(Data);
  }

  function RemoveFromBasket(Item){
    for (var i = 0; i < Shopping_Basket.length; i++) {
     if(Shopping_Basket[i] === Item){
       Shopping_Basket.splice(i,1);
     }
    }
    var UpdatedBasket = Shopping_Basket;
    localStorage.removeItem("Basket");
    if(UpdatedBasket.length != 0){
      localStorage.setItem("Basket",JSON.stringify(UpdatedBasket));
      }
  }


  function ClearBasket(){
    Shopping_Basket = [""];
    CostTotal = 0.00;
    localStorage.removeItem("Basket");
    var Basket = document.getElementsByClassName('Basket')[0];
    while (Basket.firstChild) {
    Basket.removeChild(Basket.firstChild);
    }
    DisplayPrice();
  };

  function AddToShop(Item){
    var BasketLayout =`
    <div class = "Internal">
      ${Item}
      <button class = "Remove">Remove From Cart</button>
    </div>
    `;
    var BasketItem = document.createElement('div');
    BasketItem.innerHTML = BasketLayout;
    var Basket = document.getElementsByClassName('Basket')[0];
    Basket.append(BasketItem);
    UpdateCost(Item,true);
    DisplayPrice();
  }

  function UpdateCost(Item,state){
    var itemCost = 0.00;
    switch (Item) {
      case  "Final Fantasy XIV Shadowbringers - £29.99":
          itemCost = 29.99;
        break;
      case  "Final Fantasy XII - Zodiac Age - £11.08":
            itemCost = 11.08;
        break;
      case  "Worlds of Final Fantasy Ultima - £15.99":
              itemCost = 15.99;
        break;
      case  "Dragon Quest Heroes 2 - £39.99":
                itemCost = 39.99;
        break;
      case  "Dragon Quest Builders 2 - £19.99":
                  itemCost = 19.99;
        break;
      case  "Dragon Quest XI: Echoes of an Elusive Age - £39.99":
                  itemCost = 39.99
        break;
    }
    if(state === true){
      CostTotal = (CostTotal + itemCost);
    }else if(state === false){
      CostTotal = (CostTotal - itemCost);
    }
  }

  function DisplayPrice(){
    var Output = document.createElement('div');
    Output.innerText = "Total Price : £"+ (parseFloat(CostTotal)).toFixed(2);
    var PriceOut = document.getElementsByClassName('Price')[0];
    while (PriceOut.firstChild) {
      PriceOut.removeChild(PriceOut.firstChild);
    }
    PriceOut.append(Output);
  }

  // leave alone
});
