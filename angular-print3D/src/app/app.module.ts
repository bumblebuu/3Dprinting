import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './page/products/products.component';
import { AddProductComponent } from './page/add-product/add-product.component';
import { UpdateProductComponent } from './page/update-product/update-product.component';
import { IndexComponent } from './page/index/index.component';
import { NavComponent } from './page/nav/nav.component';
import { SearchPipe } from './pipes/search.pipe';
import { UsersComponent } from './page/users/users.component';
import { UpdateUserComponent } from './page/update-user/update-user.component';
import { OrdersComponent } from './page/orders/orders.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts';
import { PiechartComponent } from './page/charts/piechart/piechart.component';
import { LinechartComponent } from './page/charts/linechart/linechart.component';
import { UpdateOrderComponent } from './page/update-order/update-order.component';
import { OrderbyPipe } from './pipes/orderby.pipe';
import { ReviewsComponent } from './page/reviews/reviews.component';
import { RolePipe } from './pipes/role.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    IndexComponent,
    NavComponent,
    SearchPipe,
    UsersComponent,
    UpdateUserComponent,
    OrdersComponent,
    FileSelectDirective,
    PiechartComponent,
    LinechartComponent,
    UpdateOrderComponent,
    OrderbyPipe,
    ReviewsComponent,
    RolePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
