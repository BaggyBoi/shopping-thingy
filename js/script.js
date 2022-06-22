let productsArray = []
if (localStorage.getItem("productArr") != null) {
    productsArray = JSON.parse(localStorage.getItem("productArr"))
}
let fruitNames = ["Apple", "Banana", "Strawberry", "Tomato", "Pears", "Grape"]
let vegetableNames = ["Cucumber", "Corn", "Cabbages", "Carrot", "Potato", "Beet"]
let types = ["fruit", "vegetable"]
if (productsArray.length == 0) {
    for (let i = 0; i < 20; i++) {
        let rNT = Math.trunc(Math.random() * types.length);
        let uname = ""
        let rN = 0
        if (rNT == 0) {
            rN = Math.trunc(Math.random() * fruitNames.length);
            uname = `${fruitNames[rN]}`
        }
        else{
            rN = Math.trunc(Math.random() * vegetableNames.length);
            uname = `${vegetableNames[rN]}`
        }
        let price = `${rN + 1}`
        let url = "img/default.png"
        let type = `${types[rNT]}`
        let product = { name: uname, price: price, img: url, type: type }
        productsArray.push(product)
    }
}
viewAll()
function viewAll() {
    $("#viewProducts").empty()
    for (let i = 0; i < productsArray.length; i++) {
        viewProducts(i, productsArray[i].name, productsArray[i].price, productsArray[i].img)
    }
}
function viewProducts(a, b, c, d) {
    let div =
        `<div class="product visible" id="i${a}">
        <img src="${d}" class="img">
        <p>${b}</p>
        <p>${c}$</p>
    </div>`
    $("#viewProducts").append(div)
}
$("#sellDiv").fadeOut(0);
let arrObj = JSON.stringify(productsArray)
localStorage.setItem("productArr", arrObj)
$("#sellShow").click(function () {
    $("#sellDiv").fadeToggle("slow");
    $(document).keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '27') {
            $("#sellDiv").fadeOut("slow");
        }
    });
});
$("#searchShow").click(function () {
    $("#searchDiv").toggleClass("shown");
    $(document).keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '27') {
            $("#searchDiv").removeClass("shown");
        }
    });
});
$("#goBack").click(function () {
    $("#sellDiv").fadeOut();
});
$("#sellForm").submit(function (e) {
    let productType = $("#typeInput").val();
    if (productType != null) {
        e.preventDefault();
        let productName = $("#nameInput").val();
        let productPrice = $("#priceInput").val();
        let inputFileTag = document.getElementById("imgInput")
        if (inputFileTag.files && inputFileTag.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(inputFileTag.files[0]);
        }
        function imageIsLoaded(e) {
            localStorage.setItem("img", e.target.result);
            let productImg = localStorage.getItem("img")
            let product = {
                name: productName,
                price: productPrice,
                img: productImg,
                type: productType
            }
            productsArray.push(product)
            $("#sellDiv").fadeOut();
            alert("Product Posted!")
            let arrObj = JSON.stringify(productsArray)
            localStorage.setItem("productArr", arrObj)
            viewAll()
            $("#nameInput").val(null);
            $("#priceInput").val(null);
            $("#imgInput").val(null);
            $("#typeInput").val(null);
        };
    }
    else {
        alert("Enter your product's type")
        e.preventDefault()
    }
});
$("#nameSearchForm").submit(function (e) {
    e.preventDefault();
    $("#viewProducts").empty();
    let searchedInput = $("#nameSearch").val().toLowerCase()
    for (let i = 0; i < productsArray.length; i++) {
        let productName = productsArray[i].name.toLowerCase()
        if (productName.indexOf(searchedInput) != -1) {
            viewProducts(i, productsArray[i].name, productsArray[i].price, productsArray[i].img)
        }
    }
    $("#typeSearch").val(null)
    $("#maxPriceSearch").val(null)
    $("#minPriceSearch").val(null)
    $("#searchDiv").toggleClass("shown");
    if ($("#viewProducts").children().length == 0) {
        $("#viewProducts").text("No products found, please make sure you've typed it all correct!");
    }
});
$("#priceSearchForm").submit(function (e) {
    e.preventDefault();
    debugger;
    $("#viewProducts").empty();
    let minPrice = parseInt($("#minPriceSearch").val())
    let maxPrice = parseInt($("#maxPriceSearch").val())
    for (let i = 0; i < productsArray.length; i++) {
        let productPrice = parseInt(productsArray[i].price)
        if (maxPrice <= productPrice && productPrice <= minPrice) {
            viewProducts(i, productsArray[i].name, productsArray[i].price, productsArray[i].img)
        }
    }
    $("#nameSearch").val(null)
    $("#typeSearch").val(null)
    $("#searchDiv").toggleClass("shown");
    if ($("#viewProducts").children().length == 0) {
        $("#viewProducts").text("No products found, please make sure you've typed it all correct!");
    }
});
$("#typeSearchForm").submit(function (e) {
    e.preventDefault();
    $("#viewProducts").empty();
    let searchedInput = $("#typeSearch").val().toLowerCase()
    for (let i = 0; i < productsArray.length; i++) {
        let productType = productsArray[i].type.toLowerCase()
        if (productType.indexOf(searchedInput) != -1) {
            viewProducts(i, productsArray[i].name, productsArray[i].price, productsArray[i].img)
        }
    }

    $("#maxPriceSearch").val(null)
    $("#minPriceSearch").val(null)
    $("#nameSearch").val(null)
    $("#searchDiv").toggleClass("shown");
    if ($("#viewProducts").children().length == 0) {
        $("#viewProducts").text("No products found, please make sure you've typed it all correct!");
    }
});