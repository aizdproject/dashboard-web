import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Card,
    CardBody,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';
import Pusher from 'pusher-js';
import CountUp from 'react-countup';

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
            let humidities = [];
            let created_at = [];
            let last_humidity = alpha_node.air_humidity[alpha_node.air_humidity.length - 1];

            if(alpha_node) {
                alpha_node.air_humidity.forEach(element => {
                    humidities.push(element);
                });

                alpha_node.created_at.forEach(element => {
                    created_at.push(element)
                });

                this.setState({
                    Data : {
                        labels: created_at,
                        datasets: [
                            {
                                label: 'Air Humidity',
                                backgroundColor: 'rgba(255,255,255,.2)',
                                borderColor: 'rgba(255,255,255,.55)',
                                data: humidities,
                            },
                        ]
                    },
                    Value: last_humidity
                })
            }
        });

        await channel.bind('update-alpha', data => {
            const alpha_node = data;
            let humidities = [];
            let created_at = [];
            let last_humidity = alpha_node.air_humidity[alpha_node.air_humidity.length - 1];

            if(alpha_node) {
                alpha_node.air_humidity.forEach(element => {
                    humidities.push(element);
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
                                    label: 'Soil humiditie',
                                    backgroundColor: 'rgba(255,255,255,.2)',
                                    borderColor: 'rgba(255,255,255,.55)',
                                    data: humidities,
                                },
                            ]
                        },
                        Value: last_humidity
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
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value"><CountUp end={this.state.Value} duration={9} /> %</div>
                <div>Air Humidity</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={70} />
              </div>
            </Card>
        )
    }
}