var cartItems = [];
var allProducts = [];

var req = new XMLHttpRequest();
req.open('GET', 'https://dummyjson.com/products');
req.send();
req.onreadystatechange = function () {
    if (req.readyState == 4) {
        var user = JSON.parse(req.responseText);
        allProducts = user.products;

        // Header Section
        var header = document.createElement("header");
        header.style.backgroundColor = "#F3C623";
        header.style.padding = "10px";
        header.style.display = "flex";
        header.style.border = "2px solid #10375C";
        header.style.alignItems = "center";
        header.style.justifyContent = "space-between";
        header.style.borderRadius = "20px";

        // Search Bar
        var searchForm = document.createElement("form");
        searchForm.style.display = "flex";
        searchForm.style.alignItems = "center";

        var searchInput = document.createElement("input");
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search products...");
        searchInput.setAttribute("aria-label", "Search products");
        searchInput.style.padding = "8px";
        searchInput.style.marginRight = "10px";
        searchInput.style.width = "500px";
        searchInput.style.borderColor = "#10375C";
        searchInput.style.borderRadius = "5px";

        var searchButton = document.createElement("button");
        searchButton.setAttribute("type", "button");
        searchButton.setAttribute("aria-label", "Search");
        searchButton.innerText = "Search";
        searchButton.style.padding = "8px 16px";
        searchButton.style.backgroundColor = "#10375C";
        searchButton.style.color = "white";
        searchButton.style.border = "none";
        searchButton.style.borderRadius = "5px";
        searchButton.style.cursor = "pointer";

        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);

        header.appendChild(searchForm);

        // Cart Icon
        var cartIconContainer = document.createElement("div");
        cartIconContainer.id = "cartIconContainer";
        cartIconContainer.setAttribute("role", "button");
        cartIconContainer.setAttribute("aria-label", "Cart");
        cartIconContainer.style.position = "relative";
        cartIconContainer.style.display = "inline-flex";
        cartIconContainer.style.padding = "10px";
        cartIconContainer.style.backgroundColor = "#F3C623";
        cartIconContainer.style.borderRadius = "50%";
        cartIconContainer.style.cursor = "pointer";

        var cartIcon = document.createElement("i");
        cartIcon.className = "fas fa-shopping-cart";
        cartIcon.style.color = "#10375C";
        cartIcon.style.fontSize = "24px";

        var cartCounter = document.createElement("span");
        cartCounter.id = "cartCounter";
        cartCounter.style.position = "absolute";
        cartCounter.style.top = "0";
        cartCounter.style.right = "0";
        cartCounter.style.backgroundColor = "#EB8317";
        cartCounter.style.color = "white";
        cartCounter.style.borderRadius = "50%";
        cartCounter.style.padding = "5px 10px";
        cartCounter.style.fontSize = "12px";
        cartCounter.style.fontWeight = "bold";
        cartCounter.innerText = "0";

        cartIconContainer.appendChild(cartIcon);
        cartIconContainer.appendChild(cartCounter);

        header.appendChild(cartIconContainer);
        document.body.insertBefore(header, document.body.firstChild);

        // Main Content Section
        var main = document.createElement("main");
        main.id = "productsContainer";
        main.style.display = "flex";
        main.style.flexWrap = "wrap";
        main.style.justifyContent = "center";
        main.style.alignItems = "flex-start";
        document.body.appendChild(main);

        // Cart Sidebar
        var aside = document.createElement("aside");
        aside.id = "cartListContainer";
        aside.setAttribute("aria-label", "Cart Sidebar");
        aside.style.display = "none";
        aside.style.position = "fixed";
        aside.style.top = "50px";
        aside.style.right = "0";
        aside.style.width = "300px";
        aside.style.height = "100vh";
        aside.style.backgroundColor = "#F4F6FF";
        aside.style.padding = "20px";
        aside.style.overflowY = "scroll";
        aside.style.borderLeft = `2px solid #10375C`;
        aside.style.borderRadius = "8px";

        var cartHeader = document.createElement("h2");
        cartHeader.innerText = "Your Cart";
        cartHeader.style.color = "#10375C";

        var cartItemsList = document.createElement("ul");
        cartItemsList.id = "cartItemsList";
        cartItemsList.setAttribute("aria-label", "Cart Items");

        var cartTotal = document.createElement("div");
        cartTotal.id = "cartTotal";
        cartTotal.style.marginTop = "10px";
        cartTotal.style.color = "#10375C";

        var closeCartButton = document.createElement("button");
        closeCartButton.id = "closeCartButton";
        closeCartButton.innerText = "Close Cart";
        closeCartButton.style.marginTop = "10px";
        closeCartButton.style.padding = "10px";
        closeCartButton.style.borderRadius = "5px";
        closeCartButton.style.border = "none";
        closeCartButton.style.backgroundColor = "#EB8317";
        closeCartButton.style.color = "white";
        closeCartButton.style.cursor = "pointer";

        aside.appendChild(cartHeader);
        aside.appendChild(cartItemsList);
        aside.appendChild(cartTotal);
        aside.appendChild(closeCartButton);
        document.body.appendChild(aside);

        displayProducts(allProducts);

        searchButton.addEventListener("click", function () {
            var searchTerm = searchInput.value.toLowerCase();
            var filteredProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });

        cartIconContainer.addEventListener("click", function () {
            aside.style.display = aside.style.display === "none" ? "block" : "none";
        });

        closeCartButton.addEventListener("click", function () {
            aside.style.display = "none";
        });
    }
};

