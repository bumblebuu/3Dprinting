import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./page/index/index.component";
import { ProductsComponent } from "./page/products/products.component";
import { AddProductComponent } from "./page/add-product/add-product.component";
import { UpdateProductComponent } from "./page/update-product/update-product.component";
import { UsersComponent } from "./page/users/users.component";
import { UpdateUserComponent } from "./page/update-user/update-user.component";
import { OrdersComponent } from "./page/orders/orders.component";
import { LinechartComponent } from "./page/charts/linechart/linechart.component";
import { PiechartComponent } from "./page/charts/piechart/piechart.component";
import { UpdateOrderComponent } from "./page/update-order/update-order.component";
import { ReviewsComponent } from "./page/reviews/reviews.component";
import { OrderReportsComponent } from "./page/order-reports/order-reports.component";
import { ProductReportsComponent } from "./page/product-reports/product-reports.component";
import { NotificationsComponent } from "./page/notifications/notifications.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "products", component: ProductsComponent },
  { path: "product/add", component: AddProductComponent },
  { path: "product/update/:seo", component: UpdateProductComponent },
  { path: "users", component: UsersComponent },
  { path: "user/update/:id", component: UpdateUserComponent },
  { path: "orders", component: OrdersComponent },
  { path: "order/update/:id", component: UpdateOrderComponent },
  { path: "linechart", component: LinechartComponent },
  { path: "piechart", component: PiechartComponent },
  { path: "reviews", component: ReviewsComponent },
  { path: "reports/orders", component: OrderReportsComponent },
  { path: "reports/products", component: ProductReportsComponent },
  { path: "notifications", component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
