//stylesheet
import './App.scss';

//style imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faLaptopMedical, faAngleDown} from '@fortawesome/free-solid-svg-icons';

//components
import Header from './Header.js';
import Landing from './Landing.js';
import Homepage from './Homepage.js';
import Journal from './Journal.js';

library.add(faCoffee, faLaptopMedical, faAngleDown)


function App() {

  return (
    <div className="App">
      <Header />
      <Landing />
      <Homepage />
      <Journal />
      
      <footer><p>Created at Juno College of Technology &copy; 2022</p></footer>
    </div>
    
    
  );
}

export default App;


