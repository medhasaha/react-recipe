import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';


const style = theme => ({

})

class Recipes extends Component {
	constructor(props){
		super(props);
		// console.log("Nutrition Charts",this.props)
		let percentage = [], amounts = [], labels = [];
		this.props.data.map(item =>{
			percentage.push(item.percentOfDailyNeeds)
			// amounts.push(item.amount + " " + item.unit)
			labels.push(item.name + " (" + item.amount + " " + item.unit + ") ")
		})

		let letters = '0123456789ABCDEF'.split('');
		let colorArr = []
		for(let i = 0; i < percentage.length ; i++ ){
		  let color = '#';
			for (let j = 0; j < 6; j++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			colorArr.push(color)
	  }

    let chartData = {
      labels: labels,
      datasets:
        [{
          type: 'doughnut',
          label: labels,
          data: percentage,
          borderWidth: 1,
          backgroundColor: colorArr,
          borderColor: "white",
          hoverBorderColor: 'fff',
        }]
		}
		
		this.state = {
			chartData : chartData
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
			  <div style = {{marginTop : "60px"}}>
				<Doughnut data = {this.state.chartData}
					type="doughnut"
					options={{
						// responsive: true,
						// maintainAspectRatio: false,
						aspectRatio : 3,
						segmentShowStroke : true,
						segmentStrokeColor : "#fff",
						segmentStrokeWidth : 2,
						percentageInnerCutout : 50,
						animationSteps : 100,
						animationEasing : "easeOutBounce",
						animateRotate : true,
						animateScale : false,
						showScale: true,
						animateScale: true,
						// title : {
						// 	position: "top",
						// 	text: "Nutrition Chart",
						// 	display: true,
						// 	fontSize: 18,
						// 	fontColor: "#111"
						// },
						legend: {
							display: true,
							position: "right",
							labels: {
								fontColor: "#333",
                fontSize: 14
							},
						},
					}}/>
				</div>
		  </React.Fragment>
		)
	}
}

export default withStyles(style, {withTheme: true})(Recipes);