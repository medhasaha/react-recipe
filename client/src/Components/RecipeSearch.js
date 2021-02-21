import React, {Component} from 'react';
import {recipeSearchAPI, ingredientSearchAPI, recipeVideosAPI} from '../ServiceClass.js'
import RecipeCard from './RecipeCard.js';
import VideoCard from './VideoCard.js';
import CONFIG from '../Config.js';
import NavBar from './NavBar.js';
import DrawerJSX from './DrawerJSX';
import queryString from "query-string";

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Drawer, CircularProgress, Button, Fab, Breadcrumbs,Dialog } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import LogoIcon from '../Assets/Icons/LogoColor.svg'

const style = theme => ({
	root : {
		backgroundColor: "rgba(255, 255, 255, 0.65)",
		// backgroundColor: "#212121",
		display : "flex",
	},
	autocompleteDiv : {
		margin : "104px 60px 0px 300px", 
		display : "flex",
		justifyContent : "flex-end"
	},
	header : {
		margin : "30px 60px 0px 300px", 
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
		fontWeight : "600",
		textTransform : "capitalize"
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

	},
	autocomplete : {
		// backgroundColor : "white",
		display : "inline-flex",
		margin : "0px 2px 0px 0px",
		backgroundColor: "rgba(255, 255, 255, 0.65)",
	},
	textField : {
		"& .MuiFormLabel-root": {
			color: "#932432"//
		},
		"&:hover .MuiFormLabel-root": {
			color: "#932432"
		},
		"& .MuiInputBase-input" : {
			color : "#932432",//
		},
		"&:hover .MuiInputBase-input" : {
			color : "#932432",
		},
		"& .Mui-focused .MuiInputBase-input" : {
			color : "#932432"
		},
		"& .Mui-focused" : {
			color : "#932432",
		},
		"& .MuiOutlinedInput-notchedOutline" : {
			border : "2px solid #932432"//
		},
		"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			border : "2px solid #932432"
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border : "2px solid #932432"
		},
	},
	searchButton : {
		height  : "100%",
		border: "2px solid #932432",
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	searchIcon : {
		color : "white",
		fontSize : "2rem",
		color : "#932432",
		fill : "#932432"
	},
	loader : {
		color : "#932432",
		// height : "60px",
		// width : "60px",
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	loaderLogo : {
		width : "40px",
		height : "40px",
		position: 'absolute',
		top: '50%',
		left: '50%',
	},
	breadcrumbTypo : {
		cursor : "pointer"
	},
	breadcrumbTypoHighlight : {
		cursor : "pointer",
		color : "#932432",
		fontWeight : "600"
	}
})

const sample = [
	{
	"id": 133439,
	"title": "cake",
	"imageType": "jpg"
	},
	{
	"id": 165381,
	"title": "chai",
	"imageType": "jpg"
	},
	{
	"id": 495920,
	"title": "cups",
	"imageType": "jpg"
	},
	{
	"id": 34150,
	"title": "chili",
	"imageType": "jpg"
	},
	{
	"id": 1125636,
	"title": "crema",
	"imageType": "jpg"
	},
	{
	"id": 102861,
	"title": "cacik",
	"imageType": "jpg"
	},
	{
	"id": 630955,
	"title": "craig",
	"imageType": "jpg"
	},
	{
	"id": 117905,
	"title": "champ",
	"imageType": "png"
	},
	{
	"id": 234120,
	"title": "calas",
	"imageType": "jpg?itok=m1zglj97"
	},
	{
	"id": 376278,
	"title": "clams",
	"imageType": "jpeg"
	}
	]

class RecipeSearch extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeSearch: ",props)
		let query_string = queryString.parse(props.location.search)
		this.state = {
			autocompleteOptions : [],
			value : query_string.query || "",
			inputValue : query_string.query || "",
			open : false,
			loading : false,//for autocomplete
			query : query_string.query || "",
			selectedCuisine : query_string.cuisine || "",
			selectedDiet : query_string.diet || "",
			selectedTolerance : query_string.intolerances || "",
			selectedMealType : query_string.mealType || "",
			ingredient : query_string.ingredient || "",
			sortParameter : query_string.sortParameter || "",

			results : [],
			totalRecipes : 0,
			isLoaded : false,
			number : 20,
			offset : 0,
			
			resultsVideos : [],
			numberVideos : 20,
			offsetVideos : 0,
			totalVideos : 0,
			isLoadedVideos : false,
			currentTab : "recipes"
		}
	}

	componentDidMount(){
		if (this.props && this.props.location && this.props.location.state && this.props.location.state.data) {
			let query_string = queryString.parse(this.props.location.search)
      this.setState({
				query : query_string.query || "",
				selectedCuisine : query_string.cuisine || "",
				selectedDiet : query_string.diet || "",
				selectedTolerance : query_string.intolerances || "",
				selectedMealType : query_string.mealType || "",
				ingredient : query_string.ingredient || "",
				sortParameter : query_string.sortParameter || "",

				results: this.props.location.state.data.results && this.props.location.state.data.results,
				totalRecipes :  this.props.location.state.data.totalRecipes && this.props.location.state.data.totalRecipes,
				number : 20,
				offset : 0,
        isLoaded: true,

				resultsVideos : this.props.location.state.data.videos && this.props.location.state.data.videos,
				numberVideos : 20,
				offsetVideos : 0,
				totalVideos :  this.props.location.state.data.totalVideos && this.props.location.state.data.totalVideos,
				isLoadedVideos : true
      });
    } else {
			if(this.state.ingredient)
			  this.searchIngredient(this.state.ingredient, 20, 0);
			else{
			  this.searchRecipes(this.state.query, 20, 0, this.state.selectedCuisine, this.state.selectedDiet, this.state.selectedTolerance, this.state.selectedMealType, this.state.sortParameter);
				this.searchVideos(this.state.query, 20, 0, this.state.selectedCuisine, this.state.selectedDiet, this.state.selectedMealType);
			}
		}
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
				ingredient : currentQuery.ingredient || "",
				totalRecipes :  0,
				number : 20,
				offset : 0,
				isLoaded: false,
				totalVideos :  0,
				numberVideos : 20,
				offsetVideos : 0,
				isLoadedVideos : false
			}, () => {
				if(this.state.ingredient)
					this.searchIngredient(this.state.ingredient, 20, 0);
				else{
          this.searchRecipes(this.state.query, 20, 0, this.state.selectedCuisine, this.state.selectedDiet, this.state.selectedTolerance, this.state.selectedMealType, this.state.sortParameter);
					this.searchVideos(this.state.query, 20, 0, this.state.selectedCuisine, this.state.selectedDiet, this.state.selectedMealType);
				}
			});
    }
	}

	searchRecipes = (query, number, offset, cuisine = "", diet = "", intolerances = "", mealType = "", sort = "") => {
		recipeSearchAPI(query, number, offset, cuisine, diet, intolerances, mealType, sort)
		.then(res => {
			this.setState({
				results : offset === 0 ? res.results : this.state.results.concat(res.results),
				offset : offset,
				isLoaded : true,
				totalRecipes : res.totalResults,
			}, () => {
				this.props.history.replace(
					`${this.props.history.location.pathname}?query=${this.state.query}&cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&intolerances=${this.state.selectedTolerance}&mealType=${this.state.selectedMealType}&ingredient=${this.state.ingredient}&sortParameter=${this.state.sortParameter}`,
					{ data: { results: this.state.results, 
						        videos : this.state.resultsVideos, 
										totalRecipes : this.state.totalRecipes,
									  totalVideos : this.state.totalVideos } });
			})
		}).catch(err => console.log(err))
	}

	searchVideos = (query, number, offset, cuisine = "", diet = "", mealType = "") => {
		recipeVideosAPI(query, number, offset, cuisine, diet, mealType)
		.then(res => {
			this.setState({
				resultsVideos : offset === 0 ? res.videos : this.state.resultsVideos.concat(res.videos),
				offset : offset,
				isLoadedVideos : true,
				totalVideos : res.totalResults,
			}, () => {
				this.props.history.replace(
					`${this.props.history.location.pathname}?query=${this.state.query}&cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&intolerances=${this.state.selectedTolerance}&mealType=${this.state.selectedMealType}&ingredient=${this.state.ingredient}&sortParameter=${this.state.sortParameter}`,
					{ data: { results: this.state.results, 
					       	  videos : this.state.resultsVideos, 
						        totalRecipes : this.state.totalRecipes,
						        totalVideos : this.state.totalVideos } });
			})
		}).catch(err => console.log(err))
	}

	searchIngredient = (ingredient, number, offset) => {
		ingredientSearchAPI(ingredient, number, offset)
		.then(res => {
			this.setState({
				results : offset === 0 ? res : this.state.results.concat(res),
				isLoaded : true
			}, () => {
				this.props.history.replace(
					`${this.props.history.location.pathname}?query=${this.state.query}&cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&intolerances=${this.state.selectedTolerance}&mealType=${this.state.selectedMealType}&ingredient=${this.state.ingredient}&sortParameter=${this.state.sortParameter}`,
					{ data: { results: res } });
			})
		}).catch(err => console.log(err))
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	applyFilter = (values) => {
		values.selectedCuisine = values.selectedCuisine.filter(i => i !== "")
		values.selectedDiet = values.selectedDiet.filter(i => i !== "")
		values.selectedIntolerance = values.selectedIntolerance.filter(i => i !== "")
		values.selectedMealType = values.selectedMealType.filter(i => i !== "")
		this.setState({
			selectedCuisine : values.selectedCuisine.length > 0 ? values.selectedCuisine.join() : "",
			selectedDiet : values.selectedDiet.length > 0 ? values.selectedDiet.join() : "",
			selectedTolerance : values.selectedIntolerance.length > 0 ? values.selectedIntolerance.join() : "",
			selectedMealType : values.selectedMealType.length > 0 ? values.selectedMealType.join() : "",
			isLoaded : false,
			isLoadedVideos : false
		}, () => {
			this.props.history.replace(
				`${this.props.history.location.pathname}?query=${this.state.query}&cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&intolerances=${this.state.selectedTolerance}&mealType=${this.state.selectedMealType}&ingredient=${this.state.ingredient}&sortParameter=${this.state.sortParameter}`);
		}
		)
	}

	autocompleteChangeHandler = (e, newValue) => {
		// console.log("newValue",newValue)
		this.setState({
			value : newValue,
			loading : this.state.open === true && this.state.autocompleteOptions.length > 0 ? true : false,
		})
	}

	autocompleteInputChangeHandler = (e, newInputValue) => {
		this.setState({
			inputValue : newInputValue
		}
		, () => {
			this.setState({
				autocompleteOptions : sample,
				loading : false
			})
		}
		)
	}

	newSearch = (query = "") => {
		this.setState({
			isLoaded : false,
			isLoadedVideos : false,
		},() => {
			this.props.history.push({
				pathname: `${this.props.baseURL}/search-results`,
				search: `?query=${query}&cuisine=&diet=&intolerances=&mealType=&ingredient=&sortParameter=`,
			});
		})
	}

	changeCurrentTab = (type) => {
		this.setState({
			currentTab : type
		})
	}

	generateCards = () => {
		const { classes } = this.props;

		if(this.state.currentTab === "recipes"){
			return (
				this.state.isLoaded 
				? this.state.results && this.state.results.length > 0
					? <Grid container className = {classes.root} spacing = {4}>
							{this.state.results.map(item => (
								<Grid item xs = {3}>
									<RecipeCard id = {item.id} 
															image = {item.image}
															// image = {CONFIG.IMAGE_URL_RECIPE + item.id + "-480x360.jpg"}
															title = {item.title} 
															boxShadow = {false}
															redirectToRecipeDetails = {this.redirectToRecipeDetails}/>
								</Grid>
							))}
						</Grid>
					: <Typography variant = "h6" style = {{textAlign : "center"}}>No results Found</Typography>
				: <React.Fragment>
						<img src = {LogoIcon} className = {classes.loaderLogo}/>
						<CircularProgress color="inherit" size = {60} className = {classes.loader}/>
					</React.Fragment>
			)
		}else if(this.state.currentTab === "videos"){
			return(
				this.state.isLoadedVideos
				? this.state.resultsVideos && this.state.resultsVideos.length > 0
					? <Grid container className = {classes.root} spacing = {4}>
							{this.state.resultsVideos.map(item => (
								<Grid item xs = {3}>
									<VideoCard  image = {item.thumbnail}
															title = {item.shortTitle} 
															youtubeId = {item.youTubeId}/>
								</Grid>
							))}
						</Grid>
					: <Typography variant = "h6" style = {{textAlign : "center"}}>No results Found</Typography>
				: <React.Fragment>
						<img src = {LogoIcon} className = {classes.loaderLogo}/>
						<CircularProgress color="inherit" size = {60} className = {classes.loader}/>
					</React.Fragment>
			)
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
			  <Grid container className = {classes.root}>

					<Grid item xs = {12}>
						<NavBar home = {true}  search = {false}/>
					</Grid>

					<Grid item xs = {12} className = {classes.autocompleteDiv}>
					<Autocomplete
						options={this.state.autocompleteOptions}
						getOptionLabel={(option) => option.title}
						onOpen={() => {this.setState({open : true}) }}
						onClose={() => { this.setState({open : false}) }}
						loading = {this.state.loading}
						style={{ width: "45%" }}
						className = {classes.autocomplete}
						freeSolo
						disableClearable
						value = {this.state.value}//value selected by the user
						onChange = {(e, newValue) => this.autocompleteChangeHandler(e, newValue)}
						inputValue = {this.state.inputValue} //value displayed in textbox
						onInputChange = {(e, newInputValue) => {this.autocompleteInputChangeHandler(e, newInputValue)}}
						renderInput={(params) => 
							<TextField {...params} variant="outlined"
																		className = {classes.textField}
																		InputProps={{...params.InputProps,
																									endAdornment: (
																										<React.Fragment>
																											{this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
																											{params.InputProps.endAdornment}
																										</React.Fragment>),
																								}} />} />
						<Button variant="contained" 
						        disableElevation 
										className = {classes.searchButton}
										onClick = {() => {this.newSearch(this.state.inputValue, "", "", "")}}>
							<SearchIcon className = {classes.searchIcon}/>
						</Button>
					</Grid>

					<Grid item xs = {12} className = {classes.header}>
						{this.state.query &&
							<Typography variant = "h4" className = {classes.headerTitle}>
								{"Recipes For " + this.state.query}
							</Typography>}
							<Breadcrumbs aria-label="breadcrumb">
								<Typography variant = "h6" onClick = {() => this.changeCurrentTab("recipes")} 
								            className = {this.state.currentTab === "recipes" ? classes.breadcrumbTypoHighlight : classes.breadcrumbTypo}>
									{"Recipes (" + this.state.totalRecipes + ")"}
								</Typography>
								<Typography variant = "h6" onClick = {() => this.changeCurrentTab("videos")}
								            className = {this.state.currentTab === "videos" ? classes.breadcrumbTypoHighlight : classes.breadcrumbTypo}>
								  {"Videos (" + this.state.totalVideos + ")"}
								</Typography>
							{/*<Typography variant = "h6" onClick = {() => this.changeCurrentTab("products")}
								            className = {this.state.currentTab === "recipes" ? classes.breadcrumbTypoHighlight : classes.breadcrumbTypo}>
									Products
								</Typography>
								<Typography variant = "h6" onClick = {() => this.changeCurrentTab("mennuItems")}
							            	className = {this.state.currentTab === "recipes" ? classes.breadcrumbTypoHighlight : classes.breadcrumbTypo}>
									Menu Items
						</Typography>*/}
							</Breadcrumbs>
						</Grid>

				  <Grid item xs = {12} style = {{margin : "30px 60px 0px 300px"}}>
						{this.generateCards()}
					</Grid>

					<Drawer className={classes.drawer} variant="persistent" open = {true} classes={{ paper: classes.drawerPaper,}}>
						<div className={classes.drawerContainer}>
							<DrawerJSX applyFilter = {this.applyFilter} 
												 currentTab = {this.state.currentTab}	
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