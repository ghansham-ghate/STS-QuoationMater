import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CustomerClass} from '../../shared/customer.service';
import { Customer } from '../../Models/Customer.model';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  
 
  
  p:number;
  updateFlag="insert";
  mySubscription: any;
  searchTerm:string;
  dataSaved = false;  
  massage = null; 
  customer:Customer[];
  employeeIdUpdate = null;
  reactForm = new FormGroup({
    intCust_id: new FormControl(''),
    nvcharCust_name: new FormControl('',Validators.required),
    nvcharCust_address:new FormControl('',Validators.required),
    nvcharCust_phone: new FormControl('',Validators.required),
    nvcharCust_email:new FormControl('',Validators.required)
  });



  // onSubmit(){

  //   let customerTest={
  //     name:this.reactForm.controls["custName"].value,
  //     address:this.reactForm.controls["custAdd"].value,
  //     phone:this.reactForm.controls["custphone"].value,
  //     email:this.reactForm.controls["custEmail"].value,
  //   }
  
  //   console.log(this.reactForm.value);
  //   this.reactForm.reset();
  //   this.customerservice.saveCustomer(customerTest);
  // }
  constructor(private customerservice:CustomerClass,
    private router:Router,
    private toastr:ToastrService) {

    
 

      

    this.customerservice.getAllCustomer().subscribe((data) => this.customer=data);
    
   }
 
  
   AddCustomer(customerdata:Customer){
       console.log('add Customer : ' + JSON.stringify(customerdata));
       if (this.updateFlag=="insert") {  
       this.customerservice.AddCustomerData(customerdata).subscribe( 
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cust']);});
            this.toastr.success('Customer Insert Successfully!', ' ',{positionClass: 'toast-bottom-right'});
        }  
      );  
    } 
    else
     {  
      this.customerservice.UpdateCustomerData(customerdata).subscribe( 
        () => { 
          console.log(JSON.stringify(customerdata))
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';
        this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/cust']);});
          this.toastr.success('Customer Update Successfully!', ' ',{positionClass: 'toast-bottom-right'});
      
      });  
     
    }
   
    this.reactForm.reset();
  }
  
   DeleteCustomer(objmstCustomer:Customer) {  
    console.log("removeItem:" + objmstCustomer);
    if (confirm("Are You Sure To Delete this Informations")) {  
     this.customerservice.DeleteCustomerData(objmstCustomer).subscribe(  
      () => {  
       this.dataSaved = true;  
       this.massage = "Deleted Successfully";  
       this.toastr.success('Customer Deleted Successfully!', ' ',{positionClass: 'toast-bottom-right'});
       this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cust']);});
        
      }   
     );  
    }  
   }
  
   UpdateData(Customer){ 
   
    this.updateFlag="update";
    console.log(JSON.stringify(Customer))
     this.reactForm.controls['intCust_id'].setValue(Customer.intCust_id);
     this.reactForm.controls['nvcharCust_name'].setValue(Customer.nvcharCust_name);
     this.reactForm.controls['nvcharCust_address'].setValue(Customer.nvcharCust_address);
     this.reactForm.controls['nvcharCust_phone'].setValue(Customer.nvcharCust_phone);
     this.reactForm.controls['nvcharCust_email'].setValue(Customer.nvcharCust_email);
      
  }
  ngOnInit() {
    this.customer;
  }
  

  // edit(name,address,phone,email)
  // {
  //   console.log(name,address,phone,email);
  //  this.reactForm.controls['custAdd'].setValue(address);
  //   this.reactForm.controls['custphone'].setValue(phone);
  //     this.reactForm.controls['custName'].setValue(name);
  //  this.reactForm.controls['custEmail'].setValue(email);
  // }
  getCustomerName(customerName){
    let searchString=this.searchTerm;
    this.customer=this.customer.filter(filterArray);
    function filterArray(searchObject:Customer){
      return searchObject.nvcharCust_name==customerName;
   }
  }
  clearForm()
  {
    this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
     this.router.navigate(['/cust']);});
  }
  
}

  

