//stylesheet
import './App.scss';

//style imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faLaptopMedical, faAngleDown} from '@fortawesome/free-solid-svg-icons';

//components
import Header from './Header.js';
import Landing from './Landing.js';
import Homepage from './Homepage.js';
import Search from './Search.js';

library.add(faCoffee, faLaptopMedical, faAngleDown)


function App() {

  return (
    <div className="App">
      <div className="modal">
        <div className="modal-content">
          {/* <span className="close">&times;</span> */}
          <p>NutriCo is currently under construction, the search and journal tools are still functional at the bottom of this page</p>
        </div>
      </div>  
      <Header />
      <Landing />
      <Homepage />
      <Search />
      
      <footer><p>Created at Juno College of Technology &copy; 2022</p></footer>
    </div>
    
    
  );
}

export default App;


