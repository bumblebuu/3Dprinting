import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { FileUploader } from 'ng2-file-upload';
const url = 'http://localhost:3000/upload';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: url, itemAlias: 'photo' });

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
    this.product.img = [];
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.product.img.push('\\uploads\\' + item.file.name);
      alert(response);
    };
  }

  onUpdate() {
    this.ds.updateDocument('products', this.product.seo, this.product).subscribe(
      () => this.router.navigate(['/products'])
    )
  }
}
