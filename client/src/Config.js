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
const RECIPE_VIDEOS_URL = BASE_URL_RECIPE + `/getRecipeVideos`;
const MENU_ITEMS_SEARCH_URL = BASE_URL_RECIPE + `/getMenuItems`;
const PRODUCTS_SEARCH_URL = BASE_URL_RECIPE + `/getProducts`;

const INGREDIENT_SEARCH_URL = BASE_URL_RECIPE + `/getRecipesByIngredient`
const RECIPE_DETAILS_URL = BASE_URL_RECIPE + `/getRecipeDetails`;
const SIMILAR_RECIPES_URL = BASE_URL_RECIPE + `/getSimilarRecipes`;
const RANDOM_RECIPES = BASE_URL_RECIPE + `/getRandomRecipes`;
const RECIPES_AUTOCOMPLETE = BASE_URL_RECIPE + `/recipeAutocomplete`;
const RECIPE_EQUIPMENTS = BASE_URL_RECIPE + `/getRecipeEquipments`;

const LOGIN_URL = BASE_URL_USER + `/login`;
const SIGNUP_URL = BASE_URL_USER + `/signup`;
const DASHBOARD_URL = BASE_URL_USER + `/dashboard`;
const USER_URL =  BASE_URL_USER + `/user`
const CREATE_COOKBOOK_URL =  BASE_URL_USER + `/createCookbook`;
const CHANGE_COOKBOOK_URL =  BASE_URL_USER + `/changeCookbook`;
const CHANGE_COOKBOOK_NAME_URL =  BASE_URL_USER + `/changeCookbookName`;
const DELETE_COOKBOOK_URL = BASE_URL_USER + `/deleteCookbook`;
const GET_BOOKMARKED_RECIPES_URL =  BASE_URL_USER + `/getBookmarkedRecipes`
const BOOKMARK_RECIPE_URL =  BASE_URL_USER + `/bookmarkRecipe`
const DELETE_BOOKMARK_URL =  BASE_URL_USER + `/deleteBookmark`


export default {
	RECIPES_AUTOCOMPLETE,
    RECIPE_SEARCH_URL,
	RECIPE_VIDEOS_URL,
	MENU_ITEMS_SEARCH_URL,
    INGREDIENT_SEARCH_URL,
	PRODUCTS_SEARCH_URL,
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
	BOOKMARK_RECIPE_URL,
	DELETE_BOOKMARK_URL,
	CHANGE_COOKBOOK_URL,
	CHANGE_COOKBOOK_NAME_URL,
	DELETE_COOKBOOK_URL
};