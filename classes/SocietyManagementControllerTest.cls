@isTest(seeAllData=false)
public class SocietyManagementControllerTest {

    public static testmethod void testAllMethods()
    {
        Account ac=new Account(Name='abc');
        insert ac;
        SocietyManagementController.getDataList();
        dues__c d=new dues__c();
        SocietyManagementController.saveDues(d);
        SocietyManagementController.deleteDues(d);
        SocietyManagementController.getAllAccountsJSON();
        SocietyManagementController.getContactsJSON('');

    }
    
}