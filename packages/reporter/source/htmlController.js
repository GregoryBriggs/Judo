export class HtmlController
{
    
    constructor(){}
    
    /**
     * 
     * @param {Object} reportObject 
     */
    constructor(reportObject){
        this.title = reportObject?.title;
        this.title = reportObject?.summary;
        this.title = reportObject?.results;
        this.title = reportObject?.navbar;
        this.title = reportObject?.toolbar;
        this.title = reportObject?.footer;
        this.options = reportObject.options;
    }
    
    /**
     * 
     * @param {Array} reportObject 
     */
    constructor(reportObject){
        this.title = reportObject;
    }
}