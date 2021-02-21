import React, {Component} from 'react';
import {bookmarkRecipeAPI, getBookmarkedRecipesAPI, changeCookbookAPI, deleteBookmarkAPI} from '../ServiceClass.js'
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Cookbook from '../Assets/Icons/Cookbook.svg'
import CookbookColored from '../Assets/Icons/CookbookColored.svg';

const style = theme => ({
	card : {
		height : "215px",
		width : "100%",
		position: "relative",
		borderRadius : "4px",
		backgroundColor: "transparent",
		boxShadow : "none"
	},
	image : {
		width : "100%",
		height : "180px",
		objectFit : "cover",
		objectPosition : "center center",
		borderBottom : "6px solid #932432"
	},
	titleDiv : {
		position : "absolute", 
		left : 0, 
		bottom : 0, 
		maxWidth : "160px",
		padding : "0px 10px 0px 10px", 
		backgroundColor : "#932432",
		borderRadius : "0px"
	},
	title : {
		margin : "5px 0px 5px 0px",
		// marginBottom : "10px",
		lineHeight: "1.3rem !important",
		textOverflow: "ellipsis",
		overflow: "hidden",
		"-webkit-line-clamp": 1,
		"-webkit-box-orient": "vertical",
		maxHeight: "1.5rem",
		display: "-webkit-box",
		cursor : "pointer",
		textTransform : "capitalize",
		// color : "#932432",
		color : "#fff",
		fontSize : "15px"
	},
	secondaryText : {
		cursor : "pointer",
		display : "inline",
		fontSize : "17px"
	},
	bookmarkIcon : {
		position: "absolute",
		top: "10px",
		right : "10px",
		fontSize : "40px",
		color : "white",
		cursor : "pointer",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	cookbookCard : {
		borderRadius : "4px",
		backgroundColor: "#fff",
		boxShadow : "none",
		// padding : "20px 0px",
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
	dialog : {
		height : "auto",
		maxHeight : "50%",
		width : "40%",
		padding : "20px",
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
	deleteButton : {
		color : "#932432",
		border: "1px solid #932432",
		float : "right"
	}
})

class BookmarkDialog extends Component {
	constructor(props){
		super(props);
		const recipes = sessionStorage.getItem('recipes');
		const savedRecipes = JSON.parse(recipes)
		let isBookmarked = savedRecipes && savedRecipes.length > 0 && savedRecipes.includes(props.id) || false;
		this.state = {
			results : [],
			isLoaded : false,
			isBookmarked : isBookmarked,
			openDialog : true,
			activeID : "",
			allCookbooks : [],
			openSuccessSnackbar : false,
			successMessage : "",
			openErrorSnackbar : false,
			errorMesssage : "",
		}
		this.bookmarkClickHandler()
	}

	bookmarkClickHandler = () => {
		if (this.state.isBookmarked){
			const cookbooks = sessionStorage.getItem('cookbooks');
			const allCookbooks = JSON.parse(cookbooks) || [];
			let cookbookIDsArray = [];
			allCookbooks.map(item =>{ cookbookIDsArray.push(item.cookbook_id) })
			let cookbookIds = cookbookIDsArray.join()
			getBookmarkedRecipesAPI(cookbookIds)
			.then(res => {
				let selectedCookbook = "";
				for(let i = 0 ; i < cookbookIDsArray.length ; i++ ){
					let ck = res[cookbookIDsArray[i]];
					for(let j = 0 ; j < ck.length ; j++){
						let r = ck[j];
						if (r.recipe_id === this.props.id){
							selectedCookbook = cookbookIDsArray[i];
							break;
						}
					}
					if(selectedCookbook) break;
				}
				this.setState({
					activeID : selectedCookbook,
				})
			})
		}
	}

	addBookmark = (cookbook_id) => {
		if(cookbook_id){
			bookmarkRecipeAPI(cookbook_id, this.props.id, this.props.title, "jpg")
			.then(res => {
				if(res.success){
					const r = sessionStorage.getItem('recipes');
					const r_arr = JSON.parse(r)
					const recipes = [...r_arr];
					recipes.push(this.props.id);
					sessionStorage.setItem('recipes', JSON.stringify(recipes));
					this.setState({
						isBookmarked : true,
						activeID : cookbook_id,
						openDialog : false,
						openSuccessSnackbar : true,
						successMessage : "Bookmark added Successfully!"
					},() => {
						this.props.returnBookmarkState(true)
					})
				}else if(res.err){
					if(res.errCode === "UNAUTHORIZED"){
						this.setState({
							openErrorSnackbar : true,
							errorMessage : "User Not Logged In!"
						},() => this.props.history.push({
							pathname: `/recipe/login`,
						}))
					}else{
						this.setState({
							openErrorSnackbar : true,
							errorMessage : "Error In Adding Bookmark. Try Again!"
						})
					}
				}
			})
		}else{
			this.setState({
				openErrorSnackbar : true,
				errorMessage : "Choose A Cookbook!"
			})
		}
	}

	changeCookbook = (cookbook_id) => {
		changeCookbookAPI(cookbook_id, this.props.id)
		.then(res => {
			if(res.success){
				this.setState({
					activeID : cookbook_id,
					openSuccessSnackbar : true,
					successMessage : "Cookbook Changed!"
				}, () => {this.props.callApi && this.props.callApi()})
			}else	if(res.errCode === "UNAUTHORIZED"){
				this.setState({
					openErrorSnackbar : true,
					errorMessage : "User Not Logged In!"
				},() => this.props.history.push({
					pathname: `/recipe/login`,
				}))
			}else{
				this.setState({
					openErrorSnackbar : true,
					errorMessage : "Error In Changing Cookbook. Try Again!"
				})
			}
		})
	}

	deleteBookmark = (cookbook_id) => {
		deleteBookmarkAPI(cookbook_id, this.props.id)
		.then(res => {
			if(res.success){
				const r = sessionStorage.getItem('recipes');
				const r_arr = JSON.parse(r)
				const oldRecipes = [...r_arr];
				const newRecipes = oldRecipes.filter(i => i !== this.props.id);
				sessionStorage.setItem('recipes', JSON.stringify(newRecipes));
				this.setState({
					isBookmarked : false,
					activeID : "",
					openDialog : false,
					openSuccessSnackbar : true,
					successMessage : "Bookmark Deleted Successfully!"
				}, () => {
					this.props.callApi && this.props.callApi()
					this.props.returnBookmarkState(false)
				})
			}else	if(res.errCode === "UNAUTHORIZED"){
				this.setState({
					openErrorSnackbar : true,
					errorMessage : "User Not Logged In!"
				},() => this.props.history.push({
					pathname: `/recipe/login`,
				}))
			}else{
				this.setState({
					openErrorSnackbar : true,
					errorMessage : "Error In Deleting Bookmark. Try Again!"
				})
			}
		})
	}

	cookbookClickHandler = (cookbook_id) => {
		if (this.state.isBookmarked){//change cookbook for recipe
      this.changeCookbook(cookbook_id)
		}else{//bookmark the recipe for first time
			this.setState({
				activeID : cookbook_id
			})
		}
	}

	dialogJSX = () => {
		const { classes } = this.props;
		const ck = sessionStorage.getItem('cookbooks');
		const cookbooks = JSON.parse(ck) || []
		if (cookbooks.length === 0){
			if (sessionStorage.getItem('session') === null){
				this.props.history.push({
					pathname: `/recipe/login`,
				})
			}
		}
		return(
			<Grid container spacing = {4}>
			  <Grid item xs = {12}>
					<Typography variant = "h6">{this.state.isBookmarked ? "Change Cookbook" : "Choose Cookbook"}</Typography>
				</Grid>
				{cookbooks.length > 0 && cookbooks.map(item => (
					<Grid item xs = {3}>
						<Card className = {classes.cookbookCard} onClick = {() => {this.cookbookClickHandler(item.cookbook_id)}}>
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
				<Grid item xs = {12}>
				  {this.state.isBookmarked 
					  ? <Button variant = "oulined" className = {classes.deleteButton} 
											onClick = {() => {this.deleteBookmark(this.state.activeID)}}
											enabled = {this.state.isBookmarked}>
								Delete Bookmark
							</Button>
					  : <Button variant = "oulined" className = {classes.deleteButton} 
											onClick = {() => {this.addBookmark(this.state.activeID)}}
											enabled = {this.state.isBookmarked}>
			          Add Bookmark
		          </Button>}
				</Grid>
			</Grid>
		)
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>

				{this.state.openDialog &&
					<Dialog classes = {{paper : classes.dialog}}
									onClose={() => {  this.setState({openDialog : false});  }} 
									open={this.state.openDialog}>
						{this.dialogJSX()}
					</Dialog>}

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
			</React.Fragment>
		)
	}
}

export default withRouter(withStyles(style, {withTheme: true})(BookmarkDialog));