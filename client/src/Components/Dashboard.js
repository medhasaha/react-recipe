import React, {Component} from 'react';
import {getBookmarkedRecipesAPI} from '../ServiceClass.js';
import CONFIG from '../Config.js'
import NavBar from './NavBar.js';
import RecipeCard from './RecipeCard.js'
import AddIcon from '@material-ui/icons/AddCircle';

import { withStyles } from '@material-ui/core/styles';
import dashboardBackground from '../Assets/Images/background/dashboard_background.jpg';
import { Typography, Card, Grid, TextField} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Cookbook from '../Assets/Icons/Cookbook.svg'
import CookbookColored from '../Assets/Icons/CookbookColored.svg'
import CheckIcon from '@material-ui/icons/Check';

const style = theme => ({
	root : {
		backgroundColor: "rgba(255, 255, 255, 0.65)",
		display : "flex",
		// backgroundImage : `url(${dashboardBackground})`,
		// height : "100vh",
		// backgroundAttachment: "fixed",
		// backgroundRepeat: "no-repeat",
		// backgroundSize: "cover",
		// backgroundPosition: "top center",
	},
	card : {
		borderRadius : "4px",
		backgroundColor: "#fff",
		boxShadow : "none",
		padding : "20px 0px",
		cursor : "pointer"
	},
	gridCenter : {
  	alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	logo : {
		height : "70px",
		width : "70px",
	},
	cookbookName : {
	},
	noRecipeText : {
		textAlign : "center",
		marginTop : "80px",
		width : "100%"
	},
	addCookbookIcon : {
		height: "35px",
    width: "35px",
    verticalAlign: "bottom",
    marginLeft: "10px",
	}
})

class Dashboard extends Component {
	constructor(props){
		super(props);
		const cookbooks = sessionStorage.getItem('cookbooks');
		const cookbookIds = JSON.parse(cookbooks)
		this.state = {
			cookbooks : JSON.parse(cookbooks) || [],
			cookbooksData : null,
			activeID : cookbookIds && cookbookIds.length > 0 && cookbookIds[0].cookbook_id || "",
			isLoaded : false,
			newCookbookFlag : false,
			name : ""
		}
	}

	componentDidMount(){
		this.getCookBooksData()
	}

	getCookBooksData = () => {
		let cookbookIDsArray = [];
		this.state.cookbooks.map(item =>{ cookbookIDsArray.push(item.cookbook_id) })
		let cookbookIds = cookbookIDsArray.join()
		getBookmarkedRecipesAPI(cookbookIds)
		.then(res => {
			this.setState({
				cookbooksData : res
			},() => {
				console.log(this.state)
			})
		}).catch(err => {console.log(err)})
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	changeActiveID = (id) => {
		this.setState({
			activeID : id
		})
	}

	newCookBook = () => {
		this.setState({
			newCookbookFlag : true
		})
	}

	nameChangeHandler = (event) => {
		this.setState({
			name : event.target.value
		})
	}

  render(){
		const { classes } = this.props;
		return(
				<Grid container className = {classes.root}>

					<Grid item xs = {12}>
						<NavBar home = {true}/>
					</Grid>

					<Grid container style = {{margin : "84px 40px 0px 40px"}} >
						<Grid item xs = {8} >
							<Grid container>

							  <Grid item xs = {12} style = {{marginBottom : "20px"}}>
									<Typography variant = "h6">
									  My Cookbooks <AddIcon className = {classes.addCookbookIcon} onClick = {this.newCookbook}/>
									</Typography>
								</Grid>

								<Grid container item xs = {12} spacing = {4}>
								  <Grid item xs = {2}>
										<Card className = {classes.card}>
											<Grid item xs = {12}  className = {classes.gridCenter}>
												<img src = {CookbookColored} className = {classes.logo}/>
											</Grid>
											<Grid item xs = {12}  className = {classes.gridCenter}>
											  <TextField label="Add Name" size = "small"
												           onChange = {this.nameChangeHandler}
																		InputProps={{
																			endAdornment: <InputAdornment position="end">
																			                <CheckIcon/>
																										</InputAdornment>,
																		}}/>
											</Grid>
										</Card>	
									</Grid>
									
									{this.state.cookbooks.length > 0 && this.state.cookbooks.map(item => (
										<Grid item xs = {2}>
											<Card className = {classes.card} onClick = {() => {this.changeActiveID(item.cookbook_id)}}>
												<Grid item xs = {12}  className = {classes.gridCenter}>
													<img src = {item.cookbook_id === this.state.activeID ? CookbookColored : Cookbook} 
													     className = {classes.logo}/>
												</Grid>
												<Grid item xs = {12}  className = {classes.gridCenter}>
													<Typography variant = "subtitle1" className = {classes.cookbookName}>
														{item.cookbook_name}
													</Typography>
												</Grid>
											</Card>	
										</Grid>
									))}
								</Grid>

								<Grid container item xs = {12} spacing = {4}>
									{this.state.cookbooksData && this.state.cookbooksData[this.state.activeID].length > 0
										? this.state.cookbooksData[this.state.activeID].map(item => (
												<Grid item xs = {3}>
													<RecipeCard id = {item.recipe_id} 
																			image = {CONFIG.IMAGE_URL_RECIPE + item.recipe_id + "-312x231." + item.image_type}
																			title = {item.recipe_name}
																			redirectToRecipeDetails = {this.redirectToRecipeDetails}/>
												</Grid>
												))
									  : <Typography variant = "subtitle2" className = {classes.noRecipeText}>No Recipes Saved In This Cookbook</Typography>}
								</Grid>

							</Grid>
						</Grid>

						<Grid item xs = {4}>
							USER PREFERENCES
						</Grid>

					</Grid>
				</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(Dashboard);