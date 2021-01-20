import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2'

const style = theme => ({

})

class Recipes extends Component {
	constructor(props){
		super(props);
		console.log(this.props)
		this.state = {

		}
	}

	componentDidMount(){

	}

  render(){
		const { classes } = this.props;
		return(
			<Grid container className = {classes.root}>
				<Grid item xs = {12}>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(Recipes);