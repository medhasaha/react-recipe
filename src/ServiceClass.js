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
		.catch(error => {console.log("[ServiceClass] recipeAutocompleteAPI error",error)})
}
				
export const recipeSearchAPI =(query) =>{
	let queryURL = CONFIG.RECIPE_SEARCH_URL + `?query=${query}&number=20&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] recipeSearchAPI error",error)})
}

export const recipeDetailsAPI =(id) =>{
	let queryURL = CONFIG.RECIPE_DETAILS_URL + `/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] recipeDetailsAPI error",error)})
}

export const similarRecipesAPI =(id) =>{
	let queryURL = CONFIG.RECIPE_DETAILS_URL + `/${id}/similar?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] recipeDetailsAPI error",error)})
}

export const attributionArray =  [
	{
		background : "background1",
	  name : "Brooke Lark", 
		url : "https://unsplash.com/@brookelark?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background2",
		name: "Lily Banse", 
		url : "https://unsplash.com/@lvnatikk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background3",
		name: "Rachel Park", 
		url : "https://unsplash.com/@therachelstory?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background4",
		name: "Anna Pelzer", 
		url : "https://unsplash.com/@annapelzer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background5",
		name: "Alex Munsell", 
		url : "https://unsplash.com/@alexmunsell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background6",
		name: "Lidye", 
		url : "https://unsplash.com/@1ncreased?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background7",
		name: "Eaters Collective", 
		url : "https://unsplash.com/@eaterscollective?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background8",
		name: "Carissa Gan", 
		url : "https://unsplash.com/@carissagan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background9",
		name: "Abhishek Sanwa Limbu", 
		url : "https://unsplash.com/@abhishek_sanwa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},

]