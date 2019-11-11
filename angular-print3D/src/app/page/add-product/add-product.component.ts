import { Component, OnInit, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
const url = 'http://localhost:3000/upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: url, itemAlias: 'photo' });

  newProduct: Product = new Product();
  products: BehaviorSubject<any> = this.ds.productList;
  constructor(private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      alert(response);
    };
  }

  onCreate() {
    this.ds.createDocument('products', this.newProduct).subscribe(
      () => this.router.navigate(['/products'])
    )
  }
  onKey(event: any) {
    this.newProduct.seo = event.target.value.toString()               // Convert to string
      .normalize('NFD')               // Change diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
      .replace(/\s+/g, '-')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/&/g, '-and-')          // Replace ampersand
      .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g, '-')             // Remove duplicate dashes
      .replace(/^-*/, '')              // Remove starting dashes
      .replace(/-*$/, '');             // Remove trailing dashes
  }

}
