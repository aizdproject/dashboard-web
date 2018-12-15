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
            let air_qualities = [];
            let created_at = [];

            if(greenhouse_node) {
                greenhouse_node.air_qualities.forEach(element => {
                    let air_quality = 0;
                    air_quality += element.air_quality1;
                    air_quality += element.air_quality2;
                    air_quality += element.air_quality3;
                    air_quality += element.air_quality4;
                    air_quality += element.air_quality5;
                    air_quality += element.air_quality6;
                    air_quality /= 6;
                
                    air_qualities.push(air_quality)
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
                            data: air_qualities,
                        },
                    ]
                }
            })
        });

        await axios.get('https://aizd.herokuapp.com/api/v1/node-statistics/air-quality')
        .then(res => {
            let air_qualities = res.data;
            let value = 0;

            if(air_qualities) {
                value += air_qualities.air_quality1;
                value += air_qualities.air_quality2;
                value += air_qualities.air_quality3;
                value += air_qualities.air_quality4;
                value += air_qualities.air_quality5;
                value += air_qualities.air_quality6;
                value /= 6;
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
                <div className="text-value">{this.state.Value} PPM</div>
                <div>Air Quality</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}