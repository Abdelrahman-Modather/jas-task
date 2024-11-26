var cartItems = [];
var allProducts = [];

var req = new XMLHttpRequest();
req.open('GET', 'https://dummyjson.com/products');
req.send();
req.onreadystatechange = function () {
    if (req.readyState == 4) {
        var user = JSON.parse(req.responseText);
        allProducts = user.products; 

        var searchContainer = document.createElement("div");
        var searchInput = document.createElement("input");
        var searchButton = document.createElement("button");
        
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search products...");
        searchInput.style.padding = "8px";
        searchInput.style.marginRight = "10px";
        searchButton.innerHTML = "<i class='fas fa-search'></i>";
        searchButton.style.padding = "8px 16px";
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        document.body.insertBefore(searchContainer, document.body.firstChild);
        searchButton.style.backgroundColor="blue"
        searchButton.style.color="white"
        searchInput.style.marginLeft="20px"
        searchInput.style.marginTop="10px"
        searchInput.style.width="500px"
        searchInput.style.borderColor="transparent"
        searchContainer.style.backgroundColor="#F3C623"
        searchContainer.style.padding="10px"

        var cartIconContainer = document.createElement("div");
        cartIconContainer.id = "cartIconContainer";
        cartIconContainer.style.position = "fixed";
        cartIconContainer.style.top = "10px";
        cartIconContainer.style.right = "10px";
        cartIconContainer.style.padding = "10px";
        cartIconContainer.style.backgroundColor = "#F3C623";
        cartIconContainer.style.borderRadius = "50%";
        cartIconContainer.style.cursor = "pointer";

        var cartIcon = document.createElement("i");
        cartIcon.className = "fas fa-shopping-cart";
        cartIcon.style.color = "white";
        cartIcon.style.fontSize = "24px";

        var cartCounter = document.createElement("span");
        cartCounter.id = "cartCounter";
        cartCounter.style.position = "absolute";
        cartCounter.style.top = "0";
        cartCounter.style.right = "0";
        cartCounter.style.backgroundColor = "red";
        cartCounter.style.color = "white";
        cartCounter.style.borderRadius = "50%";
        cartCounter.style.padding = "5px 10px";
        cartCounter.innerText = "0";

        cartIconContainer.appendChild(cartIcon);
        cartIconContainer.appendChild(cartCounter);
        document.body.appendChild(cartIconContainer);

        var container = document.createElement("div");
        container.id = "productsContainer";
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.justifyContent = "center";
        container.style.alignItems = "flex-start";
        document.body.appendChild(container);

        var cartListContainer = document.createElement("div");
        cartListContainer.id = "cartListContainer";
        cartListContainer.style.display = "none";
        cartListContainer.style.position = "fixed";
        cartListContainer.style.top = "50px";
        cartListContainer.style.right = "0";
        cartListContainer.style.width = "300px";
        cartListContainer.style.height = "100vh";
        cartListContainer.style.backgroundColor = "#f8f8f8";
        cartListContainer.style.padding = "20px";
        cartListContainer.style.overflowY = "scroll";
        cartListContainer.style.borderLeft = "2px solid #ddd";
        cartListContainer.style.borderRadius = "8px";
        cartListContainer.innerHTML = "<h2>Your Cart</h2><div id='cartItemsList'></div><div id='cartTotal'></div><button id='closeCartButton'>Close Cart</button>";
        document.body.appendChild(cartListContainer);

        displayProducts(allProducts);

        searchButton.addEventListener("click", function() {
            var searchTerm = searchInput.value.toLowerCase();
            var filteredProducts = allProducts.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });

        cartIconContainer.addEventListener("click", function() {
            cartListContainer.style.display = cartListContainer.style.display === "none" ? "block" : "none";
        });

        document.getElementById("closeCartButton").addEventListener("click", function() {
            cartListContainer.style.display = "none";
        });
    }
}

function getStars(rating) {
    var stars = '';
    var fullStars = Math.floor(rating);
    var halfStar = (rating % 1) >= 0.5 ? 1 : 0;
    var emptyStars = 5 - fullStars - halfStar;

    for (var i = 0; i < fullStars; i++) {
        stars += '⭐';
    }

    if (halfStar) {
        stars += '✩';
    }

    for (var i = 0; i < emptyStars; i++) {
        stars += '✩';
    }

    return stars;
}

