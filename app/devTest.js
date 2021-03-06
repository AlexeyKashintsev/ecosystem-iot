/* global P */

/**
 * 
 * @author Alexey
 * {global P}
 */
function devTest() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    var devsServ = new P.ServerModule('WholeServer');
//    var cloudManager = new P.ServerModule('Clou__dManager');
    
    var devTypes = [
        {typeId: 'dIn', typeName: 'Цифровой вход'},
        {typeId: 'dOut', typeName: 'Цифровой выход'},
        {typeId: 'aIn', typeName: 'Аналоговый вход'},
        {typeId: 'aTm', typeName: 'Датчик температуры'}
    ];
    form.mcDevTSelect.displayList = devTypes;
    form.mcDevTSelect.displayField = 'typeName';
    var devs = [];
    form.mgDevs.data = devs;
    form.mgDevs.colDevId.field = "id";
    form.mgDevs.colDevType.field = "type";
    form.mgDevs.colDevName.field = "name";
    form.mgDevs.colValue.field = "value";    
    form.mgDevs.colDevPort.field = "port";    
    
    function addDev2Grid(aDevId, aDevPar) {
        aDevPar.id = aDevId;
        devs[aDevId] = aDevPar;
        form.mgDevs.data = null;
        form.mgDevs.data = devs;
    }
    
    form.button.onActionPerformed = function(event) {
        var dd = {
            type: form.mcDevTSelect.value.typeId,
            port: +form.tfPort.text,
            value: form.defVal.value
        };
        devsServ.addDev(dd, dd.value, function(res) {
            addDev2Grid(res, dd);
        });
    };
    
    form.btnGetValues.onActionPerformed = function(event) {
        devsServ.getAllValues(function(aRes) {
            for (var j in aRes) {
                devs[j].value = aRes[j];
            }
            form.mgDevs.data = null;
            form.mgDevs.data = devs;
        });
    };
    
    form.btnSetValue.onActionPerformed = function(event) {
        var curDevId = form.mgDevs.selected[0].id;
        devsServ.setDevValue(curDevId, form.newVal.value);
    };
    
    form.btnClearAll.onActionPerformed = function(event) {
        devsServ.clearAll(function() {
            devs = [];
            form.mgDevs.data = null;
            form.mgDevs.data = devs;
        });
    };

//    form.btnSave.onActionPerformed = function(event) {
//        console.log(devs);
//        cloudManager.uploadDevList(devs);
//    };
//
//    form.btnImportFromDb.onActionPerformed = function(event) {
//        cloudManager.getDevList(function(res){
//            devs = res;
//            console.log(devs);
//            form.mgDevs.data = devs;
//            var dd = {
//                type: devs.type,
//                port: +devs.port,
//                value: null
//            };
////            servDevs.addDev(dd, dd.value, function(res) {
////                //addDev(res, dd);
////            });
//        });
//    };
}
