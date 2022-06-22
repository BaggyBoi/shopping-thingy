let productsArray = []
if (localStorage.getItem("productArr") != null) {
    productsArray = JSON.parse(localStorage.getItem("productArr"))
}
if (productsArray.length == 0) {
    for (let i = 0; i < 20; i++) {
        let uname = `Apple`
        let price = `${i + 1}`
        let url = "img/apple.png"
        let type = "fruit"
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
            setTimeout(() => {
                localStorage.removeItem("img")

            }, 1000);
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
// $("#searchInput").change(function () {
//     searchForProducts()
// });
// function searchForProducts() {
//     let searchedInput = $("#searchInput").val();
//     for (let i = 0; i < productsArray.length; i++) {
//         if (productsArray[i].name == searchedInput) {
//             console.log("name matched")
//             viewProducts(i)
//         }
//         else if (productsArray[i].price == searchedInput) {
//             $("#viewProducts").text("No products found with given search")
//             console.log("price matched")
//         }

//         else if (productsArray[i].price == searchedInput) {
//             $("#viewProducts").text("No products found with given search")
//             console.log("price matched")
//         }
//         else if (searchedInput == "") {
//             viewAll()
//         }
//         else {
//             $("#viewProducts").empty()
//             $("#viewProducts").text("No products found with given search")
//         }
//     }
// }
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