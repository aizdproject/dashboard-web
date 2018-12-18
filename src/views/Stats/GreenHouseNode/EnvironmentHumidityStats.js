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
        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/greenhouse-nodes')
        .then(res => {
            const greenhouse_node = res.data[0];
            let humidities = [];
            let created_at = [];

            if(greenhouse_node) {
                greenhouse_node.humidities.forEach(element => {
                    let humidity = 0;
                    humidity += element.humidity1;
                    humidity += element.humidity2;
                    humidity += element.humidity3;
                    humidity += element.humidity4;
                    humidity += element.humidity5;
                    humidity += element.humidity6;
                    humidity /= 6;
                
                    humidities.push(humidity)
                });

                greenhouse_node.created_at.forEach(element => {
                    created_at.push(element)
                });
            }

            this.setState({
                Data : {
                    labels: created_at,
                    datasets: [
                        {
                            label: 'Humidity',
                            backgroundColor: 'rgba(255,255,255,.2)',
                            borderColor: 'rgba(255,255,255,.55)',
                            data: humidities,
                        },
                    ]
                }
            })
        });

        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/node-statistics/environment-humidity')
        .then(res => {
            let humidities = res.data;
            let value = 0;

            if(humidities) {
                value += humidities.humidity1;
                value += humidities.humidity2;
                value += humidities.humidity3;
                value += humidities.humidity4;
                value += humidities.humidity5;
                value += humidities.humidity6;
                value /= 6;
            }
            
            this.setState({
                Value: value
            })
        });

        
    }
    
    render() {
        return(
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.Value } %</div>
                <div>Environment Humidity</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}