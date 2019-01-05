import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import Pusher from 'pusher-js';
import moment from 'moment';

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
                      },
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
            let vwc = [];
            let ec = [];
            let salinity = [];
            let tds = [];
            let epsilon = [];
            let created_at = [];

            if(alpha) {
                let month = 0;
                let count = 0;
                let temp_temperature = 0;
                let temp_vwc = 0;
                let temp_ec = 0;
                let temp_salinity = 0;
                let temp_tds = 0;
                let temp_epsilon = 0;

                month = 0;
                count = 0;

                alpha.soil_temperature.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;
                    let year = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').year();

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_temperature = 0;
                    } 
                    temp_temperature += element;
                    count++;
                    if(temperature.length !== 0) {
                        temperature.pop();
                        created_at.pop();
                    }
                    temperature.push(temp_temperature/count);
                    created_at.push('Bulan ' + now + ' (' + year + ')');
                });

                month = 0;
                count = 0;
                alpha.soil_vwc.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_vwc = 0;
                    } 
                    temp_vwc += element;
                    count++;
                    if(vwc.length !== 0) {
                        vwc.pop();
                    }
                    vwc.push(temp_vwc/count);
                });

                month = 0;
                count = 0;
                alpha.soil_ec.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_ec = 0;
                    } 
                    temp_ec += element;
                    count++;
                    if(ec.length !== 0) {
                        ec.pop();
                    }
                    ec.push(temp_ec/count);
                });

                month = 0;
                count = 0;
                alpha.soil_salinity.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_salinity = 0;
                    } 
                    temp_salinity += element;
                    count++;
                    if(salinity.length !== 0) {
                        salinity.pop();
                    }
                    salinity.push(temp_salinity/count);
                });

                month = 0;
                count = 0;
                alpha.soil_tds.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_tds = 0;
                    } 
                    temp_tds += element;
                    count++;
                    if(tds.length !== 0) {
                        tds.pop();
                    }
                    tds.push(temp_tds/count);
                });

                month = 0;
                count = 0;
                alpha.soil_epsilon.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_epsilon = 0;
                    } 
                    temp_epsilon += element;
                    count++;
                    if(epsilon.length !== 0) {
                        epsilon.pop();
                    }
                    epsilon.push(temp_epsilon/count);
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
            }
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
                let month = 0;
                let count = 0;
                let temp_temperature = 0;
                let temp_vwc = 0;
                let temp_ec = 0;
                let temp_salinity = 0;
                let temp_tds = 0;
                let temp_epsilon = 0;

                month = 0;
                count = 0;

                alpha.soil_temperature.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;
                    let year = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').year();

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_temperature = 0;
                    } 
                    temp_temperature += element;
                    count++;
                    if(temperature.length !== 0) {
                        temperature.pop();
                        created_at.pop();
                    }
                    temperature.push(temp_temperature/count);
                    created_at.push('Bulan ' + now + ' (' + year + ')');
                });

                month = 0;
                count = 0;
                alpha.soil_vwc.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_vwc = 0;
                    } 
                    temp_vwc += element;
                    count++;
                    if(vwc.length !== 0) {
                        vwc.pop();
                    }
                    vwc.push(temp_vwc/count);
                });

                month = 0;
                count = 0;
                alpha.soil_ec.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_ec = 0;
                    } 
                    temp_ec += element;
                    count++;
                    if(ec.length !== 0) {
                        ec.pop();
                    }
                    ec.push(temp_ec/count);
                });

                month = 0;
                count = 0;
                alpha.soil_salinity.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_salinity = 0;
                    } 
                    temp_salinity += element;
                    count++;
                    if(salinity.length !== 0) {
                        salinity.pop();
                    }
                    salinity.push(temp_salinity/count);
                });

                month = 0;
                count = 0;
                alpha.soil_tds.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_tds = 0;
                    } 
                    temp_tds += element;
                    count++;
                    if(tds.length !== 0) {
                        tds.pop();
                    }
                    tds.push(temp_tds/count);
                });

                month = 0;
                count = 0;
                alpha.soil_epsilon.forEach((element, index) => {
                    let now = moment(alpha.created_at[index], 'DD/MM/YYYY-H:mm:ss').month()+1;

                    if(now !== month) {
                        month = now;
                        count = 0;
                        temp_epsilon = 0;
                    } 
                    temp_epsilon += element;
                    count++;
                    if(epsilon.length !== 0) {
                        epsilon.pop();
                    }
                    epsilon.push(temp_epsilon/count);
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
            }
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