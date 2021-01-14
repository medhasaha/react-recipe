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

export const attributionArray =  [
	{name : "Brooke Lark", url : "https://unsplash.com/@brookelark?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Lily Banse", url : "https://unsplash.com/@lvnatikk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Rachel Park", url : "https://unsplash.com/@therachelstory?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Anna Pelzer", url : "https://unsplash.com/@annapelzer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Alex Munsell", url : "https://unsplash.com/@alexmunsell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Lidye", url : "https://unsplash.com/@1ncreased?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Eaters Collective", url : "https://unsplash.com/@eaterscollective?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Carissa Gan", url : "https://unsplash.com/@carissagan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},
	{name: "Abhishek Sanwa Limbu", url : "https://unsplash.com/@abhishek_sanwa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"},

]