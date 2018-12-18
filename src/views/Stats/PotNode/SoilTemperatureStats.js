import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Card,
    CardBody,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

export default class PotNodeChart extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            Value: 0,
            Data: {},
            mainChartOpts : {
                tooltips: {
                    enabled: false,
                    custom: CustomTooltips
                  },
                  maintainAspectRatio: false,
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        display: false,
                      }],
                    yAxes: [
                      {
                        display: false,
                      }],
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
              }
        }
    }

    async componentDidMount() {
        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/pot-nodes')
        .then(res => {
            const pot_node = res.data[0];
            let temperatures = [];
            let created_at = [];

            if(pot_node) {
                pot_node.soil_temperatures.forEach(element => {
                    let temperature = 0;
                    temperature += element.temperature1;
                    temperature += element.temperature2;
                    temperature += element.temperature3;
                    temperature += element.temperature4;
    
                    temperature /= 4;
                
                    temperatures.push(temperature)
                });

                pot_node.created_at.forEach(element => {
                    created_at.push(element)
                });
            }

            this.setState({
                Data : {
                    labels: created_at,
                    datasets: [
                        {
                            label: 'Temperature',
                            backgroundColor: 'rgba(255,255,255,.2)',
                            borderColor: 'rgba(255,255,255,.55)',
                            data: temperatures,
                        },
                    ]
                }
            })
        });

        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/node-statistics/soil-temperature')
        .then(res => {
            let temperatures = res.data;
            let value = 0;

            if(temperatures) {
                value += temperatures.temperature1;
                value += temperatures.temperature2;
                value += temperatures.temperature3;
                value += temperatures.temperature4;
                value /= 4;
            }
            
            this.setState({
                Value: value
            })
        });

        
    }
    
    render() {
        return(
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.Value } C</div>
                <div>Soil Temperature</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}