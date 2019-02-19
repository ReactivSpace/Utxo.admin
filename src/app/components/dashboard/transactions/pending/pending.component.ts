import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  ApproveForm: FormGroup;
  DataYes: boolean;
  RejectObj: { 'txId': any; 'amount': any; 'from': any; 'status': string; };
  ApproveObj: { 'txId': any; 'amount': any; 'from': any; 'to': any; 'transactionType': any; 'privateKey': any; };
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
  CoinID: string;
  CoinIDObj: { 'coinId': any; };
  constructor(private titleService: Title,
    private Api: ApiService, private Alert: FlashMessagesService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.setTitle('Pending Transactions | Tyslin UTXO');
    this.CoinID = localStorage.getItem('CoinID');
    this.GetAll(this.CoinID);
    this.CreateForm();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  CreateForm() {
    this.ApproveForm = this.fb.group({
      PrivateKey: ['', Validators.required]
    });
  }

  GetAll(CoinID) {
    this.CoinIDObj = { 'coinId': CoinID };

    this.Api.post(environment.PendingTransaction, this.CoinIDObj).subscribe(res => {
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

  Reject(id, amount, senderAddress) {
    if (senderAddress === null) {
      this.Alert.show('Sender Address not Found!', { cssClass: 'alert-danger', timeout: 3000 });
    } else {
      this.RejectObj = { 'txId': id, 'amount': parseFloat(amount), 'from': senderAddress.trim(), 'status': 'Rejected' };
      console.log(this.RejectObj);
      this.Api.post(environment.Reject, this.RejectObj ).subscribe(res => {
       console.log(res);
        if (res.status === true) {
          this.Alert.show(res.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.GetAll(this.CoinID);
        } else {
          this.Alert.show(res.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
     });
    }
  }

  Accept(id, amount, senderAddress, reciverAddress, privateKey, status) {
    // KyXBwWwXLR6rZdwd75exXjmgTuyLAnPxAjPUvUxe1ivcLf9hCiaS
    // txId,amount,from,to ,transactionType,privateKey,status
    // tslint:disable-next-line:max-line-length
    this.ApproveObj = { 'txId': id, 'amount': parseFloat(amount), 'from': senderAddress, 'to': reciverAddress, 'transactionType': status, 'privateKey': privateKey };
    console.log(this.ApproveObj);
    this.Api.post(environment.Approve, this.ApproveObj ).subscribe(res => {
      console.log(res);
      if (res.status === true) {
        this.Alert.show(res.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.GetAll(this.CoinID);
      } else {
        this.Alert.show(res.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
