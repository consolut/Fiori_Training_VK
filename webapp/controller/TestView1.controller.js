sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, formatter) {
        "use strict";

        return Controller.extend("demo.project1061023.controller.TestView1", {
            formatter: formatter,
            onInit: function () {
                var oData = {
                    "products":[
                        {
                            "ProductId": "HT-1000",
                            "Category": "LT",
                            "MainCategory": "Computer Systems",
                            "SupplierName": "Very Best Screens",
                            "Weight": "4.2",
                            "WeightUnit": "KG",
                            "ShortDescription": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                            "Name": "Notebook Basic 15",
                            "PictureUrl": "sap/ui/demo/mock/images/HT-1000.jpg",
                            "Status": "A",
                            "Price": "956",
                            "DimensionWidth": "30",
                            "DimensionDepth": "18",
                            "DimensionHeight": "3",
                            "Unit": "cm",
                            "CurrencyCode": "EUR"
                    
                        },
                        {
                            "ProductId": "HT-1001",
                            "Category": "LT",
                            "MainCategory": "Computer Systems",
                            "SupplierName": "Very Best Screens",
                            "Weight": "4.5",
                            "WeightUnit": "KG",
                            "ShortDescription": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                            "Name": "Notebook Basic 17",
                            "PictureUrl": "sap/ui/demo/mock/images/HT-1001.jpg",
                            "Status": "A",
                            "Price": "1249",
                            "DimensionWidth": "29",
                            "DimensionDepth": "17",
                            "DimensionHeight": "3.1",
                            "Unit": "cm",
                            "CurrencyCode": "EUR"
                        },
                        {
                            "ProductId": "HT-1002",
                            "Category": "LT",
                            "MainCategory": "Computer Systems",
                            "SupplierName": "Very Best Screens",
                            "Weight": "4.2",
                            "WeightUnit": "KG",
                            "ShortDescription": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
                            "Name": "Notebook Basic 18",
                            "PictureUrl": "sap/ui/demo/mock/images/HT-1002.jpg",
                            "Status": "A",
                            "Price": "1570",
                            "DimensionWidth": "28",
                            "DimensionDepth": "19",
                            "DimensionHeight": "2.5",
                            "Unit": "cm",
                            "CurrencyCode": "EUR"
                        },
                        {
                            "ProductId": "HT-1003",
                            "Category": "LT",
                            "MainCategory": "Computer Systems",
                            "SupplierName": "Smartcards",
                            "Weight": "4.2",
                            "WeightUnit": "KG",
                            "ShortDescription": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
                            "Name": "Notebook Basic 19",
                            "PictureUrl": "sap/ui/demo/mock/images/HT-1003.jpg",
                            "Status": "A",
                            "Price": "1650",
                            "DimensionWidth": "32",
                            "DimensionDepth": "21",
                            "DimensionHeight": "4",
                            "Unit": "cm",
                            "CurrencyCode": "EUR"
                        },
                        {
                            "ProductId": "HT-1007",
                            "Category": "AC",
                            "MainCategory": "Computer Components",
                            "SupplierName": "Technocom",
                            "Weight": "0.2",
                            "WeightUnit": "KG",
                            "ShortDescription": "Digital Organizer with State-of-the-Art Storage Encryption",
                            "Name": "ITelO Vault",
                            "PictureUrl": "sap/ui/demo/mock/images/HT-1007.jpg",
                            "Status": "D",
                            "Price": "299",
                            "DimensionWidth": "32",
                            "DimensionDepth": "22",
                            "DimensionHeight": "3",
                            "Unit": "cm",
                            "CurrencyCode": "EUR"
                        }
                    ]
                };

                var oProductsData = new JSONModel(oData);
                this.getView().setModel(oProductsData, "products");
                this.getOwnerComponent().setModel(oProductsData, "products");

                var oProductModel = this.getView().getModel("products");

                //Task 1: Use Binding in the Controller, replace binding property from SimpleForm 
               this.getView().byId("SimpleForm1").bindElement("employees>/people/2");

                //Task 2: Calculate volume for each product. Use forEach loop and display the volume for the 3 products to the view.
                var aProductsData = oProductModel.getData();
                this.getView().byId("TableId").bindElement("products>/products/0");

                var that = this;
                aProductsData["products"].forEach(function(oProduct, iIndex)  {
                    var fProductWidth = oProduct.DimensionWidth;
                    var fProductDepth = oProduct.DimensionDepth;
                    var fProductHeight = oProduct["DimensionHeight"];


                    oProductModel.setProperty("/products/" + iIndex.toString() + "/Volume", that.calculateVolume(fProductWidth, fProductDepth, fProductHeight));
                });

            },

            calculateVolume: function(fWidth, fDepth, fHeight ) {
                return fWidth * fDepth * fHeight
            },

            //Task 3
            onListSelected:function(oEvent){
               var obindingContext = oEvent.getSource().getBindingContext("products");
                var sPath = obindingContext.getPath();
               this.getView().byId("SimpleForm2").bindElement("products>" + sPath);
            },

            onItemNavigation: function(oEvent) {
                var sProductPath = oEvent.getSource().getBindingContext("products").getPath();
                var sProductId = sProductPath.split("/")[2];

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteNavigation",{"id": sProductId});
            },

            onChangeDimensions: function(oEvent) {
                var obindingContext = oEvent.getSource().getBindingContext("products");
               // var sPath = obindingContext.getPath();

                var oProduct = obindingContext.getObject();
                oProduct["Volume"] = this.calculateVolume(oProduct.DimensionWidth, oProduct.DimensionDepth, oProduct.DimensionHeight);

                /*var fWidth = this.getView().getModel("products").getProperty(sPath + '/DimensionWidth');
                var fDepth = this.getView().getModel("products").getProperty(sPath + '/DimensionDepth');
                var fHeight = this.getView().getModel("products").getProperty(sPath + '/DimensionHeight');

                this.getView().getModel("products").setProperty(sPath + "/Volume", this.calculateVolume(fWidth, fDepth, fHeight));*/


            },

            onChangeName: function(oEvent) {
                var xNameOfVariable
                var bIsRequired = true;
                var iCountOfProducts = 10;
                var fPrice = 10.55;
                var dBirthday = "1997-07-29"
                var aMyArray = [1,2,3,4];
                var oMyObject = {
                    "FirstName": "Vasilis",
                    "LastName": "Kiosses"
                }
                var sFirstName = oEvent.getParameter("value");
                MessageBox.information("Hello " + sFirstName);
            }

        });
    });