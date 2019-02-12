import { ApiService } from 'src/app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: any;
  IDObj: { 'userId': any; };
  FullName: any;
  Phone: any;
  Email: any;
  Address: any;
  EmailVerified: any;
  LoginStatus: any;
  DeleteStatus: any;
  Balance: any;
  Comission: any;
  RegisterDate: any;
  LastLoginDate: any;
  constructor(private titleService: Title, private route: ActivatedRoute,
    private Api: ApiService) { }

  ngOnInit() {
    this.setTitle('User Detail | Tyslin UTXO');
    this.id = this.route.snapshot.paramMap.get('id');
    this.UserDetail();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  UserDetail() {
    this.IDObj = { 'userId': this.id };
    this.Api.post(environment.UserDetail, this.IDObj).subscribe(res =>{
      console.log(res);
      if (res.status === true) {
        this.FullName = res.data[0].userName;
        this.Phone = res.data[0].phone;
        this.Email = res.data[0].email;
        this.Address = res.data[0].address;
        this.EmailVerified = res.data[0].emailVerified;
        this.LoginStatus = res.data[0].loginStatus;
        this.DeleteStatus = res.data[0].isDeleted;
        this.Balance = res.data[0].balance;
        this.Comission = res.data[0].comission;
        this.RegisterDate = res.data[0].dateregistered;
        this.LastLoginDate = res.data[0].lastLogin;
      } else {

      }
    });
  }

}
