import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { ChartsModule } from 'ng2-charts';
import { PiechartComponent } from './page/charts/piechart/piechart.component';
import { LinechartComponent } from './page/charts/linechart/linechart.component'

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
    PiechartComponent,
    LinechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
