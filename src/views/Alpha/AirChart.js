import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import Pusher from 'pusher-js';
// import moment from 'moment';

const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

const pusher = new Pusher('b01fb79d33e790f8c38d', {
    cluster: 'ap1',
    encrypted: true
});
const channel = pusher.subscribe('alpha');

export default class AirChart extends Component
{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            Data: {},
            mainChartOpts : {
                tooltips: {
                  enabled: false,
                  custom: CustomTooltips,
                  intersect: true,
                  mode: 'index',
                  position: 'nearest',
                  callbacks: {
                    labelColor: function(tooltipItem, chart) {
                      return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                    }
                  }
                },
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        drawOnChartArea: true,
                      }
                    }],
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: 10,
                      },
                    }],
                },
                elements: {
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/alpha')
        .then(res => {
            const alpha = res.data[0];
            let temperature = [];
            let humidity = [];
            let gas_quality = [];
            let created_at = [];

            if(alpha) {
                // console.log(moment('16/03/1998', 'DD/MM/YYYY-H:mm:ss').year());
                alpha.air_temperature.forEach(element => {
                    temperature.push(element)
                });

                alpha.air_humidity.forEach(element => {
                    humidity.push(element)
                });

                alpha.air_gas_quality.forEach(element => {
                    gas_quality.push(element)
                });
    
                alpha.created_at.forEach(element => {
                    created_at.push(element);
                });
            }

            if(this._isMounted) {
                this.setState({
                    Data : {
                        labels: created_at,
                        datasets: [
                            {
                                label: 'Temperature',
                                backgroundColor: hexToRgba(brandInfo, 10),
                                borderColor: brandInfo,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: temperature,
                            },
                            {
                                label: 'Humidity',
                                backgroundColor: hexToRgba(brandDanger, 10),
                                borderColor: brandDanger,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: humidity,
                            },
                            {
                                label: 'Gas Quality',
                                backgroundColor: hexToRgba(brandSuccess, 10),
                                borderColor: brandSuccess,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: gas_quality,
                            }
                        ]
                    }
                })
            }
        })

        await channel.bind('update-alpha', data => {
            const alpha = data;
            let temperature = [];
            let humidity = [];
            let gas_quality = [];
            let created_at = [];
    
            if(alpha) {
                alpha.air_temperature.forEach(element => {
                    temperature.push(element)
                });
    
                alpha.air_humidity.forEach(element => {
                    humidity.push(element)
                });
    
                alpha.air_gas_quality.forEach(element => {
                    gas_quality.push(element)
                });
    
                alpha.created_at.forEach(element => {
                    created_at.push(element);
                });
            }
            
            if(this._isMounted) {
                this.setState({
                    Data : {
                        labels: created_at,
                        datasets: [
                            {
                                label: 'Temperature',
                                backgroundColor: hexToRgba(brandInfo, 10),
                                borderColor: brandInfo,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: temperature,
                            },
                            {
                                label: 'Humidity',
                                backgroundColor: hexToRgba(brandDanger, 10),
                                borderColor: brandDanger,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: humidity,
                            },
                            {
                                label: 'Gas Quality',
                                backgroundColor: hexToRgba(brandSuccess, 10),
                                borderColor: brandSuccess,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: gas_quality,
                            }
                        ]
                    }
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        return(
            <div className="chart-wrapper" style={{height: 450 + 'px', marginTop: 40 + 'px'}}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={600} />
            </div>
        )
    }
}