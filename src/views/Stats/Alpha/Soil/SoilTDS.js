import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Card,
    CardBody,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('b01fb79d33e790f8c38d', {
    cluster: 'ap1',
    encrypted: true
});
const channel = pusher.subscribe('alpha');

export default class PotNodeChart extends Component
{
    _isMounted = false;

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
        this._isMounted = true;
        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/alpha')
        .then(res => {
            const alpha_node = res.data[0];
            let tdss = [];
            let created_at = [];
            let last_tds = alpha_node.soil_tds[alpha_node.soil_tds.length - 1];

            if(alpha_node) {
                alpha_node.soil_tds.forEach(element => {
                    tdss.push(element);
                });

                alpha_node.created_at.forEach(element => {
                    created_at.push(element)
                });

                if(this._isMounted) {
                    this.setState({
                        Data : {
                            labels: created_at,
                            datasets: [
                                {
                                    label: 'Soil TDS',
                                    backgroundColor: 'rgba(255,255,255,.2)',
                                    borderColor: 'rgba(255,255,255,.55)',
                                    data: tdss,
                                },
                            ]
                        },
                        Value: last_tds
                    })
                }
            }
        });

        await channel.bind('update-alpha', data => {
            const alpha_node = data;
            let tdss = [];
            let created_at = [];
            let last_tds = alpha_node.soil_tds[alpha_node.soil_tds.length - 1];

            if(alpha_node) {
                alpha_node.soil_tds.forEach(element => {
                    tdss.push(element);
                });

                alpha_node.created_at.forEach(element => {
                    created_at.push(element)
                });

                if(this._isMounted) {
                    this.setState({
                        Data : {
                            labels: created_at,
                            datasets: [
                                {
                                    label: 'Soil TDS',
                                    backgroundColor: 'rgba(255,255,255,.2)',
                                    borderColor: 'rgba(255,255,255,.55)',
                                    data: tdss,
                                },
                            ]
                        },
                        Value: last_tds
                    })
                }
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        return(
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{ this.state.Value } mg/L</div>
                <div>Soil Total Dissolved Solid</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}