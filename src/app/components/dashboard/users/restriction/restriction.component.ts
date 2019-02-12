import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  styleUrls: ['./restriction.component.scss']
})
export class RestrictionComponent implements OnInit {
  id: string;

  constructor(private titleService: Title, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setTitle('Restrict User | Tyslin UTXO');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
