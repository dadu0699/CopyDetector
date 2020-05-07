/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,19],$V2=[1,21],$V3=[1,22],$V4=[1,23],$V5=[1,24],$V6=[1,25],$V7=[14,17,23,24,25,26,27],$V8=[10,28,48],$V9=[2,45],$Va=[1,37],$Vb=[9,14,17,23,24,25,26,27,39,71,77,79,82,84,85,86,89,90,91],$Vc=[1,50],$Vd=[1,47],$Ve=[1,48],$Vf=[1,49],$Vg=[1,51],$Vh=[1,52],$Vi=[1,53],$Vj=[1,54],$Vk=[1,55],$Vl=[1,58],$Vm=[1,60],$Vn=[20,28],$Vo=[1,64],$Vp=[1,65],$Vq=[1,66],$Vr=[1,67],$Vs=[1,68],$Vt=[1,69],$Vu=[1,70],$Vv=[1,71],$Vw=[1,72],$Vx=[1,73],$Vy=[1,74],$Vz=[1,75],$VA=[1,76],$VB=[1,77],$VC=[10,20,28,50,51,52,53,54,55,56,57,58,59,60,61,62,63,83],$VD=[1,81],$VE=[1,100],$VF=[1,95],$VG=[1,102],$VH=[1,103],$VI=[1,104],$VJ=[1,105],$VK=[1,106],$VL=[1,107],$VM=[1,108],$VN=[1,109],$VO=[9,14,17,23,24,25,26,27,39,71,77,78,79,82,84,85,86,89,90,91],$VP=[9,14,23,24,25,26,27,39,71,77,79,82,84,85,86,89,90,91],$VQ=[1,134],$VR=[1,135],$VS=[1,139],$VT=[10,20,28,50,51,56,57,58,59,60,61,62,63,83],$VU=[10,20,28,50,51,52,53,55,56,57,58,59,60,61,62,63,83],$VV=[10,20,28,56,57,58,59,60,61,62,63,83],$VW=[10,20,28,60,61,62,63,83],$VX=[10,20],$VY=[1,167],$VZ=[14,82,84],$V_=[1,203];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"IMPORT":4,"CLASS":5,"EOF":6,"IMPORTS":7,"import":8,"identifier":9,";":10,"class":11,"{":12,"BODYCLASS":13,"}":14,"METHOD":15,"DECLARATION":16,"void":17,"(":18,"PARAMS":19,")":20,"BODY":21,"TYPE":22,"int":23,"double":24,"boolean":25,"char":26,"String":27,",":28,"PARAM":29,"SENTENCES":30,"SENTENCE":31,"ASSIGNMENT":32,"INVOKEMETHOD":33,"SOUT":34,"IF":35,"SWITCH":36,"FOR":37,"WHILE":38,"DOWHILE":39,"RETURN":40,"BREAK":41,"CONTINUE":42,"IDLIST":43,"ASSIGNMENT_EXPRESSION":44,"ITERATOR":45,"++":46,"--":47,"=":48,"EXPRESSION":49,"+":50,"-":51,"*":52,"/":53,"^":54,"%":55,"<":56,">":57,"<=":58,">=":59,"==":60,"!=":61,"||":62,"&&":63,"!":64,"stringLiteral":65,"character":66,"decimal":67,"true":68,"false":69,"INVOKEMETHODPARAMS":70,"System":71,".":72,"out":73,"println":74,"CONDITION":75,"print":76,"if":77,"else":78,"switch":79,"CASE":80,"DEFAULT":81,"case":82,":":83,"default":84,"for":85,"while":86,"DO":87,"do":88,"return":89,"break":90,"continue":91,"$accept":0,"$end":1},
terminals_: {2:"error",6:"EOF",8:"import",9:"identifier",10:";",11:"class",12:"{",14:"}",17:"void",18:"(",20:")",23:"int",24:"double",25:"boolean",26:"char",27:"String",28:",",39:"DOWHILE",46:"++",47:"--",48:"=",50:"+",51:"-",52:"*",53:"/",54:"^",55:"%",56:"<",57:">",58:"<=",59:">=",60:"==",61:"!=",62:"||",63:"&&",64:"!",65:"stringLiteral",66:"character",67:"decimal",68:"true",69:"false",71:"System",72:".",73:"out",74:"println",76:"print",77:"if",78:"else",79:"switch",82:"case",83:":",84:"default",85:"for",86:"while",88:"do",89:"return",90:"break",91:"continue"},
productions_: [0,[3,3],[3,2],[3,1],[3,1],[7,2],[7,1],[4,3],[5,5],[5,4],[13,2],[13,2],[13,1],[13,1],[15,6],[15,6],[15,5],[15,5],[22,1],[22,1],[22,1],[22,1],[22,1],[19,3],[19,1],[29,2],[21,3],[21,2],[30,2],[30,1],[31,1],[31,1],[31,2],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[16,4],[16,3],[43,3],[43,1],[32,3],[32,2],[45,2],[45,2],[44,2],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,3],[49,2],[49,2],[49,1],[49,1],[49,1],[49,1],[49,1],[49,1],[49,1],[33,4],[33,3],[70,3],[70,1],[34,7],[34,6],[34,7],[34,6],[75,3],[35,3],[35,5],[35,5],[36,6],[36,5],[36,5],[36,4],[80,5],[80,4],[80,4],[80,3],[81,3],[81,2],[37,11],[37,10],[38,3],[87,5],[40,3],[40,2],[41,2],[42,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 4:
 console.error('Syntactic error: ' + yytext + ', in the line ' + this._$.first_line + ' and column ' + this._$.first_column); 
break;
}
},
table: [{2:[1,5],3:1,4:2,5:3,6:[1,4],8:[1,6],11:$V0},{1:[3]},{5:8,11:$V0},{6:[1,9]},{1:[2,3]},{1:[2,4]},{9:[1,10]},{9:[1,11]},{6:[1,12]},{1:[2,2]},{10:[1,13]},{12:[1,14]},{1:[2,1]},{11:[2,7]},{13:15,14:[1,16],15:17,16:18,17:$V1,22:20,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6},{14:[1,26],15:27,16:28,17:$V1,22:20,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6},{6:[2,9]},o($V7,[2,12]),o($V7,[2,13]),{9:[1,29]},{9:[1,30],43:31},{9:[2,18]},{9:[2,19]},{9:[2,20]},{9:[2,21]},{9:[2,22]},{6:[2,8]},o($V7,[2,10]),o($V7,[2,11]),{18:[1,32]},o($V8,$V9,{18:[1,33]}),{10:[1,35],28:[1,36],44:34,48:$Va},{19:38,20:[1,39],22:41,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,29:40},{19:42,20:[1,43],22:41,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,29:40},{10:[1,44]},o($Vb,[2,43]),{9:[1,45]},{9:$Vc,18:$Vd,33:56,49:46,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{20:[1,57],28:$Vl},{12:$Vm,21:59},o($Vn,[2,24]),{9:[1,61]},{20:[1,62],28:$Vl},{12:$Vm,21:63},o($Vb,[2,42]),o($V8,[2,44]),{10:[2,50],50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB},{9:$Vc,18:$Vd,33:56,49:78,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:79,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:80,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},o($VC,[2,68],{18:$VD}),o($VC,[2,69]),o($VC,[2,70]),o($VC,[2,71]),o($VC,[2,72]),o($VC,[2,73]),o($VC,[2,74]),{12:$Vm,21:82},{22:41,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,29:83},o($V7,[2,16]),{9:$VE,14:[1,85],16:87,22:99,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,30:84,31:86,32:88,33:89,34:90,35:91,36:92,37:93,38:94,39:$VF,40:96,41:97,42:98,45:101,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN},o($Vn,[2,25]),{12:$Vm,21:110},o($V7,[2,17]),{9:$Vc,18:$Vd,33:56,49:111,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:112,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:113,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:114,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:115,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:116,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:117,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:118,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:119,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:120,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:121,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:122,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:123,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{9:$Vc,18:$Vd,33:56,49:124,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{20:[1,125],50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB},o($VC,[2,66]),o($VC,[2,67]),{9:$Vc,18:$Vd,20:[1,127],33:56,49:128,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk,70:126},o($V7,[2,14]),o($Vn,[2,23]),{9:$VE,14:[1,129],16:87,22:99,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,31:130,32:88,33:89,34:90,35:91,36:92,37:93,38:94,39:$VF,40:96,41:97,42:98,45:101,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN},o($VO,[2,27]),o($VP,[2,29]),o($VP,[2,30]),o($VP,[2,31]),{10:[1,131]},o($VP,[2,33]),o($VP,[2,34]),o($VP,[2,35]),o($VP,[2,36]),o($VP,[2,37]),o($VP,[2,38]),o($VP,[2,39]),o($VP,[2,40]),o($VP,[2,41]),{9:[1,132],43:31},{18:$VD,44:133,46:$VQ,47:$VR,48:$Va},{10:[1,136]},{72:[1,137]},{18:$VS,75:138},{18:$VS,75:140},{18:[1,141]},{18:$VS,75:142},{9:$Vc,10:[1,144],18:$Vd,33:56,49:143,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{10:[1,145]},{10:[1,146]},o($V7,[2,15]),o($VT,[2,51],{52:$Vq,53:$Vr,54:$Vs,55:$Vt}),o($VT,[2,52],{52:$Vq,53:$Vr,54:$Vs,55:$Vt}),o($VU,[2,53],{54:$Vs}),o($VU,[2,54],{54:$Vs}),o($VC,[2,55]),o($VU,[2,56],{54:$Vs}),o($VV,[2,57],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt}),o($VV,[2,58],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt}),o($VV,[2,59],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt}),o($VV,[2,60],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt}),o($VW,[2,61],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx}),o($VW,[2,62],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx}),o([10,20,28,62,83],[2,63],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,63:$VB}),o([10,20,28,62,63,83],[2,64],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz}),o($VC,[2,65]),{20:[1,147],28:[1,148]},o($VC,[2,76]),o($Vn,[2,78],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB}),o($VO,[2,26]),o($VP,[2,28]),o($VP,[2,32]),o($V8,$V9),{10:[1,149]},o($VX,[2,48]),o($VX,[2,49]),o($VP,[2,47]),{73:[1,150]},{12:$Vm,21:151},{9:$Vc,18:$Vd,33:56,49:152,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{12:[1,153]},{9:[1,155],22:154,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6},{12:$Vm,21:156},{10:[1,157],50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB},o($VP,[2,102]),o($VP,[2,103]),o($VP,[2,104]),o($VC,[2,75]),{9:$Vc,18:$Vd,33:56,49:158,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},o($VP,[2,46]),{74:[1,159],76:[1,160]},o($VP,[2,84],{78:[1,161]}),{20:[1,162],50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB},{14:[1,165],80:163,81:164,82:[1,166],84:$VY},{9:[1,168]},{44:169,48:$Va},o($VP,[2,99]),o($VP,[2,101]),o($Vn,[2,77],{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB}),{18:[1,170],75:171},{18:[1,172],75:173},{12:$Vm,21:175,35:174,77:$VH},o([10,12],[2,83]),{14:[1,177],81:176,82:[1,178],84:$VY},{14:[1,179]},o($VP,[2,90]),{9:$Vc,18:$Vd,33:56,49:180,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{83:[1,181]},{44:182,48:$Va},{10:[1,183]},{9:$Vc,18:$Vd,20:[1,184],33:56,49:152,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{10:[1,185]},{9:$Vc,18:$Vd,20:[1,186],33:56,49:152,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{10:[1,187]},o($VP,[2,85]),o($VP,[2,86]),{14:[1,188]},o($VP,[2,88]),{9:$Vc,18:$Vd,33:56,49:189,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},o($VP,[2,89]),{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB,83:[1,190]},{9:$VE,14:[2,96],16:87,22:99,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,30:191,31:86,32:88,33:89,34:90,35:91,36:92,37:93,38:94,39:$VF,40:96,41:97,42:98,45:101,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN},{10:[1,192]},{9:$Vc,18:$Vd,33:56,49:193,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{10:[1,194]},o($VP,[2,80]),{10:[1,195]},o($VP,[2,82]),o($VP,[2,87]),{50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB,83:[1,196]},o($VZ,[2,94],{31:86,16:87,32:88,33:89,34:90,35:91,36:92,37:93,38:94,40:96,41:97,42:98,22:99,45:101,30:197,9:$VE,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,39:$VF,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN}),{9:$VE,14:[2,95],16:87,22:99,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,31:130,32:88,33:89,34:90,35:91,36:92,37:93,38:94,39:$VF,40:96,41:97,42:98,45:101,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN},{9:$Vc,18:$Vd,33:56,49:198,51:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:$Vj,69:$Vk},{10:[1,199],50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB},o($VP,[2,79]),o($VP,[2,81]),o($VZ,[2,92],{31:86,16:87,32:88,33:89,34:90,35:91,36:92,37:93,38:94,40:96,41:97,42:98,22:99,45:101,30:200,9:$VE,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,39:$VF,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN}),o($VZ,[2,93],{16:87,32:88,33:89,34:90,35:91,36:92,37:93,38:94,40:96,41:97,42:98,22:99,45:101,31:130,9:$VE,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,39:$VF,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN}),{10:[1,201],50:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu,57:$Vv,58:$Vw,59:$Vx,60:$Vy,61:$Vz,62:$VA,63:$VB},{9:$V_,45:202},o($VZ,[2,91],{16:87,32:88,33:89,34:90,35:91,36:92,37:93,38:94,40:96,41:97,42:98,22:99,45:101,31:130,9:$VE,23:$V2,24:$V3,25:$V4,26:$V5,27:$V6,39:$VF,71:$VG,77:$VH,79:$VI,85:$VJ,86:$VK,89:$VL,90:$VM,91:$VN}),{9:$V_,45:204},{20:[1,205]},{46:$VQ,47:$VR},{20:[1,206]},{12:$Vm,21:207},{12:$Vm,21:208},o($VP,[2,98]),o($VP,[2,97])],
defaultActions: {4:[2,3],5:[2,4],9:[2,2],12:[2,1],13:[2,7],16:[2,9],21:[2,18],22:[2,19],23:[2,20],24:[2,21],25:[2,22],26:[2,8]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    const { Type } = require('../models/Type');
    const { Error } = require('../models/Error');

    const { Assignment } = require('../controllers/Assignment');
    const { BreakS } = require('../controllers/BreakS');
    const { CaseS } = require('../controllers/CaseS');
    const { Condition } = require('../controllers/Condition');
    const { ContinueS } = require('../controllers/ContinueS');
    const { Declaration } = require('../controllers/Declaration');
    const { DefaultS } = require('../controllers/DefaultS');
    const { DoWhile } = require('../controllers/DoWhile');
    const { ForS } = require('../controllers/ForS');
    const { IfS } = require('../controllers/IfS');
    const { InvokeMethod } = require('../controllers/InvokeMethod');
    const { IterationS } = require('../controllers/IterationS');
    const { Primitive } = require('../controllers/Primitive');
    const { Print } = require('../controllers/Print');
    const { ReturnS } = require('../controllers/ReturnS');
    const { SwitchS } = require('../controllers/SwitchS');
    const { WhileS } = require('../controllers/WhileS');

    var errorList = [];
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip Single Line Comment AND Multiline Comment */
break;
case 2:return 25
break;
case 3:return 90
break;
case 4:return 82
break;
case 5:return 26
break;
case 6:return 11
break;
case 7:return 91
break;
case 8:return 84
break;
case 9:return 88
break;
case 10:return 24
break;
case 11:return 78
break;
case 12:return 69
break;
case 13:return 85
break;
case 14:return 77
break;
case 15:return 8
break;
case 16:return 23
break;
case 17:return 73
break;
case 18:return 76
break;
case 19:return 74
break;
case 20:return 89
break;
case 21:return 27
break;
case 22:return 79
break;
case 23:return 71
break;
case 24:return 68
break;
case 25:return 17
break;
case 26:return 86
break;
case 27:return 12
break;
case 28:return 14
break;
case 29:return 18
break;
case 30:return 20
break;
case 31:return '"'
break;
case 32:return 72
break;
case 33:return 83
break;
case 34:return 10
break;
case 35:return 48
break;
case 36:return 50
break;
case 37:return 51
break;
case 38:return 52
break;
case 39:return 53
break;
case 40:return 54
break;
case 41:return 55
break;
case 42:return 46
break;
case 43:return 47
break;
case 44:return 60
break;
case 45:return 61
break;
case 46:return 57
break;
case 47:return 59
break;
case 48:return 56
break;
case 49:return 58
break;
case 50:return 63
break;
case 51:return 62
break;
case 52:return 64
break;
case 53:return 9
break;
case 54:return 67
break;
case 55:return 66
break;
case 56:return 65
break;
case 57:return 6;
break;
case 58: console.error('Lexical Error: ' + yy_.yytext + ', in the line ' + yy_.yylloc.first_line + ' and column ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\s+)/,/^(?:((\/\*[\s\S]*?\*\/|\/\/.*)))/,/^(?:boolean\b)/,/^(?:break\b)/,/^(?:case\b)/,/^(?:char\b)/,/^(?:class\b)/,/^(?:continue\b)/,/^(?:default\b)/,/^(?:do\b)/,/^(?:double\b)/,/^(?:else\b)/,/^(?:false\b)/,/^(?:for\b)/,/^(?:if\b)/,/^(?:import\b)/,/^(?:int\b)/,/^(?:out\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:return\b)/,/^(?:String\b)/,/^(?:switch\b)/,/^(?:System\b)/,/^(?:true\b)/,/^(?:void\b)/,/^(?:while\b)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:\.)/,/^(?::)/,/^(?:;)/,/^(?:=)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:\^)/,/^(?:%)/,/^(?:\+\+)/,/^(?:--)/,/^(?:==)/,/^(?:!=)/,/^(?:>)/,/^(?:>=)/,/^(?:<)/,/^(?:<=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:((([a-zA-Z_])[a-zA-Z0-9_]*)))/,/^(?:(((([0-9]+))(\.(([0-9]+)))?)))/,/^(?:(((\\')((?:\\(n|t|r|\\|"|\\')|(?:(?!\1).))?)\1)))/,/^(?:(((")((?:\\\1|(?:(?!\1).))*)\1)))/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}