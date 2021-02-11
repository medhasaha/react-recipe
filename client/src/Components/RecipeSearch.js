import React, {Component} from 'react';
import {recipeSearchAPI} from '../ServiceClass.js'
import RecipeCard from './RecipeCard.js';
import CONFIG from '../Config.js';
import NavBar from './NavBar.js';
import DrawerJSX from './DrawerJSX';
import queryString from "query-string";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';

const sample = {
	"results": [
	{
	"id": 1161745,
	"title": "Cake Balls",
	"image": "https://spoonacular.com/recipeImages/1161745-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636754,
	"title": "Cake De Naranja",
	"image": "https://spoonacular.com/recipeImages/636754-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 1499853,
	"title": "Cake Mix Donuts",
	"image": "https://spoonacular.com/recipeImages/1499853-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636756,
	"title": "Cake Batter Chocolates",
	"image": "https://spoonacular.com/recipeImages/636756-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636768,
	"title": "Cake with wine and olive oil",
	"image": "https://spoonacular.com/recipeImages/636768-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 1025438,
	"title": "Cake Mix Cookie Bars Brownie",
	"image": "https://spoonacular.com/recipeImages/1025438-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636766,
	"title": "Cake with lemon, rosewater and pistachios",
	"image": "https://spoonacular.com/recipeImages/636766-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 641745,
	"title": "Dump Cake",
	"image": "https://spoonacular.com/recipeImages/641745-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 656444,
	"title": "Plum Cake",
	"image": "https://spoonacular.com/recipeImages/656444-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 654018,
	"title": "Oreo Cake",
	"image": "https://spoonacular.com/recipeImages/654018-312x231.jpg",
	"imageType": "jpg"
	}
	],
	"offset": 0,
	"number": 10,
	"totalResults": 453
	}
const style = theme => ({
	root : {
		backgroundColor: "rgba(255, 255, 255, 0.65)",
		// backgroundColor: "#212121",
		display : "flex",
	},
	header : {
		margin : "104px 60px 0px 300px", 
	},
	overlay : {
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			width: "100%",
			height: "100%",
			alignItems : "center",
			justifyContent : "center",
			display : "flex",
	},
	headerTitle : {
		// color : "#fff",
		// fontFamily : "Oleo Script Swash Caps"
	},
	drawer : {
		width : "220px",
	},
	drawerPaper : {
		width : "220px",
		border : "none",
		marginTop : "104px",
		paddingLeft : "20px",
		background : "transparent",
		"&::-webkit-scrollbar" : {
			width: "0.3em",
		},
		"&::-webkit-scrollbar-track" : {
			boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
		},
		"&::-webkit-scrollbar-thumb" : {
			backgroundColor: "darkgrey",
			outline: "1px solid slategrey",
		}
	},
	drawerContainer : {

	}
})

