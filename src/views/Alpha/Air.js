import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import AirChart from './AirChart';
import AirChartWeekly from './AirChartWeekly';
import AirChartMonthly from './AirChartMonthly';

export default class Air extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'daily'
        }

        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }
    
    render() {
        let chart = null;

        if(this.state.selectedOption === 'daily') {
            chart = (<AirChart/>);
        } else if(this.state.selectedOption === 'weekly') {
            chart = (<AirChartWeekly/>);
        } else if(this.state.selectedOption === 'monthly') {
            chart = (<AirChartMonthly/>);
        }
        return(
            <div>
                <ButtonGroup>
                  <Button onClick={this.handleOptionChange} value="daily" active={this.state.selectedOption === "daily"}>Harian</Button>
                  <Button onClick={this.handleOptionChange} value="weekly" active={this.state.selectedOption  === "weekly"}>Mingguan</Button>
                  <Button onClick={this.handleOptionChange} value="monthly" active={this.state.selectedOption  === "monthly"}>Bulanan</Button>
                </ButtonGroup>
                { chart }
            </div>
        );
    }
}