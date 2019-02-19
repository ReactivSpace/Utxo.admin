import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.component.html',
  styleUrls: ['./all-transaction.component.scss']
})
export class AllTransactionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  // persons: Person[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  CoinID: string;
  CoinIDObj: { 'coinId': any; };
  DataLoaded: boolean;
  DataArry: boolean;
  DataShow: boolean;
  Data: any;
  TotalUsers: any;

  constructor(private titleService: Title,
  private Api: ApiService) { }

  ngOnInit() {
    this.setTitle('All Transactions | Tyslin UTXO');
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
    this.Api.post(environment.GetAllTransaction, this.CoinIDObj).subscribe(res => {
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
