import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import LogoIcon from '../Assets/Icons/Logo.svg'

const style = theme => ({

})

class LogIn extends Component {
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

export default withStyles(style, {withTheme: true})(LogIn);