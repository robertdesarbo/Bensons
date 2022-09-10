import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-lynns',
  templateUrl: './lynns.component.html',
  styleUrls: ['./lynns.component.scss'],
})
export class LynnsComponent implements AfterViewInit {
  public posts$: Observable<Blog[]>;

  constructor(public http: HttpClient) {
    this.loadBlog();
  }

  ngAfterViewInit(): void {
    //
  }

  loadBlog(): void {
    this.posts$ = this.http.get<Blog[]>('/api/posts/').pipe(tap((post: Blog[]) => {

    }));
  }
}
