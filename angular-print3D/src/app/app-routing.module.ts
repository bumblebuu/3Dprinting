import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { ProductsComponent } from './page/products/products.component';
import { AddProductComponent } from './page/add-product/add-product.component';
import { UpdateProductComponent } from './page/update-product/update-product.component';


const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "products", component: ProductsComponent },
  { path: "product/add", component: AddProductComponent },
  { path: "product/update/:seo", component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
