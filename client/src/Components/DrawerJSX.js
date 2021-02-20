import React, {Component, useState} from 'react';
import {cuisineList, dietList, intoleranceList, mealTypeList} from '../ServiceClass.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Typography, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider, Checkbox } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const style = theme => ({
	text : {
		fontSize : "17px",
		// color : "#fff"
	},
	textSmall : {
		fontSize : "14px",
		textTransform : "capitalize",
		// color : "#fff"
	},
	divider : {
		// backgroundColor : "#fff"
	},
	icon : {
		// fill : "#fff",
	},
	list : {
		padding : "0px"
	},
	listItemRoot : {
		paddingTop : "2px",
		paddingBottom : "2px"
	},
	listItemIcon : {
		minWidth : "40px"
	},
	checkBox : {
		padding : "4px",
		// color : "#fff"
	},
	button : {
		marginTop : "20px",
		marginBottom : "114px",
		marginRight : "5px",
		width : "-webkit-fill-available",
		// color : "#fff",
		border: "1px solid #932432",
	},
	chip : {
		// border : "1px solid #932432",
		backgroundColor : "#932432",
		color : "#fff",
		margin : "2px"
	},

})

const DrawerJSX = (props) => {
	const [cuisine, setCuisine] = useState(false)
	const [diet, setDiet] = useState(false)
	const [intolerance, setIntolerance] = useState(false)
	const [mealType, setMealType] = useState(false)

	const [selectedCuisine, setSelectedCuisine] = useState(props.selectedCuisine)
	const [selectedDiet, setSelectedDiet] = useState(props.selectedDiet)
	const [selectedIntolerance, setSelectedIntolerance] = useState(props.selectedTolerance)
	const [selectedMealType, setSelectedMealType] = useState(props.selectedMealType)

	const cuisineCollapseHandler = () =>{
		setCuisine(current => !current)
		setDiet(false)
		setIntolerance(false)
		setMealType(false)
	}

	const dietCollapseHandler = () =>{
		setDiet(current => !current)
		setCuisine(false)
		setIntolerance(false)
		setMealType(false)
	}

	const intoleranceCollapseHandler = () =>{
		setIntolerance(current => !current)
		setDiet(false)
		setCuisine(false)
		setMealType(false)
	}

	const mealCollapseHandler = () =>{
		setMealType(current => !current)
		setDiet(false)
		setIntolerance(false)
		setCuisine(false)
	}

	const cuisineSelectHandler = (selectedIndex) => {
		const values = selectedCuisine.some( item => item === cuisineList[selectedIndex])
									 ? selectedCuisine.filter( item => item !== cuisineList[selectedIndex])
									 : selectedCuisine.concat([cuisineList[selectedIndex]]);	
		setSelectedCuisine(values)
	}

	const dietSelectHandler = (selectedIndex) => {
		const values = selectedDiet.some( item => item === dietList[selectedIndex])
									 ? selectedDiet.filter( item => item !== dietList[selectedIndex])
									 : selectedDiet.concat([dietList[selectedIndex]]);	
		setSelectedDiet(values)
	}

	const intoleranceSelectHandler = (selectedIndex) => {
		const values = selectedIntolerance.some( item => item === intoleranceList[selectedIndex])
									 ? selectedIntolerance.filter( item => item !== intoleranceList[selectedIndex])
									 : selectedIntolerance.concat([intoleranceList[selectedIndex]]);	
		setSelectedIntolerance(values)
	}

	const mealTypeSelectHandler = (selectedIndex) => {
		const values = selectedMealType.some( item => item === mealTypeList[selectedIndex])
									 ? selectedMealType.filter( item => item !== mealTypeList[selectedIndex])
									 : selectedMealType.concat([mealTypeList[selectedIndex]]);	
		setSelectedMealType(values)
	}

	const applyFilters = () => {
		return ({
			selectedCuisine,
			selectedDiet,
			selectedIntolerance,
			selectedMealType,
		})
	}

	const { classes } = props;
	return(
		<React.Fragment>

			{props.selectedCuisine.length > 0 && props.selectedCuisine.map(item => (
				item !== "" && <Chip label = {item} variant = "outlined" className = {classes.chip}/>
			))}
			{props.selectedDiet.length > 0 && props.selectedDiet.map(item => (
				item !== "" && <Chip label = {item} variant = "outlined" className = {classes.chip}/>
			))}
			{props.selectedTolerance.length > 0 && props.selectedTolerance.map(item => (
				item !== "" && <Chip label = {item} variant = "outlined" className = {classes.chip}/>
			))}
			{props.selectedMealType.length > 0 && props.selectedMealType.map(item => (
				item !== "" && <Chip label = {item} variant = "outlined" className = {classes.chip}/>
			))}

			<List className = {classes.list}>
				<ListItem button onClick = {() => cuisineCollapseHandler()}>
					<ListItemText primary="Cuisine" classes = {{primary : classes.text}}/>
					{cuisine ? <ExpandLess className = {classes.icon}/> : <ExpandMore className = {classes.icon}/>}
				</ListItem>
				<Collapse in={cuisine} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{cuisineList.map((item,index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {cuisineSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedCuisine.some( i => i === item)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
								<Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%" className = {classes.divider}/>

			<List className = {classes.list}>
				<ListItem button onClick = {() => dietCollapseHandler()}>
					<ListItemText primary="Diet" classes = {{primary : classes.text}}/>
					{diet ? <ExpandLess className = {classes.icon}/> : <ExpandMore className = {classes.icon}/>}
				</ListItem>
				<Collapse in={diet} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{dietList.map((item, index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {dietSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedDiet.some( i => i === item)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
							  <Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
						  </ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%" className = {classes.divider}/>

			<List className = {classes.list}>
				<ListItem button onClick = {() => intoleranceCollapseHandler()}>
					<ListItemText primary="Intolerance" classes = {{primary : classes.text}}/>
				  {intolerance ? <ExpandLess className = {classes.icon}/> : <ExpandMore className = {classes.icon}/>}
				</ListItem>
				<Collapse in={intolerance} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{intoleranceList.map((item, index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {intoleranceSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedIntolerance.some( i => i === item)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
								<Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%" className = {classes.divider}/>

			<List className = {classes.list} >
				<ListItem button onClick = {() => mealCollapseHandler()}>
					<ListItemText primary="Meal Type" classes = {{primary : classes.text}}/>
				  {mealType ? <ExpandLess className = {classes.icon}/> : <ExpandMore className = {classes.icon}/>}
				</ListItem>
				<Collapse in={mealType} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{mealTypeList.map((item, index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {mealTypeSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedMealType.some( i => i === item)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
								<Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%" className = {classes.divider}/>

			<Button variant="contained" 
							className = {classes.button} 
							color = "secondary"
							onClick = {() => {props.applyFilter(applyFilters())}}>
				Apply
			</Button>

		</React.Fragment>
	)
}

export default withStyles(style, {withTheme: true})(DrawerJSX);