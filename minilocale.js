/* 
MiniLocale.js

    Author: Cornelius <cornelius.howl@gmail.com>

*/
var MiniLocale = function(dict,lang,opts) {
    this.opts = $.extend( {
        ignoreCase: true,
        ignoreLangCase: true  
    } , opts );

    // console.log( arguments.callee.caller );
    var caller = arguments.callee.caller;
    caller.prototype.loc = this.loc; // injects loc method to caller's prototype.

    if( opts.ignoreLangCase )
        lang = lang.toLowerCase();

    this.lang = lang;
    this.dict = dict || { };

    if( opts.ignoreCase ) {
        // convert dictionary keys to lowercase.
        for( var msgid in this.dict )
            this.dict[ msgid.toLowerCase() ] = msgid;
    }

    var that = this;
    caller.prototype.loc = function(msgid) {
        if( that.opts.ignoreCase )
            return that.dict[ that.lang ][ msgid.toLowerCase() ];
        if( that.dict[ that.lang ][ msgid ] )
            return that.dict[ that.lang ][ msgid ];
        return msgid;
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
