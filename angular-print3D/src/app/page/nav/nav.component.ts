import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { DataService } from "src/app/services/data.service";
import { BehaviorSubject } from "rxjs";
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  notifications$: BehaviorSubject<any> = this.ds.notificationList;
  constructor(private ds: DataService) {
    this.ds.readDocument("notifications");
  }

  ngOnInit() {
    // Hide submenus
    $("#body-row .collapse").toggleClass("hide");

    // Collapse/Expand icon
    $("#collapse-icon").addClass("fa-angle-double-left");

    // Collapse click
    $("[data-toggle=sidebar-colapse]").click(function () {
      SidebarCollapse();
    });

    function SidebarCollapse() {
      $(".menu-collapsed").toggleClass("d-none");
      $(".sidebar-submenu").toggleClass("d-none");
      $(".submenu-icon").toggleClass("d-none");
      $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

      // Treating d-flex/d-none on separators with title
      let SeparatorTitle = $(".sidebar-separator-title");
      if (SeparatorTitle.hasClass("d-flex")) {
        SeparatorTitle.removeClass("d-flex");
      } else {
        SeparatorTitle.addClass("d-flex");
      }

      // Collapse/Expand icon
      $("#collapse-icon").toggleClass(
        "fa-angle-double-left fa-angle-double-right"
      );
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
