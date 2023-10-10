sap.ui.define([], function () {
    "use strict";
    return {
        setValueState: function (fMeasurement) {
            if(fMeasurement > 0 || fMeasurement === null) {
                return "None";
            } else {
                return "Error";
            }
        },
        setValueStateText: function (fMeasurement) {
            var oMessages = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            if(fMeasurement > 0 || fMeasurement === null) {
                return "";
            } else {
                return oMessages.getText("PositiveNumber");
            }
        }
    };

});