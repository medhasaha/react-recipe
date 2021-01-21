import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import LogoIcon from '../Assets/Icons/Logo.svg'

const style = theme => ({
	root : {
		flexGrow : "1"
	},
	appBar : {
    color: "#fff",
    backgroundColor: "#0d1010",
	},
	title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
	},
	logo : {
		height : "32px", 
		width : "32px", 
		verticalAlign : "top"
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		'&:hover': {
			backgroundColor: "rgba(255, 255, 255, 0.25);",
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: "8px",
			width: 'auto',
		},
	},
	searchIcon: {
		padding: "0px 16px",
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
		padding : "8px 8px 8px 0px",
    transition : "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    paddingLeft : "calc(1em + 32px)",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

class NavBar extends Component {
	constructor(props){
		super(props);
		console.log("RecipeSearch: ",props)
		this.state = {
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<div className={classes.root}>
				<AppBar position="static" className = {classes.appBar}>
					<Toolbar>
						<Typography className={classes.title} variant="h6" noWrap>
							Recipe 	<img src = {LogoIcon} className = {classes.logo}/>
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase placeholder="Search…"
								classes={{ root: classes.inputRoot, input: classes.inputInput, }}
								inputProps={{ 'aria-label': 'search' }}/>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default withStyles(style, {withTheme: true})(NavBar);