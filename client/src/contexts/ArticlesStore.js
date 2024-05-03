import {useState} from 'react';
import { ArticlesContext } from './ArticlesContext';
function ArticlesStore({children}){
    let [articles,setArt]=useState([]);
    return(
        <ArticlesContext.Provider value={[articles,setArt]}>
            {children}
        </ArticlesContext.Provider>
    );
}
export default ArticlesStore;