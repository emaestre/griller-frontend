import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import { BookingService } from '../_services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input() public griller;
  @Input() public currentUser;
  modalForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  showMessage = false;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) { }

  ngOnInit() { 
    let numericRegex = /^[0-9]+$/;

    this.modalForm = this.formBuilder.group({
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required],
      reservedHours: ['', [Validators.required, Validators.pattern(numericRegex)]]    
    });
  }

  submitForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.modalForm.invalid) return;

    this.loading = true;
    this.modalForm.value.clientId = this.currentUser.userId;
    this.modalForm.value.grillerId = this.griller.id;

    this.bookingService.create(this.modalForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showMessage = true;
          this.router.navigate(['/booking'], { queryParams: { showMessage: true } });
          this.activeModal.close(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