class RecipeSearch extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeSearch: ",props)
		let query_string = queryString.parse(props.location.search)
		const savedRecipes = sessionStorage.getItem('recipes');
		this.state = {
			results : [],
			isLoaded : false,
			query : query_string.query || "",
			selectedCuisine : query_string.cuisine || "",
			selectedDiet : query_string.diet || "",
			selectedTolerance : query_string.intolerances || "",
			selectedMealType : query_string.mealType || "",
			sortParameter : query_string.sortParameter || "",
			number : query_string.number || 20,
			offset : query_string.offset || 0,
			bookmarkedRecipes : JSON.parse(savedRecipes) || []
		}
	}

	componentDidMount(){
		if (this.props && this.props.location && this.props.location.state && this.props.location.state.data) {
			let query_string = queryString.parse(this.props.location.search)
      this.setState({
        results: this.props.location.state.data.results && this.props.location.state.data.results,
				query : query_string.query || "",
				selectedCuisine : query_string.cuisine || "",
				selectedDiet : query_string.diet || "",
				selectedTolerance : query_string.intolerances || "",
				selectedMealType : query_string.mealType || "",
				sortParameter : query_string.sortParameter || "",
				number : query_string.number || 20,
				offset : query_string.offset || 0,
        isLoaded: true
      });
    } else {
			this.searchRecipes(this.state.query, 20, 0, this.state.selectedCuisine, this.state.selectedDiet, this.state.selectedTolerance, this.state.selectedMealType, this.state.sortParameter);
		}
		// this.setState({
		// 	results : sample.results,
		// 	isLoaded : true
		// })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.location.search !== this.props.location.search){
			let currentQuery = queryString.parse(this.props.location.search);
      this.setState({ 
				query : currentQuery.query || "",
				selectedCuisine : currentQuery.cuisine || "",
				selectedDiet : currentQuery.diet || "",
				selectedTolerance : currentQuery.intolerances || "",
				selectedMealType : currentQuery.mealType || "",
				sortParameter : currentQuery.sortParameter || "",
				number : currentQuery.number || 20,
				offset : currentQuery.offset || 0,
				isLoaded: true
			}, () => {
        this.searchRecipes(this.state.query, 20, 0, this.state.selectedCuisine, this.state.selectedDiet, this.state.selectedTolerance, this.state.selectedMealType, this.state.sortParameter);
			});
    }
	}

	searchRecipes = (query, number, offset, cuisine = "", diet = "", intolerances = "", mealType = "", sort = "") => {
		recipeSearchAPI(query, number, offset, cuisine, diet, intolerances, mealType, sort)
		.then(res => {
			// console.log(res)
			this.setState({
				results : res.results,
				isLoaded : true
			}, () => {
				this.props.history.replace(
					`${this.props.history.location.pathname}?query=${this.state.query}&cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&intolerances=${this.state.selectedTolerance}&mealType=${this.state.selectedMealType}&sortParameter=${this.state.sortParameter}&number=${this.state.number}&offset=${this.state.offset}`,
					{ data: { results: res.results } });
			})
		}).catch(err => console.log(err))
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	applyFilter = (values) => {
		this.setState({
			selectedCuisine : values.selectedCuisine.join(),
			selectedDiet : values.selectedDiet.join(),
			selectedTolerance : values.selectedIntolerance.join(),
			selectedMealType : values.selectedMealType.join()
		}, () => {
			this.props.history.replace(
				`${this.props.history.location.pathname}?query=${this.state.query}&cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&intolerances=${this.state.selectedTolerance}&mealType=${this.state.selectedMealType}&sortParameter=${this.state.sortParameter}&number=${this.state.number}&offset=${this.state.offset}`);
		}
		)
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
			  <Grid container className = {classes.root}>

					<Grid item xs = {12}>
						<NavBar home = {true}/>
					</Grid>

					<Grid item xs = {12} className = {classes.header}>
						<Typography variant = "h6" className = {classes.headerTitle}>
							{"Recipes For " + this.state.query}
						</Typography>
		      </Grid>

				  <Grid item xs = {12} style = {{margin : "30px 60px 0px 300px"}}>
					{this.state.isLoaded && this.state.results.length > 0 &&
						<Grid container className = {classes.root} spacing = {4}>
							{this.state.results.map(item => (
								<Grid item xs = {3}>
									<RecipeCard id = {item.id} 
															image = {item.image}
															// image = {CONFIG.IMAGE_URL_RECIPE + item.id + "-480x360.jpg"}
															title = {item.title} 
															// servings = {item.servings}
															// time = {item.readyInMinutes}
															boxShadow = {false}
															redirectToRecipeDetails = {this.redirectToRecipeDetails}
															bookMarkedRecipes = {this.state.bookmarkedRecipes}/>
								</Grid>
							))}
						</Grid>}
					</Grid>

					<Drawer className={classes.drawer} variant="persistent" open = {true} classes={{ paper: classes.drawerPaper,}}>
						<div className={classes.drawerContainer}>
							<DrawerJSX applyFilter = {this.applyFilter} 	
							           selectedCuisine = {this.state.selectedCuisine.split(",")}
												 selectedDiet = {this.state.selectedDiet.split(",")}
												 selectedTolerance = {this.state.selectedTolerance.split(",")}
												 selectedMealType = {this.state.selectedMealType.split(",")}/>
						</div>
					</Drawer>

				</Grid>
			</React.Fragment>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeSearch);