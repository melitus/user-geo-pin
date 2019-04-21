import { createContext } from 'react';

const Context = createContext({
    currentUser: null,
    isAuth: false,
    draft:null,
    pins:[],
    currentPin:[]
})

export default Context;