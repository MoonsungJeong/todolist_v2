const todolist = document.querySelector('.todolist');
// Collect All child dom under the "dom" and return object 
// Key is first class name
// Value is DOM
function _DOM_SCRAPE(dom){
    let i;
    let obj={};
    if(!dom.hasChildNodes()){
        return 0;
    }
    for(i=0; i < dom.children.length; i++){
        Object.assign(obj,_DOM_SCRAPE(dom.children[i]))
        obj[dom.children[i].classList[0]] = dom.children[i];
    }
    return obj;
}
function _ADD_BTN(e){
    const txt = this['text-input'];
    const num = ++this['count'];
    if(txt.value === ""){
        return false;
    } 
    /*
    const node=`
    <li class="${num} flex line-top">
        <div class="btn-check _col_xs-10 _center no_check"><i class="far fa-check-circle"></i></div>
        <div class="bar-text _col_xs-80 _padding-left">${txt.value}</div>
        <div class="btn-delete _col_xs-10 _center"><i class="fas fa-times"></i></div>
    </li>`
    */
    let li = document.createElement('li');
    let div_1 = document.createElement('div');
    let div_2 = document.createElement('div');
    let div_3 = document.createElement('div');
    let i_1 = document.createElement('i');
    let i_3 = document.createElement('i');
    
    li.classList.add(num);
    li.classList.add('item');
    li.classList.add('flex');
    li.classList.add('line-top');
    li.classList.add('draggable');   
    li.setAttribute("draggable", "true"); 
    li.addEventListener('dragstart',function(){ li.classList.add('dragging'); });
    li.addEventListener('dragend',function(){ li.classList.remove('dragging'); });
    
    div_1.classList.add('btn-check');
    div_1.classList.add('_col_xs-10');
    div_1.classList.add('_center');
    div_1.classList.add('no_check');
    div_1.addEventListener('click',_CLICK_BTN.bind(this), false);
    
    div_2.classList.add('bar-text');
    div_2.classList.add('_col_xs-80');
    div_2.classList.add('_padding-left');
    
    div_3.classList.add('btn-delete');
    div_3.classList.add('_col_xs-10');
    div_3.classList.add('_center');
    div_3.classList.add('_opacity02');
    div_3.addEventListener('click',_DELETE_BTN.bind(this), false);
    
    i_1.classList.add('far');
    i_1.classList.add('fa-check-circle');
    i_3.classList.add('fas');
    i_3.classList.add('fa-times');

    div_1.appendChild(i_1);
    div_2.innerHTML = txt.value;
    div_3.appendChild(i_3);
    li.appendChild(div_1);
    li.appendChild(div_2);
    li.appendChild(div_3);
    this['list'].appendChild(li);
    this[num] = li;
    txt.value="";
    txt.focus();
    this['btn-add'].style.opacity="0.5";

    this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);
    _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
    _LIST_COUNT.bind(this)();
}
function keyUpHandler(e){
    const txt = this['text-input'];
    if(txt.value !== ""){
        if(e.keyCode === 13){
            // List Add Function!!
            _ADD_BTN.bind(this)();
            this['btn-add'].style.opacity="0.5";
            return 0;
        }
        this['btn-add'].style.opacity="1"; 
        return 0;         
    }
    this['btn-add'].style.opacity="0.5";
}
function _CLICK_BTN(e){
    let i;
    let node = e.target;
    let items = this['list'].children;
    if(!node.hasChildNodes()) 
        node = node.parentNode;
    _CLASS_CHECK_ADD_REMOVE(node,"no_check");
    _CLASS_CHECK_ADD_REMOVE(node,"check");
    _CLASS_CHECK_ADD_REMOVE(node.nextElementSibling,"check");
    _CLASS_CHECK_ADD_REMOVE(node.parentNode,"check");
    _LIST_COUNT.bind(this)();

    // below code is changing complete-btn
    for(i=0; i < items.length; i++){
        if(!items[i].firstChild.classList.contains("check")){
            this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);
            _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
            return;
        }
    }
    this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_CHECK(),this['btn-complete-all'].firstChild);        
    _CLASS_CHECK_ADD(this['btn-complete-all'],"check");
    return;
}
function _DELETE_BTN(e){
    if (confirm("Are you Sure?")) {
        let node = e.target;
        if(!node.hasChildNodes()) 
            node = node.parentNode;
        node.parentNode.remove();

        _LIST_COUNT.bind(this)();
    }
}
function _COMPLETE_BTN(e){
    let i;
    let btn = this['btn-complete-all'];
    let bool = btn.classList.contains("check");
    let items = this['list'].children;
    if(!items.length) return;
    if(!bool){
        for(i=0; i < items.length; i++){
            _CLASS_CHECK_REMOVE(items[i].children[0],"no_check");
            _CLASS_CHECK_ADD(items[i].children[0],"check");
            _CLASS_CHECK_ADD(items[i].children[1],"check");
            _CLASS_CHECK_ADD(items[i],"check");
        }
        _CLASS_CHECK_ADD_REMOVE(btn,"check");
        btn.replaceChild(_CREATE_COMPLETE_BTN_CHECK(),btn.firstChild)
        _ITEM_NUM_CHECK.bind(this)();
        return;
    }
    for(i=0; i < items.length; i++){
        _CLASS_CHECK_REMOVE(items[i].children[0],"check");
        _CLASS_CHECK_REMOVE(items[i].children[1],"check");
        _CLASS_CHECK_REMOVE(items[i],"check");
        _CLASS_CHECK_ADD(items[i].children[0],"no_check");
    }
    _CLASS_CHECK_ADD_REMOVE(btn,"check");
    btn.replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),btn.firstChild)    
    _ITEM_NUM_CHECK.bind(this)();
    return;
}
//_LIST_COUNT.bind(this)();
function _LIST_COUNT(e){
    if(!this['list'].children.length){
        //list is empty
        this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);//btn-complete icon change
        _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
        this['btn-complete-all'].style.opacity="0.5";
        _CLASS_CHECK_REMOVE(this['box-menu'],"flex");
        _CLASS_CHECK_ADD(this['box-menu'],"hide");
        return;   
    }
    //list is not empty
    this['btn-complete-all'].style.opacity="1";
    _CLASS_CHECK_REMOVE(this['box-menu'],"hide");
    _CLASS_CHECK_ADD(this['box-menu'],"flex");
    _ITEM_NUM_CHECK.bind(this)();
    return;
}
function _ITEM_NUM_CHECK(e){
    let i;
    let num=0;
    let str;
    let items = this['list'].children;
    for(i=0; i < items.length; i++){
        if(!items[i].firstChild.classList.contains("check"))
            num++;
    }
    switch(num){
        case 0:
            str = "0 item left"
            break;
        case 1:
            str = "1 item left"
            break;
        default:
            str = num+" items left"
    }
    this['item-monitor'].innerHTML = str;
}
function _DISPLAY_ALL(e){
    let i;
    let items = this['box-filter'];
    let list = this['list'];
    for(i=0; i < items.children.length; i++){
        _CLASS_CHECK_REMOVE(items.children[i],"selected");
        _CLASS_CHECK_ADD(items.children[i],"line");
    }
    _CLASS_CHECK_REMOVE(items.children[0],"line");
    _CLASS_CHECK_ADD(items.children[0],"selected");
    for(i=0; i < list.children.length; i++){
        list.children[i].style.display = "flex";
    }
}
function _DISPLAY_ACTIVE(e){
    let i;
    let items = this['box-filter'];
    let list = this['list'];
    for(i=0; i < items.children.length; i++){
        _CLASS_CHECK_REMOVE(items.children[i],"selected");
        _CLASS_CHECK_ADD(items.children[i],"line");
    }
    _CLASS_CHECK_REMOVE(items.children[1],"line");
    _CLASS_CHECK_ADD(items.children[1],"selected"); 
    for(i=0; i < list.children.length; i++){
        if(list.children[i].classList.contains("check"))
            list.children[i].style.display = "none";
        else
            list.children[i].style.display = "flex";
    }
}
function _DISPLAY_COMPLETED(e){
    let i;
    let items = this['box-filter'];
    let list = this['list'];
    for(i=0; i < items.children.length; i++){
        _CLASS_CHECK_REMOVE(items.children[i],"selected");
        _CLASS_CHECK_ADD(items.children[i],"line");
    }
    _CLASS_CHECK_REMOVE(items.children[2],"line");
    _CLASS_CHECK_ADD(items.children[2],"selected");
    for(i=0; i < list.children.length; i++){
        if(list.children[i].classList.contains("check"))
            list.children[i].style.display = "flex";
        else
            list.children[i].style.display = "none";
    }
}
function _CLEAR_BTN(e){
    let i;
    if (confirm("Are you Sure?")) {
        let list = this['list'];
        for(i=0; i < list.children.length; i++){
            if(list.children[i].classList.contains("check")){
                list.children[i].remove();
                i--;
            }
        }
        this['btn-complete-all'].replaceChild(_CREATE_COMPLETE_BTN_NOCHECK(),this['btn-complete-all'].firstChild);
        _CLASS_CHECK_REMOVE(this['btn-complete-all'],"check");
        _LIST_COUNT.bind(this)();
    }
}
function _TITLE_BTN(e){
    var person = prompt("Title Change", "Todolist");
    if( person !== null){
        this['head-list'].innerHTML = person;
    }
}
function _DRAG_OVER(e){
    e.preventDefault();
    const afterElement = getDragAfterElement(this, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
        this.appendChild(draggable)
    } else {
        this.insertBefore(draggable, afterElement)
    }
}
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
        } else {
        return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function _LIST_INIT(dom){
    const DOM = _DOM_SCRAPE(dom);
    DOM['count']=0;
    DOM['text-input'].addEventListener('keyup',keyUpHandler.bind(DOM), false);
    DOM['btn-add'].addEventListener('click',_ADD_BTN.bind(DOM), false);
    DOM['btn-complete-all'].addEventListener('click',_COMPLETE_BTN.bind(DOM), false);
    DOM['all'].addEventListener('click',_DISPLAY_ALL.bind(DOM), false);
    DOM['active'].addEventListener('click',_DISPLAY_ACTIVE.bind(DOM), false);
    DOM['completed'].addEventListener('click',_DISPLAY_COMPLETED.bind(DOM), false);
    DOM['btn-clear'].addEventListener('click',_CLEAR_BTN.bind(DOM), false);    
    DOM['btn-list'].addEventListener('click',_TITLE_BTN.bind(DOM), false);
    DOM['list'].addEventListener('dragover',_DRAG_OVER,false); 
}
_LIST_INIT(todolist);


