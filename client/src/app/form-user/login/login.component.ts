import { Component,Input } from '@angular/core';
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

  username:string='';
  password:string='';

  constructor(public loginService: LoginService,private router:Router) {}

  login(){
    this.loginService.login(this.username,this.password).subscribe({
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
