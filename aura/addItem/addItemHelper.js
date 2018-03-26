({
	
	 showSuccessToast : function(title,message,type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : title,
            message: message,
            duration:' 2000',
            key: 'info_alt',
            type: type,
            mode: 'pester'
        });
        toastEvent.fire();
    },

    getMonths: function(){
        var months=[
            {value:"January",label:"January"} ,
            {value:"February",label:"February"}, 
            {value:"March",label:"March"},
             {value:"April",label:"April"},
             {value:"May",label:"May"},
             {value:"June",label:"June"},
			 {value:"July", label:"July"},
             {value:"August",label:"August"},
             {value:"September",label:"September"},
             {value:"October", label:"October"},
            {value: "November", label:"November"},
            {value: "December",label:"December"}
                   ];
                     return months;
                     
    },
    
    getYears : function(){
        var years=[
            {value:"2018",label:"2018"} ,
            {value:"2019",label:"2019"}, 
            {value:"2020",label:"2020"},
             {value:"2021",label:"2021"}
                   ];
                     return years;
                     
    }
    
})