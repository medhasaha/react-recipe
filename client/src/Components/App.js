import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RecipesHome from './RecipesHome.js'
import RecipeSearch from './RecipeSearch.js'
import RecipeDetails from './RecipeDetails.js'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {/*<Route exact path="/">
            <Redirect to="/recipe/home" />
  </Route>*/}
          <Route path="/recipe/home" render={(props) => <RecipesHome {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/search-results/:query" render={(props) => <RecipeSearch {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/details/:id" render={(props) => <RecipeDetails {...props} baseURL={"/recipe"} />} />
        </div>
      </BrowserRouter>    
    </div>
  );
}

export default App;
