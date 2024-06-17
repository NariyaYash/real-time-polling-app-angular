// app.component.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  buttonList = [
    { name: 'react', color: '#4fb6d1', buttonNum: 0 },
    { name: 'Angular', color: '#a6120d', buttonNum: 1 },
    { name: 'VueJs', color: '#41B883', buttonNum: 2 },
    { name: 'EmberJs', color: '#9d6662', buttonNum: 3 },
    { name: 'Svelte', color: '#484072', buttonNum: 4 },
  ];
  chartRef: any;
  Highcharts: typeof Highcharts = Highcharts;
  chatDtata: any = [];
  updateFlag: boolean = false;
  chartOptions: any = {
    series: [
      {
        type: 'column',
        data: [0, 0, 0, 0, 0],
      },
    ],
    xAxis: {
      categories: ['React', 'Angular', 'VueJs', 'EmberJs', 'Svelte'],
    },
    title: {
      text: 'GFG Real-Time Polling App In Angular',
    },
    colors: ['#4fb6d1', '#a6120d', '#41B883', '#9d6662', '#484072'],
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
  };

  constructor(private socket: Socket, private ref: ChangeDetectorRef) {
    this.socket.on('update', (frameworks: any) => {
      const newData = [];
      for (const key in frameworks) {
        if (frameworks.hasOwnProperty(key)) {
          const { votes } = frameworks[key];
          newData.push(votes);
        }
      }
      this.chartOptions.series[0].data = newData;
      this.updateFlag = true;
      this.ref.detectChanges();
    });
  }

  putTheVote = (ButtonNum: number) => {
    this.socket.emit('vote', ButtonNum);
  };
}
