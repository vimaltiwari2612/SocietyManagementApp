({  
    navigateToViewList : function(component, event, helper) {
    var newEvent = $A.get("e.force:navigateToComponent");
        newEvent.setParams({
            componentDef: "c:SocietyManagementViewDetails",
            componentAttributes: {
            }
        });
        newEvent.fire();
   },
    
   clickCreate: function(component, event, helper) {
       
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
             component.set("v.add","true");
            // Create the new expense
            var newExpense = component.get("v.entry");
           var action = component.get("c.saveDues");
        action.setParams({
            "dues": newExpense 
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                
                component.set("v.entry",{ 'sobjectType': 'dues__c',
                        'Month__c': '',
                        'duespaid__c':0,
                        'Society__c': '',
                        'Member__c': '',
                        'Year__c': '' });
                   helper.showSuccessToast("Success","Record Saved Successfully. ","success");
            }
            else
            {
                 helper.showSuccessToast("Error","Failed to Save record. "+response.getReturnValue(),"error");
            }
               component.set("v.add","false");
        });
        $A.enqueueAction(action);
        }
    },
    
     
      loadOptions: function (component, event, helper) {
            var action = component.get("c.getAllAccountsJSON");
             action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accounts", JSON.parse(response.getReturnValue()));
                 component.set("v.months", helper.getMonths()); 
                 component.set("v.years", helper.getYears()); 
            }
        });
        $A.enqueueAction(action);
    },
    
    getContacts: function (component, event) {
        // Get the string of the "value" attribute on the selected option
        var selectedOptionValue = event.getParam("value");
		 var action = component.get("c.getContactsJSON");
         action.setParams({
            "accountid": selectedOptionValue 
        });
             action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.contacts", JSON.parse(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
    },
    
    
})