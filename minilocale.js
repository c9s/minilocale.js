/* 
MiniLocale.js

    Author: Cornelius <cornelius.howl@gmail.com>

*/
var MiniLocale = function(dict,lang,opts) {
    this.opts = $.extend( {
        returnLoc: false,
        ignoreCase: false,
        ignoreLangCase: false,
        injectLoc: false
            } , opts );



    if( this.opts.ignoreLangCase )
        lang = lang.toLowerCase();

    this.lang = lang;
    this.dict = dict || { };

    if( this.opts.ignoreCase ) {
        // convert dictionary keys to lowercase.
        for( var msgid in this.dict )
            this.dict[ msgid.toLowerCase() ] = msgid;
    }

    var that = this;


    /* applyArgs( 'hello %1' , [ "John" ] ); */
    var varreg = /^%(\d+)$/;
    var applyArgs = function(str,args) {
        // support gettext style.
        var tokens = str.split(/(%\d+)/);
        for(var i = 0; i < tokens.length; i++) {
            var match = varreg.exec(tokens[i]);
            if(match)
                tokens[i] = args[parseInt( match[1] ) ];
        }
        return tokens.join("");
    };

    var loc = function(msgid) {
        var msg = msgid;
        if( that.opts.ignoreCase )
            msgid = msgid.toLowerCase();

        if( that.dict[ that.lang ][ msgid ] )
            msg = that.dict[ that.lang ][ msgid ];
        return applyArgs( msg , arguments );
    };

    var caller = arguments.callee.caller;

    // console.log( typeof caller );
    if( typeof caller == "function" && this.opts.injectLoc )
        caller.prototype.loc = loc; // injects loc method to caller's prototype.

    this.loc = loc;

    if( this.opts.returnLoc )
        return loc;
};

MiniLocale.prototype = {

    loc: function(msgid) {
        return this.loc( msgid );
    },

    switch: function(lang) {
        this.lang = lang;
        if( ! this.dict[ lang ] ) {
            if( window.console )
                console.info( lang + " dictionary is empty." );
        }
    }
};