function displayProducts(products) {
    var container = document.getElementById("productsContainer");
    container.innerHTML = "";
    products.forEach(product => getdata(product, container));
}

function getdata(data, container){
    var div = document.createElement("div");
    var img = document.createElement("img");
    var h1 = document.createElement("h1");
    var description = document.createElement("p");
    var price = document.createElement("p");
    var rating = document.createElement("p");
    var brand = document.createElement("p");
    var category = document.createElement("a");
    var discountPercentage = document.createElement("p");
    var button = document.createElement("button");
    var priceWdisccount = document.createElement("h2");

    h1.innerText = data.title;
    description.innerText = data.description;
    img.src = data.thumbnail;
    img.style.marginLeft = "40px";
    if(data.discountPercentage > 0){
        price.innerText = "Price $" + data.price;
        price.style.textDecoration = "line-through";
        priceWdisccount.innerText = "$"+ parseFloat((data.price - (data.price * data.discountPercentage / 100))).toFixed(2);
    }
    else{
        price.innerText = "Price $" + data.price;
        discountPercentage.style.color = "green";
    }
    price.innerText = "Price $" + data.price;
    rating.innerHTML = getStars(data.rating);
    rating.style.marginLeft = "10px";
    brand.innerText = data.brand;
    category.innerText = data.category;
    button.innerText = "Add to Cart";

    var priceRatingContainer = document.createElement("div");
    priceRatingContainer.style.display = "flex";
    priceRatingContainer.style.justifyContent = "space-between";
    priceRatingContainer.style.alignItems = "center";
    priceRatingContainer.style.width = "100%";
    priceWdisccount.style.marginTop = "-10px";

    priceRatingContainer.appendChild(price);
    priceRatingContainer.appendChild(rating);
    
    div.append(img, h1, description, priceRatingContainer, priceWdisccount, brand, category, discountPercentage, button);

    img.style.width = "300px";
    img.style.height = "300px";
    h1.style.height = "50px";
    h1.style.fontFamily = "'Lilita One', serif";
    description.style.height = "40px";
    div.style.backgroundColor = "#F4F6FF";
    div.style.width = "400px";
    div.style.height = "700px";
    div.style.margin = "10px";
    div.style.padding = "10px";
    div.style.position = "relative";
    div.style.display = "inline-block";
    div.style.overflow = "hidden";
    div.style.textAlign = "left";
    div.style.borderRadius = "10px";
    div.style.alignItems = "center";
    priceWdisccount.style.color = "blue";
    button.style.position = "relative";
    button.style.top = "60px";
    button.style.width = "100%";
    button.style.height = "30px";
    button.style.borderRadius = "20px";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.style.fontFamily = "'Lilita One', sans-serif";
    button.style.fontSize = "20px";
    div.style.padding = "20px";
    
    button.addEventListener("click", function() {
        cartItems.push(data);
        document.getElementById("cartCounter").innerText = cartItems.length;
        button.style.backgroundColor = "#666";
        button.innerText = "Added to Cart";
        button.disabled = true;
        
        var notification = document.createElement("div");
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.backgroundColor = "green";
        notification.style.color = "white";
        notification.style.padding = "10px";
        notification.style.borderRadius = "5px";
        notification.innerText = `${data.title} added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 2000);
        
        updateCartDisplay(); 
    });
    
    container.appendChild(div);
}

function updateCartDisplay() {
    var cartItemsList = document.getElementById("cartItemsList");
    var cartTotal = document.getElementById("cartTotal");
    cartItemsList.innerHTML = '';
    
    var total = 0;
    cartItems.forEach(item => {
        var itemDiv = document.createElement("div");
        itemDiv.style.padding = "10px";
        itemDiv.style.marginBottom = "10px";
        itemDiv.style.borderBottom = "1px solid #ddd";
        itemDiv.innerHTML = `${item.title} - $${item.price}`;
        cartItemsList.appendChild(itemDiv);
        total += item.price;
    });
    
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}
