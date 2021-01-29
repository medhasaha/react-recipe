import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import dashboardBackground from '../Assets/Images/background/dashboard_background.jpg';


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
})

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<div className={classes.root}>

			</div>
		)
	}
}

export default withStyles(style, {withTheme: true})(Dashboard);