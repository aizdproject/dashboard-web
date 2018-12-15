import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

export default class GreenHouseNodeChart extends Component
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
        await axios.get('https://aizd.herokuapp.com/api/v1/greenhouse-nodes')
        .then(res => {
            const greenhouse_node = res.data[0];
            let humidities = [];
            let temperatures = [];
            let light_intensities = [];
            let air_qualities = [];
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

                greenhouse_node.temperatures.forEach(element => {
                    let temperature = 0;
                    temperature += element.temperature1;
                    temperature += element.temperature2;
                    temperature += element.temperature3;
                    temperature += element.temperature4;
                    temperature += element.temperature5;
                    temperature += element.temperature6;
    
                    temperature /= 6;
                
                    temperatures.push(temperature)
                });

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
                            label: 'Humidity',
                            backgroundColor: hexToRgba(brandSuccess, 10),
                            borderColor: brandSuccess,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: humidities,
                        },
                        {
                            label: 'Temperature',
                            backgroundColor: hexToRgba(brandPrimary, 10),
                            borderColor: brandPrimary,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: temperatures,
                        },
                        {
                            label: 'Light Intensity',
                            backgroundColor: hexToRgba(brandWarning, 10),
                            borderColor: brandWarning,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: light_intensities,
                        },
                        {
                            label: 'Air Quality',
                            backgroundColor: hexToRgba(brandInfo, 10),
                            borderColor: brandInfo,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: air_qualities,
                        },
                        
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