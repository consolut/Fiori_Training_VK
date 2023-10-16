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

        return Controller.extend("demo.project1061023.controller.Navigation", {
            formatter: formatter,
            onInit: function () {
                var  oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteNavigation").attachPatternMatched(this._onRouteMatched, this);


        },
        _onRouteMatched: function(oEvent){
            var oParameters = oEvent.getParameters();
            var oArguments = oParameters["arguments"];

            this.getView().byId("SimpleForm2").bindElement("products>/products/" + oArguments.id);
        }
    });
    
    });