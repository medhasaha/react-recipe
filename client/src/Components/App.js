import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RecipesHome from './RecipesHome.js'
import RecipeSearch from './RecipeSearch.js'
import RecipeDetails from './RecipeDetails.js'
import LogIn from './LogIn.js'
import SignUp from './SignUp.js'
import Dashboard from './Dashboard.js'

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {/*<Route exact path="/">
            <Redirect to="/recipe/home" />
          </Route>*/}
          {/*<Redirect from="/" to="/recipe/home" />*/}
          <Route exact path="/" render={(props) => {props.history.push({pathname: `/recipe/home`}); return null}} />
          <Route path="/recipe/home" render={(props) => <RecipesHome {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/search-results" render={(props) => <RecipeSearch {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/details/:id" render={(props) => <RecipeDetails {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/login" render={(props) => <LogIn {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/signup" render={(props) => <SignUp {...props} baseURL={"/recipe"} />} />
          <Route path="/recipe/dashboard" render={(props) => <Dashboard {...props} baseURL={"/recipe"} />} />
        </div>
      </BrowserRouter>    
    </div>
  );
}

export default App;
