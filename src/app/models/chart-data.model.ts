import { Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

export class ChartData {
    lineChartLabels: Label[];
    lineChartData: ChartDataSets[];
    lineChartOptions: ChartOptions;
    lineChartColors: Color[];
    lineChartLegend: boolean
    lineChartType: string;

    static getDefault(): ChartData {
        return {
            lineChartLabels: [],
            lineChartData: [],
            lineChartOptions: {
                responsive: true,
                scales: {
                    ticks: {
                        stepSize: 1000
                    }                    
                }
            },
            lineChartColors: [
                { // red
                    backgroundColor: 'rgba(255,0,0,0.3)',
                    borderColor: 'red',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                },
                { // grey
                    backgroundColor: 'rgba(148,159,177,0.2)',
                    borderColor: 'rgba(148,159,177,1)',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                },
                { // dark grey
                    backgroundColor: 'rgba(77,83,96,0.2)',
                    borderColor: 'rgba(77,83,96,1)',
                    pointBackgroundColor: 'rgba(77,83,96,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(77,83,96,1)'
                }
            ],
            lineChartLegend: true,
            lineChartType: 'line'
        }
    }
}