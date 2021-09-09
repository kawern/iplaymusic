import './TopBar.scss'

import { IoIosArrowBack, IoSearchSharp } from 'react-icons/all'

const TopBar = () => {

    function goBack() {
        window.history.back();
      }
    return (
    <div className="TopBar">
<p><IoIosArrowBack onClick={goBack}/></p>
<p><IoSearchSharp/></p>
    </div> );
}
 
export default TopBar;