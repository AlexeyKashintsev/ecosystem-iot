/**
 * 
 * @author Alexey
 * {global P}
 */
function Timers() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    form.addAction.onActionPerformed = function(event) {
        if (form.mgActions.selected !== [])
        model.qActCons.push({timer: form.mgActions.selected[0].act_timer_id});
    };

    form.btnAddTimer.onActionPerformed = function(event) {
        model.qTimers.push({});
    };
    form.button.onActionPerformed = function(event) {
        model.save();
    };
    form.btnCancel.onActionPerformed = function(event) {
        model.requery();
    };
}
