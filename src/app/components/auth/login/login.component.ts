import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(private Alert: FlashMessagesService,
    private titleService: Title, private fb: FormBuilder,
    private Auth: AuthService) { }

  ngOnInit() {
    this.setTitle('Login | Tyslin UTXO');
    this.createForm();
    // console.log(this.Auth.decode().email);
    if (localStorage.getItem('token')) {

    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  createForm() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  logMeIn(email, password) {
    // login method
    this.Auth.login(email, password);
  }

}
