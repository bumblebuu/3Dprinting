import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user$: BehaviorSubject<any> = this.ds.user;
  user: User;
  baseUrl: string = 'http://localhost:3000'

  constructor(
    private ds: DataService,
    private ar: ActivatedRoute,
    private router: Router
  ) {
    this.ar.params.forEach(params => {
      this.ds.readDocument('users', params.id)
    })
    this.user$.subscribe(
      data => {
        this.user = data
      }
    )
  }

  ngOnInit() {
  }

  onSubmit(ev: Event) {
    ev.preventDefault();

    delete this.user.email;

    this.ds.updateDocument('users', this.user._id, this.user).subscribe(
      () => {
        this.router.navigateByUrl("/users");
      }
    )
  }

  onCancel() {
    this.router.navigateByUrl("/users");
  }

  linkImg(fileName: string) {
    // base_URL returns localhost:3000 or the production URL
    return `${this.baseUrl}/${fileName}`;
  }

  useDefault(gender: string) {

    if (gender == 'female') {
      this.user.pictureurl = 'default-woman.png'
    } else {
      this.user.pictureurl = 'default-man.png'
    }
    this.ds.updateDocument('users', this.user._id, this.user).subscribe(
      () => { }
    )
  }

}
