import React, {Component} from 'react';
import {recipeDetailsAPI, similarRecipesAPI, recipeEquipmentsAPI} from '../ServiceClass.js';
import CONFIG from '../Config.js'
import RecipeCard from './RecipeCard.js'
import NutiritionChart from './NutritionChart.js'
import RecipeHeader from './RecipeHeader.js'
import NavBar from './NavBar.js';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import placeholderIcon from '../Assets/Icons/placeholder.svg'
import vegIcon from '../Assets/Icons/veg.svg'
import nonVegIcon from '../Assets/Icons/nonVeg.svg'
import veganIcon from '../Assets/Icons/vegan.svg'

const style = theme => ({
	root : {
    // border: "5px solid lightgray",
    margin: "50px 100px 0px 100px",
    width: "auto",
    padding: "20px",
	},
	recipeImage : {
		width : "100%",
		height : "400px",
		objectFit : "cover",
		objectPosition : "center center",
		// borderRadius : "50%"
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
		fontSize : "1rem",
	},
	infoLabelBold : {
		fontSize : "1rem",
		fontWeight : "bold"
	},
	heading : {
		fontSize : "2rem",
	},
	vegIcon : {
		height : "40px",
		width : "40px"
	},
	chip : {
		border : "1px solid #932432",
		marginLeft : "4px"
	},
	gridIngredients : {
		// alignItems : "center",
		// display : "flex"
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
	ol_style : {
		margin : "0px",
		fontSize : "1.5rem",
		lineHeight : "1.5",
		// marginLeft : "10px"
	},
	instructionLabel : {
		fontSize : "1.25rem",
		margin : "0px 10px 10px 10px"
	},
	gridCenter : {
		textAlign : "center"
	},
	gridCenterFlex : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
})

class RecipeDetails extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeDetails: ",props)

		this.state = {
			details : null,
			similarRecipes : [],
			equipments : [],
			isLoaded : false,
			tabValue : 0
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
		if ( prevProps.match.params.id && this.props.match.params.id && prevProps.match.params.id !== this.props.match.params.id){
      if (this.props.location.state && this.props.location.state.data) {
        this.setState({ 
					...this.props.location.state.data,
					isLoading : true
				});
      } else {
        this.getRecipeDetails(this.props.match.params.id);
      }
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
			}
			, () => {
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

	aboutRecipePanelJSX = () => {
		const { classes } = this.props;
		return (
			<Grid container>
				<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "30px"}}>
					<Typography variant = "h4">{this.state.details.title}</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
				      {/*style = {{"border-right" : "0.1px grey solid"}}*/}
					{/*<Tooltip title = {"Cook Time"}><img src = {timeIcon} className = {classes.logo}/></Tooltip>*/}
					<Typography variant = "button" className = {classes.infoLabelBold}>Cook Time</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabel}>
						{this.state.details.readyInMinutes}
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
					<Typography variant = "button" className = {classes.infoLabelBold}>Servings</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabel}>
						{this.state.details.servings}
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
					<Tooltip title = {this.state.details.vegetarian ? "Vegetarian" : "Non-vegetarian"}>
						<img src = {this.state.details.vegetarian ? vegIcon : nonVegIcon} 
						     className = {classes.vegIcon}/>
					</Tooltip>
				</Grid>

				<Grid item xs = {12} className = {classes.gridCenterFlex} style = {{marginTop : "30px"}}>
					<Typography variant = "subtitle1" style = {{display : "inline"}}>
						{"AUTHOR : "} {this.state.details.creditsText}
					</Typography>
				</Grid>

				<Grid item xs = {12} className = {classes.gridCenterFlex} style = {{marginTop : "10px"}}>
					{this.state.details.dishTypes.length > 0 && this.state.details.dishTypes.map(item => (
						<Chip label = {item} variant = "outlined" className = {classes.chip}/>
					))}
					{this.state.details.cuisines.length > 0 && this.state.details.cuisines.map(item => (
						<Chip label = {item} variant = "outlined" className = {classes.chip}/>
					))}
					{this.state.details.diets.length > 0 && this.state.details.diets.map(item => (
						<Chip label = {item} variant = "outlined" className = {classes.chip}/>
					))}
					{this.state.details.occasions.length > 0 && this.state.details.occasions.map(item => (
						<Chip label = {item} variant = "outlined" className = {classes.chip}/>
					))}
				</Grid>

			</Grid>
		)
	}

	ingredientJSX = () => {
		const { classes } = this.props;
		return (
		  <Grid container>
		    {this.state.details.extendedIngredients.length > 0 && this.state.details.extendedIngredients.map(item => (
					<Grid item xs = {4}>
						<Grid container style = {{marginBottom : "30px"}}>

							<Grid item xs = {12} className = {classes.gridCenter}>
								<img src = {item.image 
														? CONFIG.IMAGE_URL_INGREDIENT + "_100x100/" + item.image 
														: placeholderIcon} 
										className = {classes.ingredientImage}/>
							</Grid>

							<Grid item xs = {12} className = {classes.gridCenter}>
								<Typography variant = "subtitle1" className = {classes.ingredientLabel}>
									{/*<CheckBox/>*/}
									{item.measures.us.amount}{" "}{item.measures.us.unitShort}{" "}
									{item.measures.metric.amount !== item.measures.us.amount 
										? "(" + item.measures.metric.amount + " " + item.measures.metric.unitShort + ") "
										: ""}
									{item.name}
								</Typography>
							</Grid>

						</Grid>
					</Grid>
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
				<Tabs value={this.state.tabValue} onChange={this.changeTabValue}
							variant="fullWidth" indicatorColor="secondary" textColor="primary">
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
			<Grid container className = {classes.root}>
				<Grid item xs = {6} className = {classes.gridCenter}>
					<img src = {this.state.details.image} className = {classes.recipeImage}/>
				</Grid>

				<Grid item xs = {6} className = {classes.gridAboutRecipe}>
					{this.aboutRecipePanelJSX()}
				</Grid>

				<Grid item xs = {12}>
				  {this.tabPanelJSX()}
				</Grid>

				{/*<Grid item xs = {6} style = {{marginTop : "40px", "border-right" : "0.1px grey solid"}}>
					<Grid container style = {{margin : "0px 20px 0px 0px", width : "auto"}}>
						<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "20px"}}>
							<Typography variant = "button" className = {classes.heading}>Ingredients</Typography>
						</Grid>
						{this.ingredientJSX()}

						<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "20px"}}>
							<Typography variant = "button" className = {classes.heading}>Equipments</Typography>
						</Grid>
							{this.equipmentsJSX()}
					</Grid>
				</Grid>

				<Grid item xs = {6} style = {{marginTop : "40px"}}>
					<Grid container style = {{margin : "0px 0px 0px 20px", width : "auto"}}>
						<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "20px"}}>
							<Typography variant = "button" className = {classes.heading}>Instructions</Typography>
						</Grid>
							{this.instructionsJSX()}
					</Grid>
				</Grid>

				<Grid item xs = {12}>
					<NutiritionChart data = {this.state.details.nutrition.nutrients}/>
				</Grid>*/}
		  </Grid>
		)
	}

  render(){
		return(
		this.state.isLoaded && 
		  <Grid container spacing = {2}>

			  <Grid item xs = {12}>
					<NavBar home = {true}/>
				</Grid>

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
		  </Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeDetails);