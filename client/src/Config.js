// const BASE_URL = "https://api.spoonacular.com"
const BASE_URL_RECIPE = "/recipes"
const BASE_URL_USER = "/user"
const SPLASH_URL = "https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText";
let id = 1;
const IMAGE_URL_RECIPE = " https://spoonacular.com/recipeImages/";
const IMAGE_URL_PRODUCT = "https://spoonacular.com/productImages/";
const IMAGE_URL_INGREDIENT = "https://spoonacular.com/cdn/ingredients"
const IMAGE_URL_EQUIPMENT = "https://spoonacular.com/cdn/equipment"

const RECIPE_SEARCH_URL = BASE_URL_RECIPE + `/getRecipes`;
const INGREDIENT_SEARCH = BASE_URL_RECIPE + `/recipes/findByIngredients`
const RECIPE_DETAILS_URL = BASE_URL_RECIPE + `/getRecipeDetails`;
const SIMILAR_RECIPES_URL = BASE_URL_RECIPE + `/getSimilarRecipes`;
const RANDOM_RECIPES = BASE_URL_RECIPE + `/getRandomRecipes`;
const RECIPES_AUTOCOMPLETE = BASE_URL_RECIPE + `/recipeAutocomplete`;
const RECIPE_EQUIPMENTS = BASE_URL_RECIPE + `/getRecipeEquipments`;

const LOGIN_URL = BASE_URL_USER + `/login`;
const SIGNUP_URL = BASE_URL_USER + `/signup`;
const DASHBOARD_URL = BASE_URL_USER + `/dashboard`;
const USER_URL =  BASE_URL_USER + `/user`
const CREATE_COOKBOOK_URL =  BASE_URL_USER + `/createCookbook`
const GET_BOOKMARKED_RECIPES_URL =  BASE_URL_USER + `/getBookmarkedRecipes`
const BOOKMARK_RECIPE_URL =  BASE_URL_USER + `/bookmarkRecipe`


export default {
	RECIPES_AUTOCOMPLETE,
    RECIPE_SEARCH_URL,
    INGREDIENT_SEARCH,
	RECIPE_DETAILS_URL,
	SIMILAR_RECIPES_URL,
	RANDOM_RECIPES,
	RECIPE_EQUIPMENTS,
	SPLASH_URL,
	IMAGE_URL_RECIPE,
	IMAGE_URL_PRODUCT,
	IMAGE_URL_INGREDIENT,
	IMAGE_URL_EQUIPMENT,
	LOGIN_URL,
	SIGNUP_URL,
	DASHBOARD_URL,
	USER_URL,
	CREATE_COOKBOOK_URL,
	GET_BOOKMARKED_RECIPES_URL,
	BOOKMARK_RECIPE_URL
};