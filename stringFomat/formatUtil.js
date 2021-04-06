
function formatStringRegExp(value, format, event){

    //backSpace입력시 value값 return;
    if(event.originalEvent.inputType === "deleteContentBackward"){
        return value;
    }

    //구분자를 뺀 숫자
    var resultValue = value.replace(/[^a-zA-Z0-9]/gi,'');
    //{...}들 
    var formatValArray = format.split(/[^\{\w+\}]/).filter(e=>e);
    var valTotalLen = 0;
    var captureFormat = format;

    console.log(formatValArray);

    for(var i = 0 ; i < formatValArray.length ; i++){

        let valLen = formatValArray[i].length-2; //format의 {0000}안의 value개수 
        var captureNum = '$'+(i+1);

        captureFormat = captureFormat.replace(formatValArray[i], captureNum); //1$ - 2$ ..... 형식으로 변형
        valTotalLen += valLen; //format기준으로 value 최대길이
        formatValArray[i] = '(\\w{0,'+ String(valLen) +'})'; //정규식 생성.

        if(valTotalLen > resultValue.length){
            if(i === formatValArray.length-1 && valTotalLen === resultValue.length){
                captureFormat = captureFormat.substring(0,  captureFormat.length);
            }else{
                captureFormat = captureFormat.substring(0,  captureFormat.indexOf(captureNum)+2);
            }
            formatValArray = formatValArray.slice(0, i+1);
            break;
        }
    }
    var regExp = new RegExp(formatValArray.join(''))  

    console.log(regExp);
    resultValue = resultValue.replace(regExp, captureFormat); 

     //length 초과 시 
     if(resultValue.length === format.length-(formatValArray.length*2)+1){
        resultValue = resultValue.slice(0, resultValue.length-1)
    }

    let position = resultValue.length; //default position
    let prevPosition = event.target.selectionStart; //textInput 적용전 position

    //textInput에 적용, 적용하면 자동적으로 커서가 맨 뒤로 위치하게 됨.
    $(event.target).val(resultValue);

    //set cursor position , 중간위치에서 수정 시 커서가 그 자리에 있도록.
    if(event.originalEvent.inputType !== "deleteContentBackward"){
        if(resultValue.length > prevPosition && resultValue.substring(prevPosition+1, resultValue.length).replace(/[^0-9]/g,'')){
            position = prevPosition;
        }       
        event.target.setSelectionRange(position,position);
    }
}

$('#formatTextInput').on('input', (event)=>{
    console.log(event.target.selectionStart);
    formatStringRegExp(event.target.value, '{0000}-{00}-{00}', event);
});

$('#format2TextInput').on('input', (event)=>{
    //console.log(event);
    formatStringRegExp(event.target.value, '{0000}년{00}월{00}일', event);
});

$('#format3TextInput').on('input', (event)=>{
    //console.log(event);
    formatStringRegExp(event.target.value, '{00}-{0}-{0000}', event);
}); 

$('#format4TextInput').on('input', (event)=>{
    //console.log(event);
    formatStringRegExp(event.target.value, '[{00}]-[{00}]-[{00}]', event);
});

$('#format5TextInput').on('input', (event)=>{
    //console.log(event);
    formatStringRegExp(event.target.value, '{0000}년{00}월{00}일 {00}시{00}분{00}초', event);
});

$('#format6TextInput').on('input', (event)=>{
    //console.log(event);
    formatStringRegExp(event.target.value, '{0000}년{00}월{00}일 {00}:{00}:{00}', event);
});

$('#format7TextInput').on('input', (event)=>{
    //console.log(event);
    formatStringRegExp(event.target.value, '({000})-{0000}-{0000}({ssss})', event);
});


