import { ApiService } from 'src/app/services/api/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: any;
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
  CoinID: string;
  IDObj: { 'userId': any; 'coinId': any; };
  Discrepancy: any;
  WithDrawal: any;
  Deposit: any;
  TraObj: { 'address': any; 'userId': any; };

  dtTrigger: Subject<any> = new Subject();
  Data: [];
  dtOptions: DataTables.Settings = {};
  // tslint:disable-next-line:no-inferrable-types
  TotalUsers: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  DataShow: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataError: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataLoaded: boolean = false;
  DataArry: boolean;


  constructor(private titleService: Title, private route: ActivatedRoute,
    private Api: ApiService) { }

  ngOnInit() {
    this.setTitle('User Detail | Tyslin UTXO');
    this.id = this.route.snapshot.paramMap.get('id');
    this.CoinID = localStorage.getItem('CoinID');
    this.UserDetail(this.CoinID);
    this.userTransactions();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  UserDetail(CoinID) {
    this.IDObj = { 'userId': this.id, 'coinId': CoinID };
    this.Api.post(environment.UserDetail, this.IDObj).subscribe(res => {
      console.log(res);
      if (res.status === true) {
        this.FullName = res.data.User.userName;
        this.Phone = res.data.User.phone;
        this.Email = res.data.User.email;
        this.Address = res.data.address;
        this.EmailVerified = res.data.User.emailVerified;
        this.LoginStatus = res.data.User.loginstatus;
        this.DeleteStatus = res.data.User.isDeleted;
        this.Balance = res.data.balance;
        this.Comission = res.data.comission;
        this.Discrepancy = res.data.discrepency;
        this.WithDrawal = res.TotalWithdraw;
        this.Deposit = res.TotalDeposit;
        this.RegisterDate = res.data.User.createdAt;
        // this.LastLoginDate = res.data.User.lastLogin;
      } else {
      }
    });
  }

  userTransactions() {
    this.TraObj = { 'address': this.Address, 'userId': this.id };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.Api.post(environment.UserTrans, this.TraObj).subscribe(res =>{
      console.log(res);
      if (res.status === true) {
        this.DataLoaded = true;
        if (res.data.length <= 0) {
          this.DataArry = false;
          this.DataShow = true;
        } else {
          this.DataArry = true;
          this.DataShow = true;
          this.Data = res.data;
          this.TotalUsers = this.Data.length;
          this.dtTrigger.next();
        }
      } else if (res.status === false) {
        this.DataLoaded = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
