import React, {Component} from 'react';
import CONFIG from '../Config.js';
import {cuisineList} from '../ServiceClass.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const style = theme => ({
	text : {
		fontFamily : "Fira Sans",
		fontSize : "17px"
	}
})

class DrawerJSX extends Component {
	constructor(props){
		super(props);
		// console.log("DrawerJSX: ",props)
		this.state = {

		}
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
				<Typography variant = "subtitle1" className = {classes.text}>Cuisine</Typography>
				<Autocomplete
					options={cuisineList}
					getOptionLabel={(option) => option}
					onOpen={() => {this.setState({open : true}) }}
					onClose={() => { this.setState({open : false}) }}
					style={{ width: "100%" }}
					className = {classes.autocomplete}
					value = {this.state.value}//value selected by the user
					onChange = {(e, newValue) => this.props.cuisineChangeHandler(e, newValue)}
					renderInput={(params) => 
						<TextField {...params} variant="outlined"/>} />
			</React.Fragment>
		)
	}
}

export default withStyles(style, {withTheme: true})(DrawerJSX);