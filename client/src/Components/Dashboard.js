import React, {Component} from 'react';
import {getBookmarkedRecipesAPI, createCookbookAPI, changeCookbookNameAPI, deleteCookbookAPI} from '../ServiceClass.js';
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
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
	mainCard : {
		height : "100%",
		width : "auto",
		padding : "20px"
	},
	card : {
		borderRadius : "4px",
		backgroundColor: "#fff",
		boxShadow : "none",
		padding : "20px 0px",
		cursor : "pointer"
	},
	newCard : {
		borderRadius : "4px",
		backgroundColor: "#fff",
		padding : "20px 10px",
		cursor : "pointer",
		boxShadow : "none",
		border : "2px solid #000",
		position : "relative"
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
		cursor : "pointer"
	},
	nameTextField : {
		"& .MuiInputLabel-marginDense" : {
			transform: "translate(0, 7px) scale(1)",
		},
		"& .MuiInput-formControl" : {
			marginTop : "0px"
		},
		"& .MuiInput-underline:after" : {
			borderBottom : "2px solid #000"
		},
		"& .MuiFormLabel-root.Mui-focused" : {
			color : "rgba(0, 0, 0, 0.42)"
		}
	},
	checkIcon : {
		cursor : "pointer"
	},
	cancelIcon : {
		cursor : "pointer",
		position : "absolute",
		top : 0,
		right : 0,
		color : "rgba(0, 0, 0, 0.42)",
		margin : "5px",
		"& :hover" : {
			color : "#000"
		}
	},
	editIcon : {
		float : "right",
		cursor : "pointer",
		marginRight : "20px"
	},
	deleteIcon : {
		float : "right",
		cursor : "pointer",
		marginRight : "20px"
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
			newName : "",
			editCookbookNameFlag : false,
			currentNewName : "",
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

	addNewCookbook = () => {
		createCookbookAPI(this.state.newName)
		.then(res => {
			console.log(res)
			if(res.success){
				sessionStorage.setItem('cookbooks', JSON.stringify(res.results));
				this.setState({
					cookbooks : res.results,
					newCookbookFlag : false,
					newName : ""
				},() => { this.getCookBooksData()	})
			}
		}).catch(err => {console.log(err)})
	}

	editCookbookName = () => {
		this.setState({
			editCookbookNameFlag : true
		})
	}

	deleteCookbook = () => {
		deleteCookbookAPI(this.state.activeID)
		.then(res => {
			if(res.success){
				sessionStorage.setItem('cookbooks', JSON.stringify(res.results));
				this.setState({
					cookbooks : res.results,
					activeID : this.state.cookbooks && this.state.cookbooks.length > 0 && this.state.cookbooks[0].cookbook_id || "",
				},() => { this.getCookBooksData()	})
			}
		}).catch(err => {console.log(err)})
	}

	changeCookbookName = () => {
		changeCookbookNameAPI(this.state.activeID, this.state.currentNewName)
		.then(res => {
			if(res.success){
				sessionStorage.setItem('cookbooks', JSON.stringify(res.results));
				this.setState({
					cookbooks : res.results,
					currentNewName : "",
					editCookbookNameFlag : false
				})
			}
		}).catch(err => {console.log(err)})
	}

	getCurrentCookbookName = (id) => {
		let currentCookbook = this.state.cookbooks.find(item => ( item.cookbook_id === id))
		return currentCookbook.cookbook_name
	}

  render(){
		const { classes } = this.props;
		return(
				<Grid container className = {classes.root}>

					<Grid item xs = {12}>
						<NavBar home = {true}  search = {true}/>
					</Grid>

					<Grid container style = {{margin : "84px 40px 0px 40px"}} >
						<Grid item xs = {8} >
							<Grid container>

							  <Grid item xs = {12} style = {{marginBottom : "20px"}}>
									<Typography variant = "h6">
									  My Cookbooks 
										<AddIcon className = {classes.addCookbookIcon} 
										         onClick = {() => {this.setState({ newCookbookFlag : true }) }}/>
									</Typography>
								</Grid>

								<Grid container item xs = {12} spacing = {4} style = {{marginBottom : "20px"}}>
									{this.state.cookbooks && this.state.cookbooks.length > 0 && this.state.cookbooks.map(item => (
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

									{this.state.newCookbookFlag &&
										<Grid item xs = {3}>
											<Card className = {classes.newCard}>
												<Grid item xs = {12}  className = {classes.gridCenter}>
													<img src = {Cookbook} className = {classes.logo}/>
												</Grid>
												<Grid item xs = {12}  className = {classes.gridCenter}>
													<TextField label={this.state.newName === "" ? "Add Name" : ""} size = "small"
																		className = {classes.nameTextField}
																		onChange = {(event) => { 	this.setState({ newName : event.target.value }) }}
																		InputLabelProps={{ shrink: false }}
																			InputProps={{
																				endAdornment: <InputAdornment position="end">
																												<CheckIcon className = {classes.checkIcon} 
																																	onClick = {this.addNewCookbook}
																																	style = {{color : this.state.newName === "" ? "rgba(0, 0, 0, 0.42)" : "#000"}}/>
																											</InputAdornment>
																			}}/>
												</Grid>
												<ClearIcon className = {classes.cancelIcon} 
												           onClick = {() => { 
																		 this.setState({
																			 newName : "", 
																			 newCookbookFlag : false}) 
																	 }}/>
											</Card>	
										</Grid>}
								</Grid>

								<Grid item xs = {12}>
									<Card className = {classes.mainCard}>
									  <Grid container item xs = {12} spacing = {4}>
											{<Grid item xs = {12}>
											    {this.state.editCookbookNameFlag === false
														? <Typography variant = "h6" style = {{display : "inline"}}>
																{this.state.cookbooks && this.state.cookbooks.length > 0 && this.state.activeID && 
																this.getCurrentCookbookName(this.state.activeID)}
															</Typography>
														: <TextField label={this.state.currentNewName === "" ? "Add Name" : ""} size = "small"
																				 className = {classes.nameTextField}
																				 onChange = {(event) => { 	this.setState({ currentNewName : event.target.value }) }}
																				 InputLabelProps={{ shrink: false }}
																					  InputProps={{
																						  endAdornment: <InputAdornment position="end">
																														  <CheckIcon className = {classes.checkIcon} 
																																			   onClick = {this.changeCookbookName}
																																			   style = {{color : this.state.currentNewName === "" ? "rgba(0, 0, 0, 0.42)" : "#000"}}/>
																													  </InputAdornment>
																					}}/>}
													<EditIcon className = {classes.editIcon} onClick = {() => this.editCookbookName()}/>
													<DeleteIcon className = {classes.deleteIcon} onClick = {() => this.deleteCookbook()}/>
												</Grid>}

											{this.state.cookbooksData && this.state.cookbooksData[this.state.activeID].length > 0
												? this.state.cookbooksData[this.state.activeID].map(item => (
														<Grid item xs = {3}>
															<RecipeCard id = {item.recipe_id} 
																					image = {CONFIG.IMAGE_URL_RECIPE + item.recipe_id + "-312x231." + item.image_type}
																					title = {item.recipe_name}
																					redirectToRecipeDetails = {this.redirectToRecipeDetails}
																					callApi = {this.getCookBooksData}
																					maxSize = "120px"/>
														</Grid>
														))
												: <Typography variant = "subtitle2" className = {classes.noRecipeText}>No Recipes Saved In This Cookbook</Typography>
											}
										</Grid>
									</Card>
								</Grid>

							</Grid>
						</Grid>

						<Grid item xs = {4}>
							USER PREFERENCES
						</Grid>

					</Grid>

					<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
										open={this.state.openSuccessSnackbar} autoHideDuration={5000}
										onClose={() => {	this.setState({openSuccessSnackbar : false}) }}>
						<SnackbarContent style={{ backgroundColor:'#4caf50', color : "#fff"}}
														 message = {this.state.successMessage}/>
					</Snackbar>

					<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
										open={this.state.openErrorSnackbar} autoHideDuration={3000} 
										onClose={() => { 	this.setState({openErrorSnackbar : false}) }}>
						<SnackbarContent style={{ backgroundColor:'#f44336', color : "#fff"}} 
														 message={this.state.errorMessage}/>
					</Snackbar>

				</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(Dashboard);