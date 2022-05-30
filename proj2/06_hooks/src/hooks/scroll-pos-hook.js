
import {useState, useEffect} from 'react';
function useScrollPosition(){
    const [scrollPos, setScrollPos] = useState(0);
    useEffect(()=>{
        const handleScroll = ()=> {
            console.log(window.scrollY);
            setScrollPos(window.scrollY);
        }
        document.addEventListener('scroll',handleScroll);
        return ()=> {
            document.removeEventListener("scroll",handleScroll)
        }
    },[]);
    return scrollPos;
}

export default useScrollPosition;