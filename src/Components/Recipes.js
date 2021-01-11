import React, {Component} from 'react';
import {recipeAutocompleteAPI} from '../ServiceClass.js'

class Recipes extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		recipeAutocompleteAPI("ca")
		.then(res => {
			console.log(res)
		})
	}

  render(){
		return(
			<React.Fragment>{"Recipes.js"}</React.Fragment>
		)
	}
}

export default Recipes;