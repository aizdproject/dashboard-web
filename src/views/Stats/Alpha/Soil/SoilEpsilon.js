import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Card,
    CardBody,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import Pusher from 'pusher-js';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const pusher = new Pusher('b01fb79d33e790f8c38d', {
    cluster: 'ap1',
    encrypted: true
});
const channel = pusher.subscribe('alpha');

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
        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/alpha')
        .then(res => {
            const alpha_node = res.data[0];
            let epsilons = [];
            let created_at = [];
            let last_epsilon = alpha_node.soil_epsilon[alpha_node.soil_epsilon.length - 1];

            if(alpha_node) {
                alpha_node.soil_epsilon.forEach(element => {
                    epsilons.push(element);
                });

                alpha_node.created_at.forEach(element => {
                    created_at.push(element)
                });

                this.setState({
                    Data : {
                        labels: created_at,
                        datasets: [
                            {
                                label: 'Soil Epsilon',
                                backgroundColor: 'rgba(255,255,255,.2)',
                                borderColor: 'rgba(255,255,255,.55)',
                                data: epsilons,
                            },
                        ]
                    },
                    Value: last_epsilon
                })
            }
        });

        await channel.bind('update-alpha', data => {
            const alpha_node = data;
            let epsilons = [];
            let created_at = [];
            let last_epsilon = alpha_node.soil_epsilon[alpha_node.soil_epsilon.length - 1];

            if(alpha_node) {
                alpha_node.soil_epsilon.forEach(element => {
                    epsilons.push(element);
                });

                alpha_node.created_at.forEach(element => {
                    created_at.push(element)
                });

                this.setState({
                    Data : {
                        labels: created_at,
                        datasets: [
                            {
                                label: 'Soil Epsilon',
                                backgroundColor: 'rgba(255,255,255,.2)',
                                borderColor: 'rgba(255,255,255,.55)',
                                data: epsilons,
                            },
                        ]
                    },
                    Value: last_epsilon
                })
            }
        });
    }
    
    render() {
        return(
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.Value }</div>
                <div>Soil Epsilon</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}