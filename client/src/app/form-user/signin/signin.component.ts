import { Component,ViewEncapsulation } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None // disabilita l'encapsulation del css (ngx-mat-intl-tel-input)
})

export class SigninComponent{

  corrected:boolean=false;
  registerForm: FormGroup = this.fb.group({});
  submitted = false;

  constructor(private fb: FormBuilder,private validationService: ValidationService) {}

  ngOnInit(){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone:[],
      password: ['', Validators.compose([Validators.required, this.validationService.patternValidator()])],
      rewPassword: ['', [Validators.required]],
    },
    {
      validator: this.validationService.MatchPassword('password', 'rewPassword'),
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

}