function displayProducts(products) {
    var container = document.getElementById("productsContainer");
    container.innerHTML = "";
    products.forEach(product => getdata(product, container));
}

function getdata(data, container) {
    var article = document.createElement("article");
    article.style.backgroundColor = "#F4F6FF";
    article.style.width = "400px";
    article.style.margin = "10px";
    article.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    article.style.padding = "20px";
    article.style.borderRadius = "10px";

    var img = document.createElement("img");
    img.src = data.thumbnail;
    img.alt = data.title;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "8px";

    var title = document.createElement("h3");
    title.innerText = data.title;
    title.style.fontFamily = "'Lilita One', serif";
    title.style.color = "#10375C";

    var description = document.createElement("p");
    description.innerText = data.description;
    description.style.color = "#10375C";

    var price = document.createElement("p");
    price.innerText = `Price: $${data.price}`;
    price.style.textDecoration = data.discountPercentage > 0 ? "line-through" : "none";
    price.style.color = "#10375C";

    var priceWithDiscount = document.createElement("p");
    if (data.discountPercentage > 0) {
        priceWithDiscount.innerText = `Discounted: $${(data.price - (data.price * data.discountPercentage / 100)).toFixed(2)}`;
        priceWithDiscount.style.color = "#EB8317";
    }

    var rating = document.createElement("p");
    rating.innerHTML = `Rating: ${getStars(data.rating)}`;
    rating.style.color = "#10375C";

    var button = document.createElement("button");
    button.innerText = "Add to Cart";
    button.style.padding = "10px";
    button.style.backgroundColor = "#EB8317";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    button.addEventListener("click", function () {
        cartItems.push(data);
        document.getElementById("cartCounter").innerText = cartItems.length;
        button.style.backgroundColor = "#666";
        button.innerText = "Added to Cart";
        button.disabled = true;

        var notification = document.createElement("div");
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.backgroundColor = "#EB8317";
        notification.style.color = "white";
        notification.style.padding = "10px";
        notification.style.borderRadius = "5px";
        notification.innerText = `${data.title} added to cart!`;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 2000);

        updateCartDisplay();
    });

    article.append(img, title, description, price, priceWithDiscount, rating, button);
    container.appendChild(article);
}

function getStars(rating) {
    var stars = "";
    var fullStars = Math.floor(rating);
    var halfStar = rating % 1 >= 0.5 ? 1 : 0;
    var emptyStars = 5 - fullStars - halfStar;

    for (var i = 0; i < fullStars; i++) stars += "⭐";
    if (halfStar) stars += "✩";
    for (var i = 0; i < emptyStars; i++) stars += "✩";

    return stars;
}

function updateCartDisplay() {
    var cartItemsList = document.getElementById("cartItemsList");
    var cartTotal = document.getElementById("cartTotal");
    cartItemsList.innerHTML = "";

    var total = 0;
    cartItems.forEach(item => {
        var li = document.createElement("li");
        li.style.padding = "5px 0";
        li.innerText = `${item.title} - $${item.price}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}
