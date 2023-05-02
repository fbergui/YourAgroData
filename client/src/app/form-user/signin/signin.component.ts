import { Component,EventEmitter,Output,ViewEncapsulation } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';
import { SigninService } from './signin.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None // disabilita l'encapsulation del css (ngx-mat-intl-tel-input)
})

export class SigninComponent{

  @Output() childToParent = new EventEmitter<String>();

  corrected:boolean=false;
  registerForm: FormGroup = this.fb.group({});
  submitted = false;

  firstName:string=  '';
  lastName:string=  '';
  email:string=  '';
  phone:string=  '';
  password:string=  '';
  str:any;

  constructor(private fb: FormBuilder,private validationService: ValidationService,
    public signinService:SigninService,private router:Router,private routeSub: ActivatedRoute) {}

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

    this.firstName=  this.registerForm.controls['firstName'].value;
    this.lastName=  this.registerForm.controls['lastName'].value;
    this.email=  this.registerForm.controls['email'].value;
    this.phone=  this.registerForm.controls['phone'].value;

    this.password=  this.registerForm.controls['password'].value;

    this.signinService.signin(this.firstName,this.lastName,this.email,this.password,this.phone).subscribe({
      next:  (data:any) => {

        this.str= JSON.stringify(data);
        this.str= JSON.parse(this.str);

        if(this.str.ris == "ok")
        {

          this.router.navigate(['/form/redirect',this.email]);
          console.log("ok");
        }
      },
      error: (err:any) => {
        console.log(err);
      },
    });


  }

}
