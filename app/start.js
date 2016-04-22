/**
 * Do not edit this file manually, it will be overwritten by
 * Platypus Application Designer.
 */
require(['facade', 'logger'], function (F, Logger) {
    var global = this;
    F.cacheBust(true);
    F.export(global);
    require('testUi', function(testUi){
        var m = new testUi();
        m.show();
    }, function(e){
        Logger.severe(e);
        if(global.document){
            var messageParagraph = global.document.createElement('p');
            global.document.body.appendChild(messageParagraph);
            messageParagraph.innerHTML = 'An error occured while require(\'testUi\'). Error: ' + e;
            messageParagraph.style.margin = '10px';
            messageParagraph.style.fontFamily = 'Arial';
            messageParagraph.style.fontSize = '14pt';
        }
    });
});