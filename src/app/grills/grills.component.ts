import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { GrillerService, AuthenticationService } from '../_services'

@Component({
  selector: 'app-grills',
  templateUrl: './grills.component.html',
  styleUrls: ['./grills.component.css']
})
export class GrillsComponent implements OnInit {
  grills: any[];
  dataTable: any;
  error: string;

  constructor(
    private grillerService: GrillerService,
    private chRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const client = this.authenticationService.currentUserValue;
    
    this.grillerService.getClientGrills(client.userId)
      .subscribe(
        (data: any[]) => {
          this.grills = data
          this.chRef.detectChanges();
          const table: any = $('#dtBasicExample');

          $(document).ready( () => {
            this.dataTable = table.DataTable();
            $('.dataTables_length').addClass('bs-select');
          });
        },
        error => {
          this.error = error;
        });
  }
}


