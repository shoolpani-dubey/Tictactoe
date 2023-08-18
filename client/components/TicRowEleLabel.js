function TicRowEleLabel(eleId,value){
    const lbl = document.createElement('label');
    lbl.id = "label_"+eleId;
    lbl.className = "ticeleval";
    lbl.textContent = value;
    return lbl;
}

export {TicRowEleLabel}