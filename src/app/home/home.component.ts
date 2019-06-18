import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GrillerService, LocationService } from '../_services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showMsgPostGriller: string;
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  error: string;
  grills: any[]
  locations: any[];


  constructor(
    private route: ActivatedRoute,
    private grillerService: GrillerService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.grillerService.getAll()
      .subscribe(
        (data: any[]) => {
          this.grills = data
          console.log(data)
          for(let griller of this.grills) {
            this.locationService.getLocations(griller.location)
              .subscribe(
                (data: any) => {
                  console.log(data)
                  this.locations.push({
                    lat: parseInt(data.bounds.northeast.lat),
                    lng: parseInt(data.bounds.northeast.lng)
                  })
                },
                error => {
                  this.error = error;
                }
              )
          }
        },
        error => {
          this.error = error;
        });

    // show success message on home
    if (this.route.snapshot.queryParams['grillerMsg']) {
      this.showMsgPostGriller = 'Griller Creation Success!';
    }
  }
}
