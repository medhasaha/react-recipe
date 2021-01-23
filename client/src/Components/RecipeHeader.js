import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';import vegIcon from '../Assets/Icons/veg.svg'
import nonVegIcon from '../Assets/Icons/nonVeg.svg'

const style = theme => ({
	gridCenter : {
		textAlign : "center"
	},
	infoLabelBold : {
		fontSize : "1.5rem",
		fontWeight : "bold"
	},
	infoLabel : {
		fontSize : "1.5rem",
	},
	vegIcon : {
		height : "70px",
		width : "70px"
	},
	gridCenterFlex : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
})

class NavBar extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<Grid container>
				<Grid item xs = {12} className = {classes.gridCenter} style = {{marginBottom : "30px"}}>
					<Typography variant = "h3">{this.props.details.title}</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter} style = {{"border-right" : "0.1px grey solid"}}>
					{/*<Tooltip title = {"Cook Time"}><img src = {timeIcon} className = {classes.logo}/></Tooltip>*/}
					<Typography variant = "button" className = {classes.infoLabelBold}>Cook Time</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabel}>
						{this.props.details.readyInMinutes}
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter} style = {{"border-right" : "0.1px grey solid"}}>
					<Typography variant = "button" className = {classes.infoLabelBold}>Servings</Typography>
					<Typography variant = "subtitle1" className = {classes.infoLabel}>
						{this.props.details.servings}
					</Typography>
				</Grid>

				<Grid item xs = {4} className = {classes.gridCenter}>
					<Tooltip title = {"Vegetarian/ Non-vegetarian"}>
						<img src = {this.props.details.vegetarian ? vegIcon : nonVegIcon} 
								className = {classes.vegIcon}/>
					</Tooltip>
				</Grid>

				<Grid item xs = {12} className = {classes.gridCenterFlex} style = {{marginTop : "30px"}}>
					<Typography variant = "subtitle1" style = {{display : "inline"}}>
						{"AUTHOR : "} {this.props.details.creditsText}
					</Typography>
				</Grid>

				<Grid item xs = {12} className = {classes.gridCenterFlex} style = {{marginTop : "10px"}}>
					{this.props.details.dishTypes.length > 0 && this.props.details.dishTypes.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
					{this.props.details.cuisines.length > 0 && this.props.details.cuisines.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
					{this.props.details.diets.length > 0 && this.props.details.diets.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
					{this.props.details.occasions.length > 0 && this.props.details.occasions.map(item => (
						<Chip label = {item} variant = "outlined" />
					))}
				</Grid>

			</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(NavBar);