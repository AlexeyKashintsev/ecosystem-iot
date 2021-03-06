/**
 * 
 * @author Алексей
 * @resident
 * @public 
 */
define('Devices',['orm', 'logger', 'Trigger', 'TemperatureSensor'], function (Orm
, Logger, Trigger, TemperatureSensor, ModuleName) {
    Logger.info('Module devices starting...');
    return function () {
        var self = this, model = Orm.loadModel(ModuleName);
        var devs = {};
        
        Logger.info('Module devices started...');
        
        function addDev(aDevId, aDevType, aDevData) {
            try {
                Logger.info('Adding device. Dev_id: ' + aDevId + ', DevData: '+ JSON.stringify(aDevData));
                switch (aDevType) {
                    case 'Trigger': devs[aDevId] = new Trigger(aDevData);
                        break;
                    case 'TemperatureSensor': devs[aDevId] = new TemperatureSensor(aDevData);
                        break;
                }
            } catch (e) {
                Logger.info('Error: ' + e);
            }
        }
        
        self.devLoadConfFromDatabase = function() {
            devs = {};
            Logger.info('Loading configuration from DB...');
            model.requery(function() {
                model.qDevices.forEach(function(dev) {
                    addDev(dev.eco_devices_id, dev.dev_type, JSON.parse(dev.dev_data));
                });
            });
        };

        self.devPerformAction = function(anActionId) {
            Logger.info('Performing action: ' + anActionId);
            var action;
            model.qActions.forEach(function(elem) {
                if (elem.eco_actions_id == anActionId)
                    action = elem;
            });
            if (action) {
                Logger.info('Action found: ' + JSON.stringify(action));
                var act = action.actionType;
                if (devs[action.device_id]) {
                    if (devs[action.device_id][act.act_command]) {
                        try {
                            var res = devs[action.device_id][act.act_command](JSON.parse(action.action_params));
                            return res;
                        } catch (e) {
                            var err = 'An error occured on action performance. Device ID: '
                                    + action.device_id + ', action: '+ anActionId + '\nError: ' + e;
                            Logger.warning(err);
                            return err;
                        }
                    } else {
                        var err = 'There is no action in device. Device ID: ' + action.device_id + ', action: '+ anActionId;
                        Logger.warning(err);
                        return err;
                    }  
                } else {
                    var err = 'There is no device. Device ID: ' + action.device_id + ', action: '+ anActionId;
                    Logger.warning(err);
                    return err;
                }
            } else {
                var err = 'There is no action with given ID. Action ID: ' + anActionId
                Logger.warning(err);
                return err;
            }
        };
        
        self.devLoadConfFromDatabase();
    };
});
