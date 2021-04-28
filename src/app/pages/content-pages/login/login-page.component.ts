import { Component, ViewChild, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;
  AreaPolicia = false;
  @Input() folio: string;

  loginForm = new FormGroup({
    username: new FormControl('guest@apex.com', [Validators.required]),
    password: new FormControl('Password', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .then((res) => {
          this.spinner.hide();
          localStorage.removeItem('currentUser');
        switch(this.loginForm.value.username){
            case 'funcionario_estatal@test.com': {
            localStorage.setItem('currentUser', 'funcionarioEstatal');
                this.router.navigate(['/dashboard/dashboard2']);
                break;
            }
            case 'evaluador_externo@test.com': {
            localStorage.setItem('currentUser', 'evaluadorExterno');
                this.router.navigate(['/dashboard/dashboard1']);
                break;
            }
            case 'funcionario_federal@test.com': {
              localStorage.setItem('currentUser', 'funcionarioFederal');
                  this.router.navigate(['/dashboard/dashboard1']);
                  break;
            }
            case 'enlace_estatal@test.com': {
              localStorage.setItem('currentUser', 'enlaceEstatal');
                  this.router.navigate(['/dashboard/dashboard1']);
                  break;
            }
            default: {
                localStorage.setItem('currentUser', 'policia');
                this.router.navigate(['/dashboard/dashboard2']);
                break;
            }
        }

      })
      .catch((err) => {
        this.isLoginFailed = true;
        this.spinner.hide();
        console.log('error: ' + err)
      }
      );
  }

  CambiarAPolicia(){
    this.AreaPolicia = true;
    this.folio = 'P0L-' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000) + '-21';
  }

  CambiarAFuncionarioEstatal(){
    this.AreaPolicia = false;
      this.folio = ' ';
  }

}
