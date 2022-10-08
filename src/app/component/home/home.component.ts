import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loderspinner: boolean = false;
  Asteroid: any;
  response: any;
  close_approach_data: any[] = [];
  data: any[] = [];
  AsteroidId: any;
  relative_velocity: any;
  kilometers_per_hour: any;
  AsteroidAvgId: any;
  estimated_diameter: any;
  kilometers: any;
  estimated_diameter_min: any;
  estimated_diameter_max: any;
  AverageSize: any;
  Grapdata: any;
  XaValue = [];
  YaValue = [];
  XaValue1 = [];
  YaValue1 = [];
  chart: any = [];
  constructor(private Api: Service) {
    Chart.register(...registerables);
  }
  submitData(startdate: string, enddate: string) {
    if (startdate == "") {
      alert("Plaese select start date");
      return;
    }
    if (enddate == "") {
      alert("Plaese select End date");
      return;
    }
    this.loderspinner = true;
    try {
      this.Api.getAsteroidData(startdate, enddate).subscribe((result: any) => {
        console.log("getAsteroidData data" + startdate);
        console.log(result);
        this.response = result;
        this.loderspinner = false;
        this.Asteroid = this.response["near_earth_objects"];
        this.data = this.Asteroid[startdate];
        this.Grapdata = this.data;
        this.XaValue = this.Asteroid[startdate].map((graph: any) => startdate)
        this.YaValue = this.Asteroid[startdate].map((graph: any) => graph["absolute_magnitude_h"])
        this.XaValue1 = this.Asteroid[enddate].map((graph: any) => enddate)
        this.YaValue1 = this.Asteroid[enddate].map((graph: any) => graph["absolute_magnitude_h"])
        this.AsteroidId = this.data[0].neo_reference_id;
        this.AsteroidAvgId = this.data[0].id;
        this.close_approach_data = this.data[0].close_approach_data;
        this.relative_velocity = this.close_approach_data[0]["relative_velocity"];
        this.kilometers_per_hour = this.relative_velocity.kilometers_per_hour;
        this.estimated_diameter = this.data[0].estimated_diameter;
        this.kilometers = this.estimated_diameter.kilometers;
        this.estimated_diameter_min = this.kilometers.estimated_diameter_min;
        this.estimated_diameter_max = this.kilometers.estimated_diameter_max;
        this.AverageSize = this.estimated_diameter_min + this.estimated_diameter_max / 2;
        var myChart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.XaValue,
            datasets: [{
              label: "",
              data: this.YaValue,
              borderWidth: 2,
              hoverBorderColor: 'rgba(254,173,89,0.1)',
              backgroundColor: 'rgba(93,173,89,0.1)',
              borderColor: '#3E95Cd',
            }]
          }
        });
        this.chart = myChart;
        var myChart = new Chart('canvas1', {
          type: 'line',
          data: {
            labels: this.XaValue1,
            datasets: [{
              label: "",
              data: this.YaValue1,
              borderWidth: 2,
              hoverBorderColor: 'rgba(254,173,89,0.1)',
              backgroundColor: 'rgba(93,173,89,0.1)',
              borderColor: '#3E95Cd',
            }]
          }
        });
        this.chart = myChart;
      });
    } catch (error) {
      alert(error);
    }
  }
  ngOnInit(): void {
  }

}


