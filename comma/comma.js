Number.prototype.commaFormat = function(){
    if(this==0) return 0;
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

String.prototype.commaFormat = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0"; 
    return num.commaFormat();
};
