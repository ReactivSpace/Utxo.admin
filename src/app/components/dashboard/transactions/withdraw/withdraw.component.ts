import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {
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
  CoinIDObj: { 'coinId': any; };
  CoinID: string;

  constructor(private titleService: Title,
  private Api: ApiService) { }

  ngOnInit() {
    this.setTitle('Withdraw History | Tyslin UTXO');
    this.CoinID = localStorage.getItem('CoinID');
    this.GetAll(this.CoinID);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  GetAll(CoinID) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.CoinIDObj = { 'coinId': CoinID };

    this.Api.post(environment.DepositTransaction, this.CoinIDObj).subscribe(res => {
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
