import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Edit Coin | Tyslin UTXO');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
