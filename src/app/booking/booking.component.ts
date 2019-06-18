import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { GrillerService, AuthenticationService } from '../_services'
import { ModalComponent } from '../modal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  grills: any[];
  dataTable: any;
  error: string;
  showMsgBooking: string;

  constructor(
    private modalService: NgbModal,
    private grillerService: GrillerService,
    private chRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.grillerService.getAll()
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

  openFormModal(griller:any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.griller = griller;
    modalRef.componentInstance.currentUser = this.authenticationService.currentUserValue;
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
        this.error = error
    });
  }
}
