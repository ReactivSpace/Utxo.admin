import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-last-login',
  templateUrl: './last-login.component.html',
  styleUrls: ['./last-login.component.scss']
})
export class LastLoginComponent implements OnInit, OnDestroy  {
  dtTrigger: Subject<any> = new Subject();
  Users: [];
  dtOptions: DataTables.Settings = {};
  // tslint:disable-next-line:no-inferrable-types
  TotalUsers: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  DataShow: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataError: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataLoaded: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataArry: boolean = false;

  constructor(private titleService: Title, private Api: ApiService) { }
  ngOnInit() {
    this.GetAll();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  GetAll() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.Api.post(environment.LatestUsers).subscribe(res => {
      console.log(res);
      if (res.status === true) {
        this.DataLoaded = true;
        if (res.data.length <= 0) {
          this.DataArry = false;
          this.DataShow = true;
        } else {
          this.DataArry = true;
          this.DataShow = true;
          this.Users = res.data;
          this.TotalUsers = this.Users.length;
          this.dtTrigger.next();
        }
      } else if (res.status === false) {
        this.DataShow = false;
      } else {
        this.DataError = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
