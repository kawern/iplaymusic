import './TopBar.scss'

import { IoIosArrowBack, IoSearchSharp } from 'react-icons/all'

const TopBar = () => {

    function goBack() {
        window.history.back();
      }

      var path = window.location.pathname;
      var page = path.split("/").pop();
      console.log( page );
      
    return (
    <div className="TopBar">
<p><IoIosArrowBack onClick={goBack}/></p>
<p className="pageName">{page}</p>
<p><IoSearchSharp/></p>
    </div> );
}
 
export default TopBar;