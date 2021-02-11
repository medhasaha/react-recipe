import React, {Component} from 'react';
import {recipeAutocompleteAPI, randomRecipeAPI, userAPI} from '../ServiceClass.js'
import NavBar from './NavBar.js'
import RecipeHeader from './RecipeHeader.js'

import background1 from '../Assets/Images/background/background1.jpg';
import background2 from '../Assets/Images/background/background2.jpg';
import background3 from '../Assets/Images/background/background3.jpg';
import background4 from '../Assets/Images/background/background4.jpg';
import background5 from '../Assets/Images/background/background5.jpg';
import background6 from '../Assets/Images/background/background6.jpg';
import background7 from '../Assets/Images/background/background7.jpg';
import background8 from '../Assets/Images/background/background8.jpg';
import background9 from '../Assets/Images/background/background9.jpg';
import background10 from '../Assets/Images/background/background10.jpg';
import background11 from '../Assets/Images/background/background11.jpg';

import meal_type_main_course from '../Assets/Images/img/meal_type_main_course.jpg';
import meal_type_dessert from '../Assets/Images/img/meal_type_dessert.jpg';
import meal_type_salad from '../Assets/Images/img/meal_type_salad.jpg';
import meal_type_breakfast from '../Assets/Images/img/meal_type_breakfast.jpg';
import meal_type_drink from '../Assets/Images/img/meal_type_drink.jpg';

import cuisine_type_american from '../Assets/Images/img/cuisine_type_american.jpg';
import cuisine_type_british from '../Assets/Images/img/cuisine_type_british.jpg';
import cuisine_type_mexican from '../Assets/Images/img/cuisine_type_mexican.jpg';
import cuisine_type_japanese from '../Assets/Images/img/cuisine_type_japanese.jpg';
import cuisine_type_indian from '../Assets/Images/img/cuisine_type_indian.jpg';

import diet_type_gluten_free from '../Assets/Images/img/diet_type_gluten_free.jpg';
import diet_type_keto from '../Assets/Images/img/diet_type_keto.jpg';
import diet_type_vegetarian from '../Assets/Images/img/diet_type_vegetarian.jpg';
import diet_type_pescetarian from '../Assets/Images/img/diet_type_pescetarian.jpg';
import diet_type_lacto_veg from '../Assets/Images/img/diet_type_lacto_veg.jpg';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Divider from '@material-ui/core/Divider';

const mealTypes = [
	{title : "main course", image : meal_type_main_course},
	{title : "dessert", image : meal_type_dessert},
	{title : "salad", image : meal_type_salad},
	{title : "breakfast", image : meal_type_breakfast},
	{title : "drink", image : meal_type_drink},
]

const cuisineTypes = [
	{title : "American", image : cuisine_type_american},
	{title : "British", image : cuisine_type_british},
	{title : "Mexican", image : cuisine_type_mexican},
	{title : "Japanese", image : cuisine_type_japanese},
	{title : "Indian", image : cuisine_type_indian},
]

const dietTypes = [
	{title : "Gluten Free", image : diet_type_gluten_free},
	{title : "Ketogenic", image : diet_type_keto},
	{title : "Vegetarian", image : diet_type_vegetarian},
	{title : "Pescetarian", image : diet_type_pescetarian},
	{title : "Lacto-Vegetarian", image : diet_type_lacto_veg},
]
const backgroundArray = [background1, background2, background3, background4, background5, background11, background7, background8, background9];

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

