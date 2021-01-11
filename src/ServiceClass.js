import CONFIG from './Config.js'
					
export const recipeAutocompleteAPI =(query) =>{
	let queryURL = CONFIG.RECIPES_AUTOCOMPLETE + `?query=${query}&number=10&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] recipeAutocompleteAPI error",error);})
}