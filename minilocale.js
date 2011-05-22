/* 
MiniLocale.js

    Author: Cornelius <cornelius.howl@gmail.com>

*/
var MiniLocale = function(dict,lang) {

    // console.log( arguments.callee.caller );
    var caller = arguments.callee.caller;
    caller.prototype.loc = this.loc; // inject loc method.

    this.lang = lang;
    this.dict = dict || { };

    var that = this;
    caller.prototype.loc = function(msg) {
        if( that.dict[ that.lang ][ msg ] )
            return that.dict[ that.lang ][ msg ];
        return msg;
    };

};
MiniLocale.prototype = {
    switch: function(lang) {
        this.lang = lang;
        if( ! this.dict[ lang ] ) {
            if( window.console )
                console.info( lang + " dictionary is empty." );
        }
    }
};
