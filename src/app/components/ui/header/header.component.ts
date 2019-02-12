import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserName: any;
  AddClass: boolean = true;

  constructor(private Auth: AuthService) { }

  ngOnInit() {
    // console.log(this.Auth.decode());
    this.UserName = this.Auth.decode().name;
  }

  removeClass() {
    this.AddClass = !this.AddClass;
    // console.log(this.AddClass);
  }

  LogMeOut() {
    this.Auth.logout();
  }

}
