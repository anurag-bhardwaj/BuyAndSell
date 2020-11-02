var products = [
    { id: 1, img: "https://sm.pcmag.com/t/pcmag_in/review/n/nikon-d780/nikon-d780_d9nt.1200.jpg", name: "nikon camera", price: 10, description: "no description", cls: "gray" },
    { id: 2, img: "https://sm.pcmag.com/t/pcmag_in/review/n/nikon-d780/nikon-d780_d9nt.1200.jpg", name: "camera", price: 20, description: "no description", cls: "gray" }
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