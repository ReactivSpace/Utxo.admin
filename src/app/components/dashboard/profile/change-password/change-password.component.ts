import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Change Password | Tyslin UTXO');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
