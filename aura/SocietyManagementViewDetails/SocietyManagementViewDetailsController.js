({

    doInit: function(component, event, helper) {
        var action = component.get("c.getDataList");
 
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                component.set("v.entries", response.getReturnValue());
                 component.set("v.entriesCount", response.getReturnValue().length);
                 helper.showSuccessToast("Success","All Records Populated Successfully! ","success");
            }
            else {
                helper.showSuccessToast("Error","Failed to load the page, try Refreshing It again!","error");
            }
        });

       
        $A.enqueueAction(action);
    },
    
    navigateToAddItem : function(component, event, helper) {
    var newEvent = $A.get("e.force:navigateToComponent");
        newEvent.setParams({
            componentDef: "c:addItem",
            componentAttributes: {
            }
        });
        newEvent.fire();
   
},
    
     handleDeletionOfRow :function(component, event, helper) {
			var entryToBeDeleted = event.getParam("entry");
          var action = component.get("c.deleteDues");
        action.setParams({
            "dues": entryToBeDeleted
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data =response.getReturnValue();
                if(data == null)
                {
                    helper.showSuccessToast("Error","can't delete row!","error");
                }
                else{
                   component.set("v.entries", response.getReturnValue());
                     component.set("v.entriesCount", response.getReturnValue().length);
                      helper.showSuccessToast("Success","deleted!","success");
                   }
               
            }
            else
            { 
                
            }
        });
        $A.enqueueAction(action);
        }

})