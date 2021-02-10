import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import dashboardBackground from '../Assets/Images/background/dashboard_background.jpg';
import NavBar from './NavBar.js';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { Typography, Card, Grid } from '@material-ui/core';


const style = theme => ({
	root : {
		backgroundImage : `url(${dashboardBackground})`,
		height : "100vh",
		backgroundAttachment: "fixed",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "top center",
		// alignItems : "center",
		// justifyContent : "center",
		// display : "flex"
	},
	card : {
		height : "100pxpx",
		width : "100%",
		borderRadius : "4px",
		backgroundColor: "transparent",
		boxShadow : "none"
	},
})

class Dashboard extends Component {
	constructor(props){
		super(props);
		const cookbooks = sessionStorage.getItem('cookbooks');
		this.state = {
			cookbooks : JSON.parse(cookbooks)
		}
	}

  render(){
		const { classes } = this.props;
		console.log(this.state.cookbooks)
		return(
			<div className={classes.root}>
				<Grid container>
					<Grid item xs = {12}>
						<NavBar home = {true}/>
					</Grid>
					<Grid container item xs = {12} style = {{margin : "84px 40px 0px 40px"}}>
						{this.state.cookbooks.map(item => (
							<Grid item xs = {1}>
								<Card className = {classes.card}>
									<Grid item xs = {12}>
										<CollectionsBookmarkIcon/>
									</Grid>
									<Grid item xs = {12}>
										<Typography variant = "subtitle1">{item.cookbook_name}</Typography>
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