import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Recipes from './Recipes.js'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path="/">
            <Redirect to="/recipe" />
          </Route>
          <Route path="/recipe" render={(props) => <Recipes {...props} baseURL={"/recipe"} />} />
        </div>
      </BrowserRouter>    
    </div>
  );
}

export default App;
