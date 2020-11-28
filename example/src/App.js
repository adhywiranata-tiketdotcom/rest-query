import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { RestQueryProvider } from '../../dist';

import './App.css';

import UseCaseOne from './components/UseCaseOne';
import UseCaseTwo from './components/UseCaseTwo';

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
        <Link to="/one">Use Case 1: Basic Fetching</Link><br />
        <Link to="/two">Use Case 2: Data Streaming</Link>
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
            <Route exact path="/one">
              <UseCaseOne />
            </Route>
            <Route exact path="/two">
              <UseCaseTwo />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </RestQueryProvider>
  );
}

export default App;
