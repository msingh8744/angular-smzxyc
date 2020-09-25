import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjcInput from '@grapecity/wijmo.input';
import * as wjcCore from '@grapecity/wijmo';

import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  source: any;
  seriesSource: string[];
  chartTypes: any[];

  selectedSeries = [];
  chartType = 'Column';

  constructor() {
    this.source = this.getData();
    this.seriesSource = ['sales', 'downloads', 'expenses'];
    this.chartTypes = this.getEnumNames(wjcChart.ChartType);
  }

  addChart() {
    var container = document.querySelector('.chart-container');
    var selectedSeries = this.selectedSeries.map(i => {
      return { binding: i};
    });
    console.log(selectedSeries)
    var host = wjcCore.createElement(`<div></div>`);
    container.append(host);
    new wjcChart.FlexChart(host, {
      itemsSource: this.getData(),
      series: selectedSeries,
      chartType: this.chartType,
      bindingX: 'country'
    });
  }

  getData() {
	  var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
	    data = [];
	  for (var i = 0; i < countries.length; i++) {
	    data.push({
	      country: countries[i],
	      sales: Math.random() * 10000,
	      expenses: Math.random() * 5000,
	      downloads: Math.round(Math.random() * 20000),
	    });
	  }
  	return data;
  }

  getEnumNames(enumClass) {
    var names = [];
    for (var key in enumClass) {
        var val = parseInt(key);
        if (isNaN(val)) names.push(key);
    }
    return names;
}
}
