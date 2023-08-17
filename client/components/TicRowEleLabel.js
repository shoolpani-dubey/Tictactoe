function TicRowEleLabel(eleId){
    const lbl = document.createElement('label');
    lbl.id = "label_"+eleId;
    lbl.className = "ticeleval";
    return lbl;
}

export {TicRowEleLabel}