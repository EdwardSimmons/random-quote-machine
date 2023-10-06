import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import './App.css';
import QuoteCard from './QuoteCard';

library.add(fab)

function App() {
  return (
    <div className="App">
      <QuoteCard />
    </div>
  );
}

export default App;
