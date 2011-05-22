/* 
MiniLocale.js

    Author: Cornelius <cornelius.howl@gmail.com>

*/
var MiniLocale = function(dict,lang) {
    this.lang = lang;
    this.dict = dict || { };
};
MiniLocale.prototype = {
    switch: function(lang) {
        this.lang = lang;
        if( ! this.dict[ lang ] ) {
            if( window.console )
                console.info( lang + " dictionary is empty." );
        }
    },
    loc: function(msg) { 
        if( this.dict[ this.lang ][ msg ] )
            return this.dict[ this.lang ][ msg ];
        return msg;
    }
};
