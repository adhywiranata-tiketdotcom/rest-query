import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { RestQueryProvider } from '../../dist';

import './App.css';

import Fetchable from './components/Fetchable';
import Cacheable from './components/Cacheable';
import Streamable from './components/Streamable';

function OpeningPage() {
  return <h1>Opening Page</h1>
}

function Header() {
  console.log('Render <Header />');
  return (
    <header style={{ borderBottom: '1px solid rgba(0, 0, 0, .1)', padding: 20 }}>
      <strong>POC Navigation</strong>
      <nav>
        <Link to="/">Home</Link><br />
        <Link to="/fetch">Fetching Without Cache</Link><br />
        <Link to="/cache">Cacheable Fetching</Link><br />
        <Link to="/stream">Data Streaming</Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <RestQueryProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <OpeningPage />
            </Route>
            <Route exact path="/fetch">
              <Fetchable />
            </Route>
            <Route exact path="/cache">
              <Cacheable />
            </Route>
            <Route exact path="/stream">
              <Streamable />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </RestQueryProvider>
  );
}

export default App;
