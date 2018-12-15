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
        await axios.get('https://aizd.herokuapp.com/api/v1/greenhouse-nodes')
        .then(res => {
            const greenhouse_node = res.data[0];
            let light_intensities = [];
            let created_at = [];

            if(greenhouse_node) {
                greenhouse_node.light_intensities.forEach(element => {
                    let light_intensity = 0;
                    light_intensity += element.light_intensity1;
                    light_intensity += element.light_intensity2;
                    light_intensity += element.light_intensity3;
                    light_intensity += element.light_intensity4;
                    light_intensity += element.light_intensity5;
                    light_intensity += element.light_intensity6;
                    light_intensity /= 6;
                
                    light_intensities.push(light_intensity)
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
                            label: 'Air Quality',
                            backgroundColor: 'rgba(255,255,255,.2)',
                            borderColor: 'rgba(255,255,255,.55)',
                            data: light_intensities,
                        },
                    ]
                }
            })
        });

        await axios.get('https://aizd.herokuapp.com/api/v1/node-statistics/light-intensity')
        .then(res => {
            let light_intensities = res.data;
            let value = 0;

            if(light_intensities) {
                value += light_intensities.light_intensity1;
                value += light_intensities.light_intensity2;
                value += light_intensities.light_intensity3;
                value += light_intensities.light_intensity4;
                value += light_intensities.light_intensity5;
                value += light_intensities.light_intensity6;
                value /= 6;
            }
            
            this.setState({
                Value: value
            })
        });

        
    }
    
    render() {
        return(
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.Value} Cd</div>
                <div>Light Intensity</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}