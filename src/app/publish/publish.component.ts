import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { GrillerService } from '../_services';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  showMsgPostGriller = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private grillerService: GrillerService
  ) { }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let numericRegex = /^[0-9]+(\.[0-9]{0,2})?$/;

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(numericRegex)]],
      location: ['', Validators.required],
      zipCode: [user.zipCode],
      description: ['']     
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) return;

    this.loading = true;
    
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.registerForm.value.grillerOwner = user.userId;
    this.registerForm.value.ownerName = user.username;
    this.registerForm.value.ownerZipCode = user.zipCode;

    this.grillerService.create(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showMsgPostGriller = true;
          this.router.navigate(['/home'], { queryParams: { grillerMsg: this.showMsgPostGriller } });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
