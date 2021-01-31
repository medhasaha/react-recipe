import React, {Component} from 'react';
import {recipeDetailsAPI, similarRecipesAPI, recipeEquipmentsAPI} from '../ServiceClass.js';
import CONFIG from '../Config.js'
import RecipeCard from './RecipeCard.js'
import NutiritionChart from './NutritionChart.js'
import RecipeHeader from './RecipeHeader.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import placeholderIcon from '../Assets/Icons/placeholder.svg'
import vegIcon from '../Assets/Icons/veg.svg'
import nonVegIcon from '../Assets/Icons/nonVeg.svg'
import veganIcon from '../Assets/Icons/vegan.svg'



const style = theme => ({
	root : {
    border: "5px solid lightgray",
    margin: "20px",
    width: "auto",
    padding: "20px",
	},
	recipeImage : {
		width : "300px",
		height : "300px",
		objectFit : "cover",
		objectPosition : "center center",
		borderRadius : "50%"
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
		backgroundColor : "lightgray"
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
		fontSize : "1.5rem",
	},
	infoLabelBold : {
		fontSize : "1.5rem",
		fontWeight : "bold"
	},
	heading : {
		fontSize : "2rem",
	},
	vegIcon : {
		height : "70px",
		width : "70px"
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
	}
})

class RecipeDetails extends Component {
	constructor(props){
		super(props);
		console.log("RecipeDetails: ",props)

		this.state = {
			details : null,
			similarRecipes : [],
			equipments : [],
			isLoaded : false
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
					<Typography variant = "h3">{this.state.details.title}</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter} style = {{"border-right" : "0.1px grey solid"}}>
					{/*<Tooltip title = {"Cook Time"}><img src = {timeIcon} className = {classes.logo}/></Tooltip>*/}
					<Typography variant = "button" className = {classes.infoLabelBold}>Cook Time</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabel}>
						{this.state.details.readyInMinutes}
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter} style = {{"border-right" : "0.1px grey solid"}}>
					<Typography variant = "button" className = {classes.infoLabelBold}>Servings</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabel}>
						{this.state.details.servings}
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
					<Tooltip title = {"Vegetarian/ Non-vegetarian"}>
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
						<Chip label = {item} variant = "outlined" />
					))}
					{this.state.details.cuisines.length > 0 && this.state.details.cuisines.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
					{this.state.details.diets.length > 0 && this.state.details.diets.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
					{this.state.details.occasions.length > 0 && this.state.details.occasions.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
				</Grid>

			</Grid>
		)
	}

	ingredientJSX = (item) => {
		const { classes } = this.props;
		return (
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
		)
	}

	equipmentsJSX = (item) => {
		const { classes } = this.props;
		return (
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
		)
	}

	instructionsJSX = () => {
		const { classes } = this.props;
		return (	
			<ol className = {classes.ol_style}>
			  {this.state.details.analyzedInstructions[0].steps.map((item,index) => (
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

	detailsJSX = () => {
		const { classes } = this.props;
		return (
			<Grid container className = {classes.root}>
				<Grid item xs = {4} className = {classes.gridCenter}>
					<img src = {this.state.details.image} className = {classes.recipeImage}/>
				</Grid>

				<Grid item xs = {8} className = {classes.gridAboutRecipe}>
					{/*this.aboutRecipePanelJSX()*/}
					<RecipeHeader details = {this.state.details}/>
				</Grid>

				<Grid item xs = {6} style = {{marginTop : "40px", "border-right" : "0.1px grey solid"}}>
					<Grid container style = {{margin : "0px 20px 0px 0px", width : "auto"}}>
						<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "20px"}}>
							<Typography variant = "button" className = {classes.heading}>Ingredients</Typography>
						</Grid>
						{this.state.details.extendedIngredients.map(item => (
							this.ingredientJSX(item)
						))}
						<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "20px"}}>
							<Typography variant = "button" className = {classes.heading}>Equipments</Typography>
						</Grid>
						{this.state.equipments.map(item => (
							this.equipmentsJSX(item)
						))}
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
				</Grid>
			</Grid>
		)
	}

  render(){
		return(
		this.state.isLoaded && 
		  <Grid container spacing = {2}>
				<Grid item xs = {10}>
				  {this.detailsJSX()}
				</Grid>
				<Grid item xs = {2}>
					<Grid container spacing = {2}>
						{this.state.similarRecipes.length > 0 && 
							this.state.similarRecipes.map(item => (
							<Grid item xs = {12}>
								<RecipeCard id = {item.id} 
														image = {CONFIG.IMAGE_URL_RECIPE + item.id + "-312x231." + item.imageType}
														title = {item.title}
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