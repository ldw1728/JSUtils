// -------modal 생성 함수들--------------------------------------
function disableSet(modal){
    //modal을 제외한 요소들을 비활성 하기위한 div적용
    var div = document.createElement('div');
    div.style = 'background:rgba(0,0,0,0.4);position:absolute;width:100%;height:100%;';
    div.appendChild(modal);
    document.body.prepend(div);
}

function basicModal(options){

    const container = document.createElement('div');
    const text = document.createElement('div');
    const button = document.createElement('button');
    const contents = document.createElement('div');

    container.className = 'modalContainer';
    
    contents.id = 'modalContents';
    
    text.className = 'message';
    text.innerText = options.title;
    
    button.type = 'button';
    button.className = 'button';
    button.id = 'confirm';
    button.innerText = '확인';

    container.appendChild(text);
    container.appendChild(contents);
    container.appendChild(button);

    if(options.type[0] === 'basic' && options.contentsStr){
        contents.innerHTML += options.contentsStr[0];
    }

    if(options.contentsStr.length > 0){
        const button2 = document.createElement('button');
        button2.type = 'button';
        button2.id = 'cancel';
        
        button2.innerText = '취소';
    
        container.appendChild(button2);
    }
    document.body.appendChild(container);

    disableSet(container);
}

function inputModal(options){

    basicModal(options);

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    const contents = document.querySelector('#modalContents');

    for(let i = 0 ; i < options.contentsStr.length ; i++){
        let type = options.type[1];
        let contentsStr = options.contentsStr[i];
        tbody.innerHTML += '<tr><td>'+contentsStr+'</td><td><input name="inputContents" value="'+ (type !== 'text' ? contentsStr : '')+'" type="'+type+'"/></tr>';
    }
    contents.appendChild(table);

};

const modals    = new Map([['basic',basicModal], ['input', inputModal]]);
const getValues = new Map([['basic', null], ['input', getValue]]);



// -----------------------------------------------------------------

function getValue(modal, type){

    var input = modal.querySelectorAll('input[type="'+type+'"]');
    
    if(!input) {
        return ;
    }
    else
        return Array.from(input).map(e=>{
            if(type === 'checkbox' || type === 'radio'){
                if(e.checked) return e.value; 
                else return '';
            }
            return e.value;
        });
}

//modal창 생성시 keyEvent
function keyDownEvent(){

    var confirmBtn = document.querySelector('#confirm');
    var cancelBtn = document.querySelector('#cancel');
    
    window.onkeydown = (e)=>{
        
        if(!document.querySelector('.modalContainer')){
            window.onkeydown = null; //keyEvent 종료
            return;
        }
        if(e.keyCode === 37 || e.keyCode === 9){
            confirmBtn.focus();
        }
        else if(cancelBtn && e.keyCode === 39){            
                cancelBtn.focus();
        }
    }
}

function regEvent(selector, status){

    var modal = document.querySelector('.modalContainer');
    var type = createModal.prototype.options.type[0];

    document.querySelector(selector).addEventListener('click', ()=>{
        let resultTmp = {
            status: status,
            value: type ==='basic' || !status ? [] : getValue(modal, createModal.prototype.options.type[1]),
        }
        this(resultTmp);
        modal.parentNode.remove(); //modal 종료
    });
}

function promiseModal(){
    keyDownEvent();

    return new Promise((resolve, reject)=>{  
        regEvent.call(resolve, '#confirm', true);

        if(document.querySelector('#cancel')){
            regEvent.call(resolve, '#cancel', false);
        }
    });
}

//modal창 생성
function createModal(options){
    createModal.prototype.options = options;
    
    modals.get(options.type[0])(options);
    
    return promiseModal(options);
}





