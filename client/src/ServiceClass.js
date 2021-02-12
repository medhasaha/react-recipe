import CONFIG from './Config.js'
					
export const recipeAutocompleteAPI =(query) =>{
	// let queryURL = CONFIG.RECIPES_AUTOCOMPLETE + `?query=${query}&number=10&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	let queryURL = CONFIG.RECIPES_AUTOCOMPLETE + `?query=${query}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] recipeAutocompleteAPI error",error)})
}
				
export const recipeSearchAPI =(query, number, offset, cuisine = "", diet = "", intolerances = "", mealType = "", sortParameter = "") =>{
	// let queryURL = CONFIG.RECIPE_SEARCH_URL + `?query=${query}&number=20&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	let queryURL = CONFIG.RECIPE_SEARCH_URL + `?query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&mealType=${mealType}&sortParameter=${sortParameter}&number=${number}&offset=${offset}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] recipeSearchAPI error",error)})
}

export const randomRecipeAPI =() =>{
	// let queryURL = CONFIG.RANDOM_RECIPES + `?number=6&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	let queryURL = CONFIG.RANDOM_RECIPES
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] randomRecipeAPI error",error)})
}

export const recipeDetailsAPI =(id) =>{
	// let queryURL = CONFIG.RECIPE_DETAILS_URL + `/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	let queryURL = CONFIG.RECIPE_DETAILS_URL + `?id=${id}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] recipeDetailsAPI error",error)})
}

export const similarRecipesAPI =(id) =>{
	// let queryURL = CONFIG.RECIPE_DETAILS_URL + `/${id}/similar?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	let queryURL = CONFIG.SIMILAR_RECIPES_URL + `?id=${id}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] similarRecipesAPI error",error)})
}

export const recipeEquipmentsAPI =(id) =>{
	// let queryURL = CONFIG.RECIPE_EQUIPMENTS + `/${id}/equipmentWidget.json?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	let queryURL = CONFIG.RECIPE_EQUIPMENTS + `?id=${id}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] recipeEquipmentsAPI error",error)})
}

export const loginAPI =(email, password) =>{
	let data = {
		email : email,
		password : password
	}
	let queryURL = CONFIG.LOGIN_URL;
		return fetch(queryURL, {
			method: "POST",
			headers :{"Content-Type":"application/json"},
			body : JSON.stringify(data)
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] loginAPI error",error)})
}

export const dashboardAPI =() =>{
	let queryURL = CONFIG.DASHBOARD_URL;
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] dashboardAPI error",error)})
}

export const signupAPI =(username, email, password) =>{
	let data = {
		username : username,
		email : email,
		password : password,

	}
	let queryURL = CONFIG.SIGNUP_URL;
		return fetch(queryURL, {
			method: "POST",
			headers :{"Content-Type":"application/json"},
			body : JSON.stringify(data)
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] signupAPI error",error)})
}

export const userAPI =(username, email, password) =>{
	let queryURL = CONFIG.USER_URL;
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.result;
		})
		.catch(error => {console.log("[ServiceClass] userAPI error",error)})
}

export const createCookbookAPI =(uuid, cookbookName) =>{
	let data = {
		"uuid" : uuid,
		"cookbookName" : cookbookName
	}
	let queryURL = CONFIG.CREATE_COOKBOOK_URL;
		return fetch(queryURL, {
			method: "POST",
			headers :{"Content-Type":"application/json"},
			body : JSON.stringify(data)
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.result;
		})
		.catch(error => {console.log("[ServiceClass] createCookbookAPI error",error)})
}

export const getBookmarkedRecipesAPI =(cookbookIds) =>{
	let queryURL = CONFIG.GET_BOOKMARKED_RECIPES_URL;
		return fetch(queryURL + `?cookbookIds=${cookbookIds}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.results;
		})
		.catch(error => {console.log("[ServiceClass] getBookmarkedRecipesAPI error",error)})
}

export const bookmarkRecipeAPI =(cookbook_id, recipe_id, recipe_name, image_type) =>{
	let queryURL = CONFIG.BOOKMARK_RECIPE_URL;
	let data = {
		"cookbook_id" : cookbook_id,
		"recipe_id" : recipe_id,
		"recipe_name" : recipe_name,
		"image_type" : image_type
	}
		return fetch(queryURL, {
			method: "POST",
			headers :{"Content-Type":"application/json"},
			body : JSON.stringify(data)
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {console.log("[ServiceClass] bookmarkRecipeAPI error",error)})
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
	{
		background : "background10",
		name: "Annie Spratt", 
		url : "https://unsplash.com/@anniespratt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},
	{
		background : "background11",
		name: "Sarah Holcomb", 
		url : "https://unsplash.com/@society_grace?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
	},

]

export const mealTypes_home = [
	{title : "main course", image : "meal_type_main_course"},
	{title : "dessert", image : "meal_type_dessert"},
	{title : "salad", image : "meal_type_salad"},
	{title : "breakfast", image : "meal_type_breakfast"},
	{title : "drink", image : "meal_type_drink"},
]

export const cuisineTypes = [
	{title : "American", image : "cuisine_type_american"},
	{title : "British", image : "cuisine_type_british"},
	{title : "Mexican", image : "cuisine_type_mexican"},
	{title : "Japanese", image : "cuisine_type_japanese"},
	{title : "Indian", image : "cuisine_type_indian"},
]

export const dietTypes = [
	{title : "Gluten Free", image : "diet_type_gluten_free"},
	{title : "Ketogenic", image : "diet_type_keto"},
	{title : "Vegetarian", image : "diet_type_vegetarian"},
	{title : "Pescetarian", image : "diet_type_pescetarian"},
	{title : "Lacto-Vegetarian", image : "diet_type_lacto_veg"},
]

export const cuisineList = [
	"African",
	"American",
	"British",
	"Cajun",
	"Caribbean",
	"Chinese",
	"Eastern European",
	"European",
	"French",
	"German",
	"Greek",
	"Indian",
	"Irish",
	"Italian",
	"Japanese",
	"Jewish",
	"Korean",
	"Latin American",
	"Mediterranean",
	"Mexican",
	"Middle Eastern",
	"Nordic",
	"Southern",
	"Spanish",
	"Thai",
	"Vietnamese"
]

export const dietList = [
	"Gluten Free", 
	"Ketogenic", 
	"Vegetarian", 
	"Lacto-Vegetarian", 
	"Ovo-Vegetarian",
	"Vegan", 
	"Pescetarian", 
	"Paleo", 
	"Primal", 
	"Whole30"
]

export const intoleranceList = [
	"Dairy",
	"Egg",
	"Gluten",
	"Grain",
	"Peanut",
	"Seafood",
	"Sesame",
	"Shellfish",
	"Soy",
	"Sulfite",
	"Tree Nut",
	"Wheat"
]

export const mealTypeList = [
	"main course",
  "side dish",
	"dessert",
	"appetizer",
	"salad",
	"bread",
	"breakfast",
	"soup",
	"beverage",
	"sauce",
	"marinade",
	"fingerfood",
	"snack",
	"drink"
]

