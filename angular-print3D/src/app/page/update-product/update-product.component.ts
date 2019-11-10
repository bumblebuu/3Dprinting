import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product$: BehaviorSubject<any> = this.ds.product;
  product: Product;

  constructor(private ds: DataService, private ar: ActivatedRoute, private router: Router) {
    this.ar.params.forEach(params => {
      this.ds.readDocument('products', params.seo)
    })
    this.product$.subscribe(
      data => {
        this.product = data
      }
    )
  }

  ngOnInit() {
  }

  onUpdate() {
    this.ds.updateDocument('products', this.product.seo, this.product).subscribe(
      () => this.router.navigate(['/products'])
    )
  }
}
