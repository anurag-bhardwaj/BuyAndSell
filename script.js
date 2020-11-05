var products = [
    { id: 1, img: "https://sm.pcmag.com/t/pcmag_in/review/n/nikon-d780/nikon-d780_d9nt.1200.jpg", name: "Nikon Camera", price: 10, description: "no description", cls: "gray" },
    { id: 2, img: "https://rukminim1.flixcart.com/image/416/416/kfwvcsw0/television/m/x/3/nokia-32tahdn-original-imafw8xg5rw87ukj.jpeg?q=70", name: "Nokia LED Smart Android TV", price: 799, description: "Sound by Onkyo Experience sounds come to life – all thanks to the renowned Japanese brand Onkyo. You enjoy 6D sound with low distortion (< 3%) as well as balanced bass and vocals so that you can immerse yourself in each and every scene you watch.", cls: "gray" },
    { id: 3, img: "https://rukminim1.flixcart.com/image/416/416/kfikya80-0/headphone/z/m/p/jblc100twsblkin-jblc100twsblk-jbl-original-imafvy9ezygggeph.jpeg?q=70", name: "JBL C100TWS Headset", price: 351, description: "This pair of true wireless earbuds from JBL is sure to make your travels more enjoyable as it delivers clear and rich audio, so you can groove to your playlist throughout the journey.", cls: "gray" },
    { id: 4, img: "https://rukminim1.flixcart.com/image/800/960/k51cpe80pkrrdj/shoe/z/p/a/7-rte2341-red-tape-rte2341-7-original-imafnqf5kazf4gd6.jpeg?q=50", name: "RedTape Party Wear", price: 24, description: "I bought after going through several, brands and models. I was bit confused while ordering as the review was very less. I don't regret my decision after getting the product. ❣️", cls: "gray" },
    { id: 5, img: "https://rukminim1.flixcart.com/image/416/416/kbpeoi80/painting/5/h/m/phsx30244-flipkart-perfect-homes-original-imafszw4nbfdjjhu.jpeg?q=70", name: "Perfect Home Wallpainting", price: 5, description: "it's comes with double fixing tape just flip the cover and from z d it to wall", cls: "gray" },
    { id: 6, img: "https://rukminim1.flixcart.com/image/832/832/jyxaw7k0/mobile/f/6/x/mi-redmi-note-6-pro-mzb6877in-original-imafbydzycyzzf4n.jpeg?q=70", name: "Redmi 6 Pro", price: 1199, description: "This Mi Redmi Note 6 Pro is in 'Refurbished - Superb' condition. Refurbished - Superb are opened and used products with negligible scratches. These devices have been fully restored, tested and certified to be fully functional by experts.", cls: "gray" },
    { id: 7, img: "https://rukminim1.flixcart.com/image/832/832/jz30nm80/computer/h/f/y/acer-na-gaming-laptop-original-imafj6dghnrqtexz.jpeg?q=70", name: "Acer Predator 15", price: 11120, description: "Acer Predator 15 Core i7 7th Gen - (16 GB/1 TB HDD/128 GB SSD/Windows 10 Home/6 GB Graphics) G9-593 Gaming Laptop  (15.6 inch, Abyssal Black, 3.7 kg)", cls: "gray" },
]
var cartProducts = [];
var app = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: "myController"
            })
            .when("/productTemplate/:id", {
                templateUrl: "productTemplate",
                controller: "myProduct"
            })
            .when("/addnew", {
                templateUrl: "addproduct",
                controller: "addProduct"
            })
            .when("/buynow", {
                templateUrl: "buynow",
                controller: "buynow"
            })
            .when("/cart", {
                templateUrl: "cart",
                controller: "cartCtrl"
            })
            .otherwise({
                redirectTo: '/'
            })
    })
    .controller("myController", function ($scope) {
        $scope.products = products;
        $scope.chngclass = function (e) {
            if ($scope.products[e - 1].cls === "gray") {
                $scope.products[e - 1].cls = "red";
            }
            else {
                $scope.products[e - 1].cls = "gray";
            }
        }
        $scope.cartAdd = function () {
            cartProducts=[];
            for (let i = 0; i < products.length; i++) {
                if (products[i].cls === "red") {
                    cartProducts.push(products[i]);
                }
            }
        }

    })
    .controller("myProduct", function ($scope, $routeParams) {
        var Aparams = $routeParams.id
        if (Aparams) {
            $scope.product = products[Aparams - 1];
        }
        $scope.products = products;
        $scope.cartText="Add To Cart";
        if(Aparams)
        {
            if(products[Aparams-1].cls==="gray")
            {
                $scope.cartText="Add To Cart";
            }
            else{
                $scope.cartText="Remove from Cart";
            }
        }
        $scope.chngclass = function (e) {
            if ($scope.products[e - 1].cls === "gray") {
                $scope.products[e - 1].cls = "red";
                $scope.cartText="Remove from Cart";
            }
            else {
                $scope.products[e - 1].cls = "gray";
                $scope.cartText="Add To Cart";
            }
        }
        $scope.cartAdd = function () {
            cartProducts=[];
            for (let i = 0; i < products.length; i++) {
                if (products[i].cls === "red") {
                    cartProducts.push(products[i]);
                }
            }
        }
    })
    .controller("addProduct", function ($scope) {
        $scope.productName = "";
        $scope.price = 0;
        $scope.imageUrl = "";
        $scope.description = "";
        $scope.submitFunc = function (e) {
            e.preventDefault();
            let id = products.length + 1;
            myObj = { id: id, img: $scope.imageUrl, name: $scope.productName, price: parseInt($scope.price), description: $scope.description, cls:"gray" }
            products.push(myObj)
            alert("uploaded")
            $scope.imageUrl = "";
            $scope.productName = "";
            $scope.price = 0;
            $scope.description = "";
        }
    })
    .controller("cartCtrl", function ($scope) {
        $scope.cartproducts = cartProducts;
        $scope.cartEmpty="Cart is empty! Add items";
        $scope.cartdisplay="visibT";
        tp=0;
        ti=0;
        for (let i = 0; i < cartProducts.length; i++) {
            ti+=1;
            tp += cartProducts[i].price;
        }
        $scope.totalItems=ti;
        $scope.totalPrice=tp;
        if(cartProducts.length===0)
        {
            if($scope.cartdisplay==="visibT")
            {
                $scope.cartdisplay="visibF"
            }
            else
            {
                $scope.cartdisplay="visibT"
            }
        }
    })