const style = theme => ({
	root : {

	},
	bgGrid : {
		top : "-1px",
		position: "relative",
		margin: "0 auto",
		width: "100%",
		height: "120vh",
	},
	bgDiv : {
		width : "100%",
		// height : "100vh",
		opacity: 0,
		animation: "$fade-in-out 81s linear infinite"
	},
	bgImage : {
		width : "100%",
		height : "100%",
		objectFit : "cover",
		objectPosition : "center center",
		position: "absolute",
		left: 0,
		top: 0,
	},
	attribution : {
		position: "absolute",
		right : 10,
		bottom : 0,
		zIndex : "100",
		color : "white",
		textShadow: "0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black"
	},
	attributionLink : {
		textDecoration : "none",
		color : "white",
		"&:hover": {
      textDecoration : "underline"
    }
	},
	"@keyframes fade-in-out" : {
		"0%" : { opacity: 0 } ,
		"01.23%" : { opacity: 1 },
		"02.46%" : { opacity: 1 },
		"03.69%" : { opacity: 1 },
		"04.92%" : { opacity: 1 },
		"06.15%" : { opacity: 1 },
		"07.38%" : { opacity: 1 },
		"08.61%" : { opacity: 1 },
		"09.84%" : { opacity: 1 },
		"19.68%" : { opacity: 0 },
		"100%" : { opacity: 0 }
	},
	autocompleteGrid : {
		position : "absolute",
		top : "40%",
	},
	gridCenter : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	autocomplete : {
		// backgroundColor : "white",
		display : "inline-flex",
		margin : "0px 2px 0px 0px",
		backgroundColor: "rgba(255, 255, 255, 0.65)",
	},
	textField : {
		"& .MuiFormLabel-root": {
			color: "#000"//
		},
		"&:hover .MuiFormLabel-root": {
			color: "#000"
		},
		"& .MuiInputBase-input" : {
			color : "#000",//
		},
		"&:hover .MuiInputBase-input" : {
			color : "#000",
		},
		"& .Mui-focused .MuiInputBase-input" : {
			color : "#000"
		},
		"& .Mui-focused" : {
			color : "#000",
		},
		"& .MuiOutlinedInput-notchedOutline" : {
			border : "3px solid #fff"//
		},
		"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border : "3px solid #fff"
    },
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border : "3px solid #fff"
    },
	},
	searchButton : {
		height  : "100%",
		border: "3px solid #fff",
    backgroundColor: "rgba(255,255,255,0.2)",
	},
	searchIcon : {
		color : "white",
		fontSize : "2rem"
	},
	fixedBg : {
		height : "100vh",
		backgroundAttachment: "fixed",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center center",
	},
	scrollBg : {
		// height : "100vh",
		backgroundColor : "#f8f9fa",
		padding : "30px 0px 30px"
	},
	recipeImage : {
		width : "100%",
		height : "200px",
		objectFit : "cover",
		objectPosition : "center center",
		// borderRadius : "50%"
	},
	recipeTitle : {
		fontFamily : "Fira Sans",
    textTransform : "uppercase",
    width : "60%",
    textAlign : "center",
		fontSize : "20px",
		fontWeight : "bold"
	},
	recipeDivider : {
		width : "20%",
		backgroundColor : "#932432",
		height : "4px",
		marginTop : "10px"
	},
	gridAboutRecipe : {
		height : "200px",
		outline: "2px solid #ddd",
    outlineOffset: "-20px",
	},
	gridTop : {
		display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
	},
	gridBottom : {
  	display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
	},
	gridTextAlign : {
		textAlign : "center"
	},
	gridList : {
		margin : "0px 0px 30px 0px"
	},
	gridListTileBar : {
		textTransform : "capitalize"
	},
	veganGrid : {
		textAlign : "center",
		marginTop : "auto",
		marginBottom : "auto",
		marginLeft : "120px",
		marginRight : "120px"
	},
	veganTitle : {
		color : "#fff",
		marginBottom : "30px"
	},
	veganSubTitle : {
		color : "#fff",
		marginBottom : "120px"
	},
	veganButton : {
		color : "#fff",
		backgroundColor : "#932432"
	},
	cursor : {
		cursor : "pointer"
	}
})

class RecipesHome extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeHome :",this.props)
		this.state = {
			autocompleteOptions : [],
			value : "",
			inputValue : "",
			loading : false,
			open : false,
			randomRecipes : []
		}
	}

	componentDidMount(){
		// this.getUserDetails();
		if (this.props.location && this.props.location.state && this.props.location.state.data){
      this.setState({ 
				...this.props.location.state.data,
			});
    } else {
			this.getRandomRecipe()
    }
	}

	componentWillUnmount() {

	}

	getUserDetails = () => {
		userAPI()
		.then(res => {
			console.log(res)
			this.setState({
				user : res,
			})
		}).catch(err => console.log(err))
	}

	getRandomRecipe = () => {
		randomRecipeAPI()
		.then(res => {
			console.log(res)
			this.setState({
				randomRecipes : res.recipes,
			}, () => {
				this.props.history.replace(this.props.history.location.pathname,
					{ data: 
						{ 
							randomRecipes : this.state.randomRecipes,
						}
					});
			}
			)
		}).catch(err => console.log(err))
	}

	recipeAutocompleteMethod = (value) => {
		recipeAutocompleteAPI(value)
		.then(res => {
			console.log(res)
			this.setState({
				autocompleteOptions : sample,
				loading : false
			})
		}).catch(err => console.log(err))
	}

	autocompleteChangeHandler = (e, newValue) => {
		// console.log("newValue",newValue)
		this.setState({
			value : newValue,
			loading : this.state.open === true && this.state.autocompleteOptions.length > 0 ? true : false,
		})
	}

	autocompleteInputChangeHandler = (e, newInputValue) => {
		// console.log("newInputValue",newInputValue)
		this.setState({
			inputValue : newInputValue
		}
		// , () => {this.recipeAutocompleteMethod(this.state.value)}
		, () => {
			this.setState({
				autocompleteOptions : sample,
				loading : false
			})
		}
		)
	}

	redirectToSearch = (query = "", cuisine = "", diet = "", mealType = "") => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/search-results`,
			search: `?query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=&mealType=${mealType}&sortParameter=&number=20&offset=0`,
		});
	}

	redirectToDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	sliderJSX = () => {
		const { classes } = this.props;
		return(
			<React.Fragment>
				<div style = {{ "animationDelay": "0s" }} className = {classes.bgDiv}>
					<img src = {background1} className = {classes.bgImage} />
					<span className = {classes.attribution}>
					  Photo by <a href="https://unsplash.com/@brookelark?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Brooke Lark</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "9s" }} className = {classes.bgDiv}>
					<img src = {background2} className = {classes.bgImage}/>
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@lvnatikk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Lily Banse</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "18s" }} className = {classes.bgDiv}>
					<img src = {background3} className = {classes.bgImage} />
					<span className = {classes.attribution}>
					  Photo by <a href="https://unsplash.com/@therachelstory?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Rachel Park</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "27s" }} className = {classes.bgDiv}>
					<img src = {background4} className = {classes.bgImage} />
						<span className = {classes.attribution}>
							Photo by <a href="https://unsplash.com/@annapelzer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Anna Pelzer</a> 
							{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
						</span>
				</div>
				<div style = {{ "animationDelay": "36s" }} className = {classes.bgDiv}>
					<img src = {background5} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@alexmunsell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Alex Munsell</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "45s" }} className = {classes.bgDiv}>
					<img src = {background11} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@society_grace?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Sarah Holcomb</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "54s" }} className = {classes.bgDiv}>
					<img src = {background7} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@eaterscollective?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Eaters Collective</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "63s" }} className = {classes.bgDiv}>
					<img src = {background8} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@carissagan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Carissa Gan</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "72s" }} className = {classes.bgDiv}>
					<img src = {background9} className = {classes.bgImage} />
					<span className = {classes.attribution}>
					  Photo by <a href="https://unsplash.com/@abhishek_sanwa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Abhishek Sanwa Limbu</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
			</React.Fragment>
		)
	}

	recipeOfTheDay = () => {
		const { classes } = this.props;
		return(
			<React.Fragment>
				<Grid container>

					<Grid container item xs = {3} className = {classes.cursor}
					      onClick = {() => {this.redirectToDetails(this.state.randomRecipes[0].id)}}>
						<Grid item xs = {12}>
						  <img src = {this.state.randomRecipes[0].image} className = {classes.recipeImage}/>						
						</Grid>
						<Grid container item xs = {12} className = {classes.gridAboutRecipe}>
						  <Grid item xs = {12} className = {classes.gridTop}>
						    <Typography className = {classes.recipeTitle}>{this.state.randomRecipes[0].title}</Typography>
							</Grid>
							<Grid item xs = {12} className = {classes.gridBottom}>
							  <Divider className = {classes.recipeDivider}/>
							</Grid>
						</Grid>
					</Grid>

					<Grid container item xs = {3} className = {classes.cursor}
					      onClick = {() => {this.redirectToDetails(this.state.randomRecipes[1].id)}}>
					  <Grid container item xs = {12}  className = {classes.gridAboutRecipe}>
							<Grid item xs = {12} className = {classes.gridTop}>
								<Typography className = {classes.recipeTitle}>{this.state.randomRecipes[1].title}</Typography>
							</Grid>
							<Grid item xs = {12} className = {classes.gridBottom}>
							  <Divider className = {classes.recipeDivider}/>
							</Grid>
						</Grid>
						<Grid item xs = {12}>
						  <img src = {this.state.randomRecipes[1].image} className = {classes.recipeImage}/>
						</Grid>
					</Grid>

					<Grid container item xs = {3} className = {classes.cursor}
					      onClick = {() => {this.redirectToDetails(this.state.randomRecipes[2].id)}}>
					  <Grid item xs = {12}>
						  <img src = {this.state.randomRecipes[2].image} className = {classes.recipeImage}/>
						</Grid>
						<Grid container item xs = {12}  className = {classes.gridAboutRecipe}>
						  <Grid item xs = {12} className = {classes.gridTop}>
						    <Typography className = {classes.recipeTitle}>{this.state.randomRecipes[2].title}</Typography>
							</Grid>
							<Grid item xs = {12} className = {classes.gridBottom}>
							  <Divider className = {classes.recipeDivider}/>
							</Grid>
						</Grid>
					</Grid>

					<Grid container item xs = {3} className = {classes.cursor}
					      onClick = {() => {this.redirectToDetails(this.state.randomRecipes[3].id)}}>
					  <Grid container item xs = {12}  className = {classes.gridAboutRecipe}>
						  <Grid item xs = {12} className = {classes.gridTop}>
						    <Typography className = {classes.recipeTitle}>{this.state.randomRecipes[3].title}</Typography>
							</Grid>
							<Grid item xs = {12} className = {classes.gridBottom}>
							  <Divider className = {classes.recipeDivider}/>
							</Grid>
						</Grid>
						<Grid item xs = {12}>
						  <img src = {this.state.randomRecipes[3].image} className = {classes.recipeImage}/>
						</Grid>
					</Grid>

				</Grid>
		  </React.Fragment>
		)
	}

	horizontalList = (list) => {
		const { classes } = this.props;
		return(
			<GridList cellHeight={280} className={classes.gridList} cols = {5}>
				{list.map((tile) => (
					<GridListTile key={tile.title} className = {classes.cursor}
					              onClick = {() => {this.redirectToSearch("", list === cuisineTypes ? tile.title : "", list === dietTypes ? tile.title : "", list === mealTypes ? tile.title : "")}}>
						<img src={`${tile.image}`} alt={tile.title} />
						<GridListTileBar title={tile.title} className = {classes.gridListTileBar}/>
					</GridListTile>
				))}
			</GridList>
		)
	}

	getWhatsInMyFridgePanel = () => {
		const { classes } = this.props;
		return(
			<Grid container style = {{height : "100%"}}>
				<Grid item xs = {12} className = {classes.veganGrid}>
					<Typography variant = "h1" className = {classes.veganTitle}>Whats In My Fridge?</Typography>
					<Typography variant = "h6" className = {classes.veganSubTitle}>
					  The best way to reduce food waste and save money? Eat what you’ve already paid for! 
					  Just add your ingredients and we will instantly finds matching recipes from the
						most popular cooking websites! Don’t overthink it, we’re going to tell you what to cook.
					</Typography>
					<Button variant = "contained" className = {classes.veganButton}>Find Me A Recipe</Button>
				</Grid>
			</Grid>
		)
	}

	getVeganPanel = () => {
		const { classes } = this.props;
		return(
			<Grid container style = {{height : "100%"}}>
				<Grid item xs = {12} className = {classes.veganGrid}>
					<Typography variant = "h1" className = {classes.veganTitle}>Vegan Recipes</Typography>
					<Typography variant = "h6" className = {classes.veganSubTitle}>
						Many say that nutritious food come at a price but not any more. <b><i>Vegan food</i></b> can provide
						a healthy balance of nutrients and can be cost friendly too. So lets veganise your eveyday
						recipes
					</Typography>
					<Button variant = "contained" className = {classes.veganButton}>Find Vegan Recipes</Button>
				</Grid>
			</Grid>
		)
	}

  render(){
		const { classes } = this.props;
		return(
			<Grid container className = {classes.root}>

				<Grid item xs = {12}>
					<NavBar home = {true}/>
				</Grid>
				<Grid item xs = {12} className = {classes.bgGrid}>
					{this.sliderJSX()}
						<Grid container className = {classes.autocompleteGrid}>
						  <Grid item xs = {12} className = {classes.gridCenter}>
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
											onClick = {() => {this.redirectToSearch(this.state.inputValue, "", "", "")}}>
							  <SearchIcon className = {classes.searchIcon}/>
						  </Button>
							</Grid>
						</Grid>
				</Grid>
			
				<Grid item xs = {12} className = {classes.scrollBg}>
				  <Card style = {{margin : "0px 20px 30px 20px"}}>
					  {this.state.randomRecipes && this.state.randomRecipes.length > 0 && this.recipeOfTheDay()}
					</Card>
					{this.horizontalList(mealTypes)}
				</Grid>

				<Grid item xs = {12} className = {classes.fixedBg} style = {{backgroundImage : `url(${background6})`}}>
				  {this.getWhatsInMyFridgePanel()}
				</Grid>

				<Grid item xs = {12} className = {classes.scrollBg}>
				  {this.horizontalList(cuisineTypes)}
				</Grid>

				<Grid item xs = {12} className = {classes.fixedBg} style = {{backgroundImage : `url(${background10})`}}>
				  {this.getVeganPanel()}
				</Grid>

				<Grid item xs = {12} className = {classes.scrollBg}>
				  {this.horizontalList(dietTypes)}
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipesHome);