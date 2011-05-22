/* 

MiniLocale.js

Todos:

    * support parsing js via ajax, and generate dictinoary json content.
    * support json dictionary from ajax.

Usage:

First initialize minilocale object with dictionary 
    and language name in your object constructor.

    var Action;
    Action = fucntion() {
        this.locale = new MiniLocale( Action.dict , "fr" );
        this.loc   = this.locale.loc;
    };
    Action.dict = {
        zh_tw: { 
            "Hello": "你好"
        },
        fr: { 
            "Hello": "Salut"
        }
    };

*/
var MiniLocale = function(dict,lang) {
    this.lang = lang;
    this.dict = dict;
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
        if( this.dict[ this.lang ] )
            return this.dict[ this.lang ][ msg ];
        return msg;
    }
};
