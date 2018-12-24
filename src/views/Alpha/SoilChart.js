import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
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

export default class SoilChart extends Component
{
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
                      },
                    }],
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(50 / 10),
                        max: 50,
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

        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/alpha')
        .then(res => {
            const alpha = res.data[0];
            let temperature = [];
            let vwc = [];
            let ec = [];
            let salinity = [];
            let tds = [];
            let epsilon = [];
            let created_at = [];

            if(alpha) {
                alpha.soil_temperature.forEach(element => {
                    temperature.push(element)
                });

                alpha.soil_vwc.forEach(element => {
                    vwc.push(element)
                });

                alpha.soil_ec.forEach(element => {
                    ec.push(element)
                });

                alpha.soil_salinity.forEach(element => {
                    salinity.push(element)
                });

                alpha.soil_tds.forEach(element => {
                    tds.push(element)
                });

                alpha.soil_epsilon.forEach(element => {
                    epsilon.push(element)
                });
    
                alpha.created_at.forEach(element => {
                    created_at.push(element)
                });
            }

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
                            label: 'VWC',
                            backgroundColor: hexToRgba(brandDanger, 10),
                            borderColor: brandDanger,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: vwc,
                        },
                        {
                            label: 'EC',
                            backgroundColor: hexToRgba(brandWarning, 10),
                            borderColor: brandWarning,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: ec,
                        },
                        {
                            label: 'Salinity',
                            backgroundColor: hexToRgba(brandSuccess, 10),
                            borderColor: brandSuccess,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: salinity,
                        },
                        {
                            label: 'TDS',
                            backgroundColor: hexToRgba(brandPrimary, 10),
                            borderColor: brandPrimary,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: tds,
                        },
                        {
                            label: 'Epsilon',
                            backgroundColor: hexToRgba('#42EEF4', 10),
                            borderColor: '#42EEF4',
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: epsilon,
                        }
                    ]
                }
            })
        })

        await channel.bind('update-alpha', data => {
            const alpha = data;
            let temperature = [];
            let vwc = [];
            let ec = [];
            let salinity = [];
            let tds = [];
            let epsilon = [];
            let created_at = [];

            if(alpha) {
                alpha.soil_temperature.forEach(element => {
                    temperature.push(element)
                });
    
                alpha.soil_vwc.forEach(element => {
                    vwc.push(element)
                });
    
                alpha.soil_ec.forEach(element => {
                    ec.push(element)
                });
    
                alpha.soil_salinity.forEach(element => {
                    salinity.push(element)
                });
    
                alpha.soil_tds.forEach(element => {
                    tds.push(element)
                });
    
                alpha.soil_epsilon.forEach(element => {
                    epsilon.push(element)
                });
    
                alpha.created_at.forEach(element => {
                    created_at.push(element)
                });
            }

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
                            label: 'VWC',
                            backgroundColor: hexToRgba(brandDanger, 10),
                            borderColor: brandDanger,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: vwc,
                        },
                        {
                            label: 'EC',
                            backgroundColor: hexToRgba(brandWarning, 10),
                            borderColor: brandWarning,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: ec,
                        },
                        {
                            label: 'Salinity',
                            backgroundColor: hexToRgba(brandSuccess, 10),
                            borderColor: brandSuccess,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: salinity,
                        },
                        {
                            label: 'TDS',
                            backgroundColor: hexToRgba(brandPrimary, 10),
                            borderColor: brandPrimary,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: tds,
                        },
                        {
                            label: 'Epsilon',
                            backgroundColor: hexToRgba('#42EEF4', 10),
                            borderColor: '#42EEF4',
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: epsilon,
                        }
                    ]
                }
            })
        })
    }
    
    render() {
        return(
            <div className="chart-wrapper" style={{height: 450 + 'px', marginTop: 40 + 'px'}}>
                <Line data={this.state.Data} options={this.state.mainChartOpts} height={600} />
            </div>
        )
    }
}