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

export default class PompNodeChart extends Component
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
        await axios.get('https://aizd.herokuapp.com/api/v1/pomp-nodes')
        .then(res => {
            const pomp_node = res.data[0];
            let water_turbidity = [];
            let water_ph = [];
            let water_flow = [];
            let created_at = [];

            if(pomp_node) {
                pomp_node.water_turbidity.forEach(element => {
                    water_turbidity.push(element)
                });
    
                pomp_node.water_ph.forEach(element => {
                    water_ph.push(element)
                });
    
                pomp_node.water_flow.forEach(element => {
                    water_flow.push(element)
                });
    
                pomp_node.created_at.forEach(element => {
                    created_at.push(element)
                });
            }

            this.setState({
                Data : {
                    labels: created_at,
                    datasets: [
                        {
                            label: 'Water Turbidity',
                            backgroundColor: hexToRgba(brandWarning, 10),
                            borderColor: brandWarning,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: water_turbidity,
                        },
                        {
                            label: 'Water PH',
                            backgroundColor: hexToRgba(brandSuccess, 10),
                            borderColor: brandSuccess,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: water_ph,
                        },
                        {
                            label: 'Water Flow',
                            backgroundColor: hexToRgba(brandPrimary, 10),
                            borderColor: brandPrimary,
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: water_flow,
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