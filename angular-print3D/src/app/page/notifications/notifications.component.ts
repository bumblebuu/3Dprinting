import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  page=1;
  pageSize=10;
  notifications$: BehaviorSubject<any> = this.ds.notificationList;
  constructor(private ds: DataService) {
    ds.readDocument("notifications");
  }

  ngOnInit() {}
}
