;(function(window){
   
    var CoffeeOrder = function(el, data) {
        var self = this;
        self.data = data.data;
        self.ingredientsList = [];
        const menuList = document.getElementById('menu-items');
        const totalCosts = document.getElementById('total-cost');
        
        self.data.forEach(function(item) {
            self.ingredientsList.push(item);
            self.ingredientsItems = new Ingredients(item.ingredients);
            self.price = new Price(item.ingredients);
            buildMenuItem(self, item, menuList);
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

	var coffeeOrder = (function(e){
		var counter = 0;
		return function (e){			
			counter++;
		}
	})();

	
    window.CoffeeOrder = CoffeeOrder;
    
})(window);