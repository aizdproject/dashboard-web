import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';

const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

export default class PotNodeChart extends Component
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
        await axios.get('https://aizd-webservice.herokuapp.com/api/v1/pot-nodes')
        .then(res => {
            const pot_node = res.data[0];
            let temperatures = [];
            let moistures = [];
            let created_at = [];

            if(pot_node) {
                pot_node.soil_temperatures.forEach(element => {
                    let temperature = 0;
                    temperature += element.temperature1;
                    temperature += element.temperature2;
                    temperature += element.temperature3;
                    temperature += element.temperature4;
    
                    temperature /= 4;
                
                    temperatures.push(temperature)
                });
    
                pot_node.soil_moistures.forEach(element => {
                    let moisture = 0;
                    moisture += element.moisture1;
                    moisture += element.moisture2;
                    moisture += element.moisture3;
                    moisture += element.moisture4;
    
                    moisture /= 4;
                
                    moistures.push(moisture)
                });
    
                pot_node.created_at.forEach(element => {
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
                            data: temperatures,
                        },
                        {
                            label: 'Moisture',
                            backgroundColor: hexToRgba(brandDanger, 10),
                            borderColor: brandDanger,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: moistures,
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