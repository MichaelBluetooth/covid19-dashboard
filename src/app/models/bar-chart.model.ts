import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export class BarChartModel {
    header: string;
    barChartOptions: ChartOptions;
    barChartLabels: Label[];
    barChartType: ChartType;
    barChartLegend: boolean;

    barChartData: ChartDataSets[];

    static getDefaut(): BarChartModel {
        return {
            header: '',
            barChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { xAxes: [{}], yAxes: [{}] },
            plugins: {
              datalabels: {
                anchor: 'end',
                align: 'end',
              }
            }
          },
          barChartLabels: [],
          barChartType:'bar',
          barChartLegend: true,
        
          barChartData: []
        }
    }
}