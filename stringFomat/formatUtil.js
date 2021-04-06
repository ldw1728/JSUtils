
function formatStringRegExp(value, format, event){
    //구분자를 뺀 숫자
    var valueTmp = value.replace(/[^a-zA-Z0-9]/gi,'');
    //{...}들 
    var formatValArray = format.split(/[^\{\w+\}]/).filter(e=>e);
    console.log(formatValArray);
    var formatValLen = 0;
    var formatTmp = format;

    //backSpace입력시 value값 return;
    if(event.originalEvent.inputType === "deleteContentBackward"){
        let formatTmp = format.replace(/[\{\}]/g,'' );
        for(let i = 0 ; i < formatValArray.length ; i++){
            
        }
        console.log(formatTmp);
        return value;
    }
    
        
    for(var i = 0 ; i < formatValArray.length ; i++){

        var captureNum = '$'+(i+1);
        formatTmp = formatTmp.replace(formatValArray[i], captureNum);
        formatValLen += formatValArray[i].length-2;
        formatValArray[i] = '(\\w{0,'+ String(formatValArray[i].length-2) +'})';

        if(formatValLen > valueTmp.length){
            if(i === formatValArray.length-1 && formatValLen === valueTmp.length){
                formatTmp = formatTmp.substring(0,  formatTmp.length);
            }else{
                formatTmp = formatTmp.substring(0,  formatTmp.indexOf(captureNum)+2);
            }
            formatValArray = formatValArray.slice(0, i+1);
            break;
        }
    }
    var regExp = new RegExp(formatValArray.join(''))  

    console.log(regExp);
    valueTmp = valueTmp.replace(regExp,formatTmp);

    //length 초과 시 
    if(valueTmp.length === format.length-(formatValArray.length*2)+1){
        return valueTmp.slice(0, valueTmp.length-1);
    }
    
    return valueTmp;
}

$('#dateTextInput').on('input', (event)=>{
    //console.log(event.target.value);
    $(event.target).val(formatString(event.target.value, "1234-56-78"));
});

$('#timeTextInput').on('input', (event)=>{
    //console.log(event.target.value);
    
    $(event.target).val(formatStringRegExp(event.target.value, '{00}:{00}:{00}', event));
});

$('#formatTextInput').on('input', (event)=>{
    console.log(event.target.selectionStart);
    $(event.target).val(formatStringRegExp(event.target.value, '{0000}-{00}-{00}', event));
    event.target.selectionStart = event.target.event-1;
    
});

$('#format2TextInput').on('input', (event)=>{
    //console.log(event);
    $(event.target).val(formatStringRegExp(event.target.value, '{0000}년{00}월{00}일', event));
});

$('#format3TextInput').on('input', (event)=>{
    //console.log(event);
    $(event.target).val(formatStringRegExp(event.target.value, '{00}-{0}-{0000}', event));
}); 

$('#format4TextInput').on('input', (event)=>{
    //console.log(event);
    $(event.target).val(formatStringRegExp(event.target.value, '[{00}]-[{00}]-[{00}]', event));
});

$('#format5TextInput').on('input', (event)=>{
    //console.log(event);
    $(event.target).val(formatStringRegExp(event.target.value, '{0000}년{00}월{00}일 {00}시{00}분{00}초', event));
});

$('#format6TextInput').on('input', (event)=>{
    //console.log(event);
    $(event.target).val(formatStringRegExp(event.target.value, '{0000}년{00}월{00}일 {00}:{00}:{00}', event));
});

$('#format7TextInput').on('input', (event)=>{
    //console.log(event);
    $(event.target).val(formatStringRegExp(event.target.value, '({000})-{0000}-{0000}({ssss})', event));
});


