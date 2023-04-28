import { Component,ViewEncapsulation } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/validation.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  visible = false;
  dismissible = true;


  str:any;
  corrected:boolean=false;
  loginForm: FormGroup = this.fb.group({});
  submitted = false;

  email:string=  '';
  password:string=  '';

  constructor(public loginService: LoginService,private router:Router,
  private fb: FormBuilder,private validationService: ValidationService) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.email=  this.loginForm.controls['email'].value;
    this.password=  this.loginForm.controls['password'].value;
    this.submitted = true;

    this.loginService.login(this.email,this.password).subscribe({
      next:  (data) => {

        this.str= JSON.stringify(data);
        this.str= JSON.parse(this.str);

        if(this.str.ris == "ok")
        {
          this.visible=false;
          this.router.navigate(['/home']);//redirect però sulla pagina di gestione
        }
        else{
          this.visible=true;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
