/**
 * 
 * @author User
 */
define('MenuWidg', ['orm'], function (Orm, ModuleName) {
    function module_constructor() {
        var self = this, model = Orm.loadModel(ModuleName);
        
        // TODO : place constructor code here
        
        self.execute = function () {
            // TODO : place application code here
        };
    }
    return module_constructor;
});
