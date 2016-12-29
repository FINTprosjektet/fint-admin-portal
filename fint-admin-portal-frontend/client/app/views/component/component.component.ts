import { CommonComponentService } from './common-component.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ICommonComponent} from 'app/api/ICommonComponent';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  components: ICommonComponent[] = [];
  page: number = 1;
  pages: number;
  total: number;
  pageSize: number = 10;

  constructor(private titleService: Title, private CommonComponent: CommonComponentService) {
    this.titleService.setTitle('Fint | Components');
    CommonComponent.all().subscribe(result => {
      this.page = result.page;
      this.total = result.total_items;
      this.pages = result.page_count;
      this.pageSize = result.page_size;
      this.components = result._embedded.componentList;
    });
  }

  ngOnInit() {
  }

}