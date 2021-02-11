import React, {Component} from 'react';
import {getBookmarkedRecipesAPI} from '../ServiceClass.js';
import NavBar from './NavBar.js';

import { withStyles } from '@material-ui/core/styles';
import dashboardBackground from '../Assets/Images/background/dashboard_background.jpg';
import { Typography, Card, Grid } from '@material-ui/core';
import Cookbook from '../Assets/Icons/Cookbook.svg'

const style = theme => ({
	root : {
		// backgroundImage : `url(${dashboardBackground})`,
		// height : "100vh",
		// backgroundAttachment: "fixed",
		// backgroundRepeat: "no-repeat",
		// backgroundSize: "cover",
		// backgroundPosition: "top center",
	},
	card : {
		height : "100pxpx",
		width : "100%",
		borderRadius : "4px",
		backgroundColor: "transparent",
		boxShadow : "none"
	},
	gridCenter : {
  	alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	logo : {
		height : "100px",
		width : "100px",
		cursor : "pointer"
	},
	cookbookName : {
		cursor : "pointer"
	}
})

class Dashboard extends Component {
	constructor(props){
		super(props);
		const cookbooks = sessionStorage.getItem('cookbooks');
		this.state = {
			cookbooks : JSON.parse(cookbooks) || [],
			cookBooksData : []
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
				cookBooksData : res
			},() => console.log(this.state))
		}).catch(err => {console.log(err)})
	}

  render(){
		const { classes } = this.props;
		return(
			<div className={classes.root}>
				<Grid container>
					<Grid item xs = {12}>
						<NavBar home = {true}/>
					</Grid>
					<Grid container item xs = {12} style = {{margin : "84px 40px 0px 40px"}}>
						{this.state.cookbooks.length > 0 && this.state.cookbooks.map(item => (
							<Grid item xs = {2}>
								<Card className = {classes.card}>
									<Grid item xs = {12}  className = {classes.gridCenter}>
										<img src = {Cookbook} className = {classes.logo}/>
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
				</Grid>
			</div>
		)
	}
}

export default withStyles(style, {withTheme: true})(Dashboard);