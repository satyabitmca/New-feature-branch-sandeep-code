import { News } from './../../model/news';
import { NewsState } from './../../store/reducers/news.reducer';
import { NewsActions } from '../../store/actions/news.actions';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  subsections: string[];
  response: Object[];
  constructor(
    private store: Store<any>,
    private newsActions: NewsActions
  ) { }

  ngOnInit() {
    this.store.select(this.newsActions.LoadSectionNews)
    .subscribe((data:any)=>{
            this.subsections  = data.payload.sections.subsections;
            if(data.payload.news.newsList.length>0){
               this.subsections = data.payload.news.newsList.map((sec:any) => sec.subsection);
               this.subsections = this.subsections.filter(item=> item!=='');
               this.subsections = this.subsections.filter((value,index,self)=>
               self.indexOf(value) === index)
            }
    })
  }

  dispatchAction(subsection: string) {
    this.store.dispatch(this.newsActions.FilterSubsection(subsection));
  }

}
