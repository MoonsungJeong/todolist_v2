function _CLASS_CHECK_ADD_REMOVE(elementName, className){
    var bool = elementName.classList.contains(className);
    if(!bool){
        elementName.classList.add(className);
        return;
    }
    elementName.classList.remove(className);
    return;
}
function _CLASS_CHECK_REMOVE(elementName, className){
    var bool = elementName.classList.contains(className);
    if(!bool) return;
    
    elementName.classList.remove(className);
    return;
}
function _CLASS_CHECK_ADD(elementName, className){
    var bool = elementName.classList.contains(className);
    if(bool) return;
    
    elementName.classList.add(className);
    return;
}
function _CREATE_COMPLETE_BTN_NOCHECK(){
    //<i class="fas fa-list-ul"></i>
    let li = document.createElement('i');
    li.classList.add('fas');
    li.classList.add('fa-list-ul');
    return li;
}
function _CREATE_COMPLETE_BTN_CHECK(){
    //<i class="fas fa-tasks"></i>
    let li = document.createElement('i');
    li.classList.add('fas');
    li.classList.add('fa-tasks');
    return li;
}