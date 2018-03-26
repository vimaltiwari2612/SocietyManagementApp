({
   
	editRow: function(component, event, helper) {
         window.year = component.get("v.localEntry.Year__c");
         window.month = component.get("v.localEntry.Month__c");
         window.dues = component.get("v.localEntry.duespaid__c");
        component.set("v.entry",component.get("v.localEntry"));
        component.set("v.edit","true");
	},
    
    cancelEditRow : function(component, event, helper) {
        component.set("v.localEntry",component.get("v.entry"));
        component.set("v.edit","false");   
        component.set("v.localEntry.Year__c",  window.year);  
        component.set("v.localEntry.Month__c",  window.month);
        component.set("v.localEntry.duespaid__c", window.dues);
	},
    
    saveEditRow :function(component, event, helper) {
         component.set("v.save","true"); 
          var validInput = component.find('myinput').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validInput){
          var action = component.get("c.saveDues");
        action.setParams({
            "dues": component.get("v.entry")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.edit","false");
                component.set("v.save","false"); 
              helper.showSuccessToast("Success","Record Saved Successfully. ","success"); 
            }
        });
        $A.enqueueAction(action);
        }
       
    },
    
    deleteThisRow : function(component, event, helper) {
         component.set("v.delete","true");
    	var deleteRowData = component.getEvent("deleteRow");
            deleteRowData.setParams({
                "entry": component.get("v.localEntry")
            }).fire();
    },
    
    doInit : function(component, event, helper) {
    	 component.set("v.months", helper.getMonths()); 
         component.set("v.years", helper.getYears()); 
       
    }
    
     
    
     
    
  
})