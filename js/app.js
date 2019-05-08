;(function(window){
   
    var CoffeeOrder = function(el, data) {
        var self = this;
        self.data = data.data;
        self.ingredientsList = [];
        const menuList = document.getElementById('menu-items');
        const totalCosts = document.getElementById('total-cost');

        let priceDetailsObject = {};

        self.data.forEach(function(item) {
            self.ingredientsList.push(item);
            self.ingredientsItems = new Ingredients(item.ingredients);
            self.price = new Price(item.ingredients);
            buildMenuItem(self, item, menuList);
            priceDetailsObject[item.itemName] = item.itemCost; 
            formPriceArray(item.ingredients, priceDetailsObject);
        });

        console.log("priceDetailsObject::",priceDetailsObject);
        const buttonElem =  document.getElementById('processButton');     
        buttonElem.onclick = processInputAndCalcualteCost.bind(this, priceDetailsObject);

    }

    function formPriceArray(objectArray, priceDetailsObject) {
        objectArray.forEach(function(element){
            priceDetailsObject['-'+element.ingredientName] = element.ingredientCost;
        });
    }


    var Price  = function(data) {
        this.data = data;
        this.calculatePrice = function(selectedPrice) {
            console.log("Selected Price:", selectedPrice);
        }
    }

    var Ingredients = function(data) {
        this.data = data;
        this.loadData = function(ingredientsItems) {
            let totalCost = 0;
            let costElem = document.getElementById('calcuated-cost');
            let ingredientsElem = document.getElementById('ingredients');
            ingredientsElem.innerText="";
            
            ingredientsItems.forEach(function(item) {
                const span = document.createElement('span');
                span.setAttribute('class', 'badge badge-primary badge-pill price');
                span.textContent = item.ingredientCost+"$";

                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', "checkbox");
                checkbox.setAttribute('class', "form-check-input checkbox-class checkmark");
                checkbox.setAttribute('id', item.ingredientName);
                checkbox.setAttribute('data-price', item.ingredientCost);
                checkbox.setAttribute('checked', "checked");
                checkbox.onchange = calculatePrice.bind(this, item.ingredientCost);

                const button = document.createElement('button');
                button.textContent = item.ingredientName;
                button.append(checkbox)
                button.append(span)
                ingredientsElem.append(button)
                totalCost += parseInt(item.ingredientCost);
            });
            costElem.innerHTML = totalCost;
       }
    }

    function buildMenuItem(self, menuItem, menuList){  
        console.log("selfs",self);      
        const span = document.createElement('span');
        const ingredients = document.getElementById('ingredients');
        span.setAttribute('class', 'badge badge-primary badge-pill price');
        span.textContent = menuItem.itemCost+"$";
        const button = document.createElement('button');
        button.textContent = menuItem.itemName;
        button.onclick = self.ingredientsItems.loadData.bind(self, menuItem.ingredients);   
        button.append(span);
        menuList.append(button);        
    }

    var coffeeOrder = (function(e){
		var counter = 0;
		return function (e){			
			counter++;
		}
	})();

    function calculatePrice(elemValue, e) {
        let calcuatedVal = 0;
        let costElem = document.getElementById('calcuated-cost');        
        if(e.target.checked) {
            calcuatedVal  = parseInt(costElem.innerText) + parseInt(elemValue);
        } else {
            calcuatedVal  = parseInt(costElem.innerText) - parseInt(elemValue);
        }   
        if( calcuatedVal > 0){
            document.getElementById("order-button").disabled = false;
        } else {
            document.getElementById("order-button").disabled = true;
        }
        costElem.innerHTML = calcuatedVal;
    }



    function processInputAndCalcualteCost(priceDetailsObject) {
        let output = "Default Test";
        console.log("priceDetailsObject:",priceDetailsObject);

        let inputString = document.getElementById('inputString').value;

        if(!inputString) {
            return;
        }
       
        let outputElement = document.getElementById('output-content'); 
        
        let itemPrice = 0;
        let excludedPrice = 0;

        let elements = inputString.split(",");
        elements.forEach(function(value, index){
            value = value.toUpperCase().trim();
            console.log("value:",value);
            if(index === 0) {                
                if(value.indexOf("-") !== -1  || !priceDetailsObject[value]) {
                    output = "Selected Item ["+value+"] is Invalid.";
                    return;
                } else {
                    itemPrice = parseInt(priceDetailsObject[value]); 
                }
                
            } else {

                if(value.indexOf("-") === -1 || !priceDetailsObject[value]) {
                    output = "Selected Ingrediants ["+value+"] is Invalid.";
                    return;
                } else {
                    excludedPrice += parseInt(priceDetailsObject[value]); 
                }
            }

        })

        if(!output) {
            output = "Total PRICE to be PAID is:"+(itemPrice-excludedPrice)+"$";
        }
        
        outputElement.innerHTML = output;
    }


	

	
    window.CoffeeOrder = CoffeeOrder;
    
})(window);