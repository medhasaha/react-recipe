import React, {Component} from 'react';
import {recipeDetailsAPI, similarRecipesAPI, recipeEquipmentsAPI} from '../ServiceClass.js';
import CONFIG from '../Config.js'
import RecipeCard from './RecipeCard.js'
import NutiritionChart from './NutritionChart.js'
import NavBar from './NavBar.js';
import BookmarkDialog from './BookmarkDialog.js'


import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Tooltip, Button, Chip, Tab, Tabs, CircularProgress} from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';

import placeholderIcon from '../Assets/Icons/placeholder.svg'
import vegIcon from '../Assets/Icons/veg.svg'
import nonVegIcon from '../Assets/Icons/nonVeg.svg'
import veganIcon from '../Assets/Icons/vegan.svg'
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LogoIcon from '../Assets/Icons/LogoColor.svg'

const style = theme => ({
	gridDetails : {
    // border: "5px solid lightgray",
    margin: "50px 100px 0px 100px",
    width: "auto",
    padding: "20px",
	},
	recipeImage : {
		width : "100%",
		height : "auto",
		maxHeight : "400px",
		objectFit : "cover",
		objectPosition : "center center",
		// borderRadius : "50%"
	},
	title : {
		"fontWeight" : 900
	},
	gridCenterFlex : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	gridAboutRecipe : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex",
		// backgroundColor : "lightgray",
		padding : "20px"
	},
	gridCenter : {
		textAlign : "center"
	},
	logo : {
		height : "40px",
		width : "40px"
	},
	logoBig : {
		height : "72px",
		width : "72px"
	},
	infoLabel : {
		fontSize : "2rem",
		fontWeight : 400
	},
	infoLabelBold : {
		fontSize : "1rem",
		fontWeight : 400
		// fontWeight : "bold"
	},
	heading : {
		fontSize : "2rem",
	},
	vegIcon : {
		height : "40px",
		width : "40px"
	},
	chip : {
		// border : "1px solid #932432",
		backgroundColor : "#932432",
		color : "#fff",
		margin : "2px"
	},
	gridIngredients : {
		maxWidth : "40vw",
		marginLeft : "auto",
		marginRight : "auto"
	},
	ingredientImage : {
		height : "70px",
		width : "70px",
		// objectFit : "cover",
		// objectPosition : "center center",
	},
	ingredientLabel : {
		textAlign : "center"
	},
	ingredientName : {
		fontWeight : 900,
		color : "#932432",
		cursor : "pointer"
	},
	ol_style : {
		margin : "0px",
		// fontSize : "1.5rem",
		lineHeight : "1.25",
		// marginLeft : "10px"
	},
	instructionLabel : {
		margin : "0px 10px 10px 10px"
	},
	gridCenter : {
		textAlign : "center"
	},
	saveRecipeButton : {
		width : "100%",
		color : "#fff",
		borderRadius : "0px",
		fontSize : "1rem",
		"& .MuiSvgIcon-root" : {
			fontSize : "20px"
		}
	},
	tab : {
		"& .MuiTab-textColorPrimary.Mui-selected" : {
			color : "#932432"
		},
		marginBottom : "30px"
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
	launchIcon : {
		fill : "#932432",
		marginLeft : "20px",
		verticalAlign : "middle",
		cursor : "pointer"
	}
})

class RecipeDetails extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeDetails: ",props)
		const recipes = sessionStorage.getItem('recipes');
		const savedRecipes = JSON.parse(recipes)
		let isBookmarked = savedRecipes && savedRecipes.length > 0 && savedRecipes.includes(parseInt(this.props.match.params.id))|| false;
		this.state = {
			details : null,
			similarRecipes : [],
			equipments : [],
			isLoaded : false,
			tabValue : 0,
			goToDialog : false,
			isBookmarked : isBookmarked,
		}
	}

	componentDidMount(){
		if (this.props && this.props.location && this.props.location.state && this.props.location.state.data) {
      this.setState({
				...this.props.location.state.data ,
        isLoaded: true
      });
    } else{	this.getRecipeDetails(this.props.match.params.id)}
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevProps.match.params.id && this.props.match.params.id 
			   && prevProps.match.params.id !== this.props.match.params.id){
			this.setState({
				details : null,
				similarRecipes : [],
				equipments : [],
				isLoaded : false,
				tabValue : 0	
			}, () =>  this.getRecipeDetails(this.props.match.params.id))
    }
	}

	getRecipeDetails = (id) => {
		Promise.all([recipeDetailsAPI(id), similarRecipesAPI(id), recipeEquipmentsAPI(id)])
		.then(res => {
			console.log(res)
			this.setState({
				details : res[0],
				similarRecipes : res[1].slice(0,5),
				equipments : res[2].equipment,
				isLoaded : true
			}, () => {
				this.props.history.replace(this.props.history.location.pathname,
					{ data: 
						{ 
						  details: this.state.details,
							similarRecipes : this.state.similarRecipes,
			        equipments : this.state.equipments,
						}
					});
			})
		})
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	searchByIngredient = (ingredient) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/search-results`,
			search: `?query=&cuisine=&diet=&intolerances=&mealType=&ingredient=${ingredient}&sortParameter=&number=20&offset=0`,
		});
	}

	aboutRecipePanelJSX = () => {
		const { classes } = this.props;
		return (
			<Grid container>
				<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "10px"}}>
					<Typography variant = "h4" className = {classes.title}>{this.state.details.title}</Typography>
				</Grid>

				<Grid item xs = {12} className = {classes.gridCenterFlex} style = {{marginBottom : "20px"}}>
					<Typography variant = "subtitle1" style = {{display : "inline"}}>
						{"AUTHOR : "} {this.state.details.creditsText}
							<a href = {this.state.details.sourceUrl} target="_blank" className = {classes.link}>
								<LaunchIcon className = {classes.launchIcon}/>
							</a>
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
				  {/*style = {{"border-right" : "0.1px grey solid"}}*/}
					{/*<Tooltip title = {"Cook Time"}><img src = {timeIcon} className = {classes.logo}/></Tooltip>*/}
					<Typography variant = "h6" className = {classes.infoLabel}>
						{this.state.details.readyInMinutes}
					</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabelBold}>Cook Time</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
					<Typography variant = "h6" className = {classes.infoLabel}>
						{this.state.details.servings}
					</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabelBold}>Servings</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenterFlex}>
					<Tooltip title = {this.state.details.vegetarian ? "Vegetarian" : "Non-vegetarian"}>
						<img src = {this.state.details.vegetarian ? vegIcon : nonVegIcon} 
						     className = {classes.vegIcon}/>
					</Tooltip>
				</Grid>

				<Grid item xs = {12} style = {{marginTop : "10px"}}>
					{this.state.details.dishTypes.length > 0 && this.state.details.dishTypes.map(item => (
						<Chip label = {item} className = {classes.chip}/>
					))}
					{this.state.details.cuisines.length > 0 && this.state.details.cuisines.map(item => (
						<Chip label = {item} className = {classes.chip}/>
					))}
					{this.state.details.diets.length > 0 && this.state.details.diets.map(item => (
						<Chip label = {item} className = {classes.chip}/>
					))}
					{this.state.details.occasions.length > 0 && this.state.details.occasions.map(item => (
						<Chip label = {item} className = {classes.chip}/>
					))}
				</Grid>

			</Grid>
		)
	}

	parseIngredients = (ingredient) => {
		let fullString = ingredient.originalString;
		let fullName = ingredient.originalName.toLowerCase();
		let ingredientName = "", unit_us = "", amount_us = "", unit_metric = "", amount_metric;
		let id = ingredient.id
		let image = ingredient.image
		ingredientName = ingredient.name.toLowerCase();
		let nameObj = []
		if(fullName.indexOf(ingredientName) === 0){
			nameObj.push({"highlight" : true, "text" : ingredientName.trim()})
			if(fullName.substring(ingredientName.length) != "") 
			  nameObj.push({"highlight" : false, "text" : fullName.substring(ingredientName.length).trim()})
		}else if(fullName.indexOf(ingredientName) > 0){
			nameObj.push({"highlight" : false, "text" : fullName.substring(0, fullName.indexOf(ingredientName)).trim()})
			nameObj.push({"highlight" : true, "text" : ingredientName})
			if(fullName.substring(ingredientName.length) != "") 
			  nameObj.push({"highlight" : false, "text" : fullName.substring(fullName.indexOf(ingredientName) + ingredientName.length)})
		}else{//-1
			nameObj.push({"highlight" : true, "text" : ingredient.nameClean.trim()})
		}
		unit_us = ingredient.unit;
		amount_us = ingredient.amount;
		unit_metric = ingredient.measures.metric.unitShort;
		amount_metric = ingredient.measures.metric.amount;
		if(!Number.isInteger(amount_us)){
			let index = fullString.indexOf(unit_us);
			amount_us = fullString.substring(0,index).trim();
		}
		return({
			id,
			image,
			ingredientName,
			nameObj,
			unit_us,
			amount_us,
			unit_metric,
			amount_metric
		})
	}

	ingredientCard = (item) => {
		const { classes } = this.props;
		let parsedIngredients = this.parseIngredients(item)
		return(
			<Grid container item xs = {12}>
					<Grid item xs = {3} className = {classes.gridCenter}>
						<img src = {parsedIngredients.image 
												? CONFIG.IMAGE_URL_INGREDIENT + "_100x100/" + parsedIngredients.image 
												: placeholderIcon} 
								className = {classes.ingredientImage}/>
					</Grid>

					<Grid item xs = {3} className = {classes.gridCenter}>
						<Typography variant = "subtitle1">{parsedIngredients.amount_us}</Typography>
					</Grid>

					<Grid item xs = {6} className = {classes.gridCenter}>
						<Typography variant = "subtitle1" className = {classes.ingredientLabel}>
							{parsedIngredients.nameObj.map(item => (
								!item.highlight
								? <span>{item.text}{" "}</span>
								: <span className = {classes.ingredientName} onClick = {() => this.searchByIngredient(item.text)}>{item.text}{" "}</span>
							))}
						</Typography>
					</Grid>
			</Grid>)
	}

	ingredientJSX = () => {
		const { classes } = this.props;
		return (
		  <Grid container className = {classes.gridIngredients}>
		    {this.state.details.extendedIngredients.length > 0 && this.state.details.extendedIngredients.map(item => (
					this.ingredientCard(item)
		    ))}
		  </Grid>
		)
	}

	equipmentsJSX = (item) => {
		const { classes } = this.props;
		return (
			<Grid container>
				{this.state.equipments.length > 0 && this.state.equipments.map(item => (
					<Grid item xs = {4}>
						<Grid container style = {{marginBottom : "30px"}}>

							<Grid item xs = {12} className = {classes.gridCenter}>
								<img src = {item.image 
														? CONFIG.IMAGE_URL_EQUIPMENT + "_100x100/" + item.image 
														: placeholderIcon } 
										className = {classes.ingredientImage}/>
							</Grid>

							<Grid item xs = {12} className = {classes.gridCenter}>
								<Typography variant = "subtitle1" className = {classes.ingredientLabel}>
									{item.name}
								</Typography>
							</Grid>

						</Grid>
					</Grid>
				))}
			</Grid>
		)
	}

	instructionsJSX = () => {
		const { classes } = this.props;
		return (	
			<ol className = {classes.ol_style}>
			  {this.state.details.analyzedInstructions && this.state.details.analyzedInstructions[0] && this.state.details.analyzedInstructions[0].steps.length > 0 &&
					this.state.details.analyzedInstructions[0].steps.map((item,index) => (
					<Grid item xs = {12} style = {{display : "flex"}}>
						<li/>
						<Typography variant = "subtitle1" style = {{display : "inline"}}
												className = {classes.instructionLabel}>
							{item.step}
						</Typography>
					</Grid>
				))}
			</ol>
		)
	}

	changeTabValue = (event, newValue) => {
		this.setState({
			tabValue : newValue
		})
	}

	tabPanelJSX = () => {
		const { classes } = this.props;
		function TabPanel(props) {
      const {value, index, data } = props;
      if(value!==index)
        return null
      else
        return data
    }

		return (
			<React.Fragment>
				<Tabs value={this.state.tabValue} onChange={this.changeTabValue} className = {classes.tab}
							 indicatorColor="secondary" textColor="primary" centered>
					<Tab label="Ingredients"/>
					<Tab label="Equipments"/>
					<Tab label="Instructions"/>
					<Tab label="Nutrition"/>
				</Tabs>
				<TabPanel value={this.state.tabValue} index={0} data={this.ingredientJSX()}>
				</TabPanel>
				<TabPanel value={this.state.tabValue} index={1} data={this.equipmentsJSX()}>
					Item Two
				</TabPanel>
				<TabPanel value={this.state.tabValue} index={2} data={this.instructionsJSX()}>
					Item Three
				</TabPanel>
				<TabPanel value={this.state.tabValue} index={3} 
				          data={<NutiritionChart data = {this.state.details.nutrition.nutrients}/>}>
					Item Three
				</TabPanel>
			</React.Fragment>
		)
	}

	detailsJSX = () => {
		const { classes } = this.props;
		return (
			<Grid container className = {classes.gridDetails}>
				<Grid item xs = {6} className = {classes.gridCenter}>
					<img src = {this.state.details.image} className = {classes.recipeImage}/>
					<Button variant = "contained" 
					        className = {classes.saveRecipeButton} 
									color = "secondary" 
									onClick = {this.goToDialogMethod}
									startIcon={<LoyaltyIcon />}>
					  {this.state.isBookmarked ? "Edit Bookmark" : "Save Recipe"}
					</Button>
				</Grid>

				<Grid item xs = {6} className = {classes.gridAboutRecipe}>
					{this.aboutRecipePanelJSX()}
				</Grid>

				<Grid item xs = {12} style = {{marginTop : "30px"}}>
				  {this.tabPanelJSX()}
				</Grid>
		  </Grid>
		)
	}

	goToDialogMethod = () => {
		this.setState({
			goToDialog : false
		},() => {
			this.setState({
				goToDialog : true
			})
		})
	}

	returnBookmarkState = (isBookmarked) => {
		this.setState({
			isBookmarked : isBookmarked,
		})
	}

	returnDialogState = () => {
		this.setState({
			goToDialog : false
		})
	}

  render(){
		const { classes } = this.props;
		return(
		  <Grid container spacing = {2} style = {{paddingRight : "50px"}}>

				<Grid item xs = {12}>
					<NavBar home = {true}  search = {true}/>
				</Grid>
				
				{this.state.isLoaded
				? <React.Fragment>
				  <Grid item xs = {10}>
						{this.detailsJSX()}
					</Grid>

					<Grid item xs = {2}>
						<Grid container spacing = {2} style = {{marginTop : "50px"}}>
							{this.state.similarRecipes.length > 0 && 
								this.state.similarRecipes.map(item => (
								<Grid item xs = {12}>
									<RecipeCard id = {item.id} 
															image = {CONFIG.IMAGE_URL_RECIPE + item.id + "-312x231." + item.imageType}
															title = {item.title}
															servings = {item.servings}
															time = {item.readyInMinutes}
															boxShadow = {false}
															redirectToRecipeDetails = {this.redirectToRecipeDetails}/>
								</Grid>
							))}
						</Grid>
					</Grid>
					</React.Fragment>
				: <React.Fragment>
						<img src = {LogoIcon} className = {classes.loaderLogo}/>
						<CircularProgress color="inherit" size = {60} className = {classes.loader}/>
					</React.Fragment>}

				{this.state.goToDialog &&
					<BookmarkDialog isBookmarked = {this.state.isBookmarked}
													id = {this.state.details.id} 
													title = {this.state.details.title}
													returnBookmarkState = {this.returnBookmarkState}/>}
			</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeDetails);