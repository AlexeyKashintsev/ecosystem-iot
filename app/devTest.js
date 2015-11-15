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
    
    var servDevs = new P.ServerModule('Devices');
    
    var devTypes = [
        {typeId: 'dIn', typeName: 'Цифровой вход'},
        {typeId: 'dOut', typeName: 'Цифровой выход'},
        {typeId: 'aIn', typeName: 'Аналоговый вход'}
    ];
    form.mcDevTSelect.displayList = devTypes;
    form.mcDevTSelect.displayField = 'typeName';
    var devs = [];
    form.mgDevs.data = devs;
    form.mgDevs.colDevId.field = "id";
    form.mgDevs.colDevType.field = "type";
    form.mgDevs.colDevName.field = "id";
    form.mgDevs.colValue.field = "value";    
    form.mgDevs.colDevPort.field = "port";    
    
    
    function addDev(aDevId, aDevPar) {
        aDevPar.id = aDevId;
        devs.push(aDevPar);
        form.mgDevs.data = null;
        form.mgDevs.data = devs;
    }
    
    form.button.onActionPerformed = function(event) {
        var dd = {
            type: form.mcDevTSelect.value.typeId,
            port: +form.tfPort.text,
            value: form.defVal.value
        };
        servDevs.addDev(dd.type, dd.port, dd.value, function(res) {
            addDev(res, dd);
        });
    };
}
