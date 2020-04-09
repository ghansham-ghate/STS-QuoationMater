import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {
  reactForm = new FormGroup({
    itemId: new FormControl('',Validators.required),
    itemcode: new FormControl('',Validators.required),
    itemName: new FormControl('',Validators.required),
    itemdescription:new FormControl('',Validators.required),
    itemdetail: new FormControl('',Validators.required),
    itemcategory:new FormControl('',Validators.required)
    });
  
    onSubmit(){
      console.log(this.reactForm.value);
    }

  constructor() { }

  ngOnInit() {
  }

}
