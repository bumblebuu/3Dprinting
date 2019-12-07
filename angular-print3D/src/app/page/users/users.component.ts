import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: BehaviorSubject<any> = this.ds.userList;
  orderKey: string = '';
  orderDirection: number = 1;
  changeCounter: number = 0;
  baseUrl: string = 'http://localhost:3000'
  filterKey: string = 'role';
  filterPhrase: string = 'user';

  constructor(
    private ds: DataService
  ) {
    this.ds.readDocument('users')
  }

  ngOnInit() {
  }

  setOrderBy(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection === 1 ? -1 : 1;
    } else {
      this.orderDirection = 1;
    }
    this.orderKey = key;
  }

  onDelete(_id: string): any {
    this.ds.updateDocument('users', _id, { firstname: 'deleted', latsname: 'user' }).subscribe(
      () => this.ds.readDocument('users')
    )
  }

  linkImg(fileName: string) {
    // base_URL returns localhost:3000 or the production URL
    return `${this.baseUrl}/${fileName}`;
  }

}
