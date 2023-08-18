function storeFn(){
    const subscribers = [];
    let store = {
        game:{
            id:null,
            board:'---------',
            status:null
        },
        gameSymbol:null,
        whoPlaysFirst:null
    };
    const setStore = (newVal) => {
        store = {
            ...store,
            ...newVal
        }
        // Now we inform all subscribers
        subscribers.forEach(e=>e(store));
    };
    const subscribeToStoreChanges = (fun) => {
        subscribers.push(fun);
    }
    return {
        store,
        setStore,
        subscribeToStoreChanges
    }
}
const storeInstance = storeFn();
export {storeInstance};