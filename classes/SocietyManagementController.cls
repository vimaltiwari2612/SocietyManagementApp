public with sharing class SocietyManagementController {

    public static List<dues__c> dataList {get;set;}
    
    @AuraEnabled
    public static List<dues__c> getDataList() {
    	dataList = [select id , name , member__r.name , year__c, month__c,Society__r.Name,Society__r.secretary__c, duespaid__c from dues__c order by createdDate desc];
        return dataList;
    }
    
     @AuraEnabled
    public static String saveDues(dues__c dues) {
        try{ 
        upsert dues;
            return '';
        }catch(Exception e)
        {
            return e.getMessage();
        }
    }
    
     @AuraEnabled
    public static List<dues__c> deleteDues(dues__c dues) {
        try{ 
        	delete dues;
            return getDataList(); 
        }catch(Exception e)
        {
            return null; 
        }
         
    }
   
    @AuraEnabled
    public static String getAllAccountsJSON() {
        List<Account> results =  [select id, Name from Account];
        List<SearchResult> output = new List<SearchResult>();
        if(results.size()>0){
            for(Account sobj : results){
                SearchResult sr = new SearchResult();
                sr.value = sobj.id;
                sr.label = sobj.Name;
                output.add(sr)   ;
            }
        }
        return JSON.serialize(output);
    }
	
      @AuraEnabled
    public static String getContactsJSON(string accountid) { 
        List<Contact> results =  [select id, Name from Contact where Account.id=:accountid];
        List<SearchResult> output = new List<SearchResult>();
        if(results.size()>0){
            for(Contact sobj : results){
                SearchResult sr = new SearchResult();
                sr.value = sobj.id;
                sr.label = sobj.Name;
                output.add(sr)   ;
            }
        }
        else
        {
             SearchResult sr = new SearchResult();
                sr.value = 'NA';
                sr.label = 'None';
                output.add(sr)   ;
        }
        return JSON.serialize(output);
    }
    
        
     public class SearchResult{
        public String value{get;Set;}
        public String label{get;set;}
    }
    
    
}