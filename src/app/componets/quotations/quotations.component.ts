import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RegionClass} from '../../shared/region.service';
import {CustomerClass} from '../../shared/customer.service';
import {QuotationClass} from '../../shared/quotation.service';
import {Router, ActivatedRoute} from '@angular/router'
import { AuthService } from '../../shared/AuthService.service';
import { Region } from '../../Models/Region.model';
import {Customer} from '../../Models/Customer.model';
import {ItemCategory} from '../../Models/ItemCategory.modal';
import {Quotation} from '../../Models/Quoatation.model';
import { ToastrService } from 'ngx-toastr';
import {ProductClass} from '../../shared/product.service';
import {QuotationDetail} from '../../Models/QuotationDetail.model';
import {POFeedClass} from '../../shared/pofeed.service';
import {Item} from '../../Models/Item.model';
import * as es6printJS from "print-js";





@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {
  
  tempIndex:number;
  HideUpdate:boolean;
  ShowUpdateQuotationForm:boolean;
  customerAddress:string;
  customerName:string;
  quotationNumber:string;
  itemSignAuth:string;
  billedQuotation:Quotation;
  p:number;
  productDescription:string;
  intItem_id:number;
  nvcharItem_code:string;
  nvcharItem_description:string;
  pricingColumns=[];
  decTotal_amount:number=0;
  updateFlag="insert";
  dataSaved = false;  
  massage = null; 
  quotationDetailsWithitem:QuotationDetail[]=[];
  termAndCondition=[];
  termAndConditionString:string;
  regions:Region[];
  itemCategory:ItemCategory[];
  items:Item[];
  itemElements=[];
  customers:Customer[];
  quotation:Quotation[]; 
  quot:Quotation;
  searchTerm:string;
  showHead: boolean = false;
  showdata: boolean = false;
  EditableQuotationRecipt:boolean=false;
  updatedQuotation:Quotation;
  showQuotation:boolean=true;
  reactForm = new FormGroup({
    intQuotation_id:new FormControl(''),
    nvcharQuotation_no: new FormControl(''),
    nvcharCust_name: new FormControl('',Validators.required),
    ynRegion_domestic_international:new FormControl('',Validators.required),
    intItem_category_id: new FormControl('',Validators.required),
    nvcharRegion_name: new FormControl('',Validators.required),
    decCurrency_Value: new FormControl('',Validators.required),
    nvcharCurrency_unit: new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    contactName: new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    dtEnqDate: new FormControl('',Validators.required),
    dtQuoDate: new FormControl('',Validators.required),

   });

   
   reactFormForTax = new FormGroup({
    Quantity:new FormControl('',Validators.required),
    tax:new FormControl('',Validators.required),
    discount:new FormControl('',Validators.required)
   })

  

  constructor(private regionobj:RegionClass ,
             private customerobj:CustomerClass,
             private quotationservice:QuotationClass ,
             private router:Router,private router1:ActivatedRoute,
             private authservice:AuthService,
             private productclass:ProductClass,
             private poService:POFeedClass,
             private toastr:ToastrService) {
    this.regionobj.getAllRegion().subscribe((data)=>this.regions=data);
    this.productclass.GetAllItem().subscribe((data)=>{this.items=data;console.log(this.items)});
    this.customerobj.getAllCustomer().subscribe((data)=>this.customers=data);
    this.quotationservice.getQuotation().subscribe((data)=>{this.quotation=data;console.log(data)});
    this.quotationservice.getAlItemCategory().subscribe((data)=>{this.itemCategory=data;console.log(data)});
    // this.productclass.GetAllItem().subscribe((data) => this.item=data);
   }

  

  submitData(quotation:Quotation){
    console.log(this.reactForm.value)
    let Cust_id:number;
    let Region_id:number;
    let cust_address:string;
    var string=this.reactForm.controls['phone'].value+","+this.reactForm.controls['contactName'].value+","+this.reactForm.controls['email'].value
     quotation.NvcharDescription=string;
  
       for(let i=0;i<this.customers.length;i++)
     {
       if(this.customers[i].nvcharCust_name==this.reactForm.controls['nvcharCust_name'].value)
       {
        Cust_id=this.customers[i].intCust_id;
        window.localStorage.setItem("customer_address",this.customers[i].nvcharCust_address) ;
        window.localStorage.setItem("customer_name",this.customers[i].nvcharCust_name);
       }
     }
     for(let i=0;i<this.regions.length;i++)
     {
       console.log(this.regions[i].nvcharRegion_name,this.regions);
      if(this.regions[i].nvcharRegion_name==this.reactForm.controls['nvcharRegion_name'].value)
      {
        Region_id=this.regions[i].intRegion_id;
      }
     }

     if(this.checkTermsAndCondition())
     {
      this.quotationservice.setTempQuotation(this.reactForm.value,Cust_id,Region_id,this.quotationNumber,this.termAndCondition);
      if (this.router.navigateByUrl('/product/1')) {
        this.showHead = false;
      } else {
        this.showHead = true;
      }
     }
     else{
      this.toastr.success('One or more conditions empty. check terms and conditions!', ' ',{positionClass: 'toast-bottom-right'});
     }

   

     
  }

  setTermsAndCondition(data)
  {
     this.termAndCondition=data;
  }
  checkTermsAndCondition():boolean
  {
    let val=true;
    for(let i=0;i<this.termAndCondition.length;i++)
    {
      let condition=this.termAndCondition[i];
      if(condition.value=="")
      {
        val=false;
      }
    }
    return val;
  } 
  ngOnInit() {
  }
 
   DeleteQuotation(quoatation:Quotation) {  
    console.log("removeItem:" + quoatation);
    if (confirm("Are You Sure To Delete this Informations")) {  
     this.quotationservice.DeleteQuotationData(quoatation).subscribe(  
      () => {  
      this.toastr.success('Deleted Successfully!', ' ',{positionClass: 'toast-bottom-right'});
       this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/quotation']);});
       }
     );  
    }  
    
   }
  
   UpdateData(Quotation,Quotation_id:number){
   this.updateFlag="update"
    console.log(Quotation)
    this.updatedQuotation=Quotation;
    this.updatedQuotation.dtQuoDate=Quotation.dtQuoDate.substring(0,10);
    this.quotationNumber=Quotation.nvcharQuotation_no;
    this.reactForm.controls['intQuotation_id'].setValue(Quotation.intQuotation_id);
     this.reactForm.controls['nvcharQuotation_no'].setValue(Quotation.nvcharQuotation_no);
     this.reactForm.controls['nvcharCust_name'].setValue(Quotation.mstCustomernvcharCust_name);
     this.reactForm.controls['ynRegion_domestic_international'].setValue(Quotation.ynRegion_domestic_international);
     this.reactForm.controls['intItem_category_id'].setValue(Quotation.mstItemCategoryintItem_category_id);
     this.reactForm.controls['nvcharRegion_name'].setValue(Quotation.mstRegionnvcharRegion_name);
     this.reactForm.controls['decCurrency_Value'].setValue(Quotation.decCurrency_Value);
     this.reactForm.controls['nvcharCurrency_unit'].setValue(Quotation.nvcharCurrency_unit);
     this.reactForm.controls['phone'].setValue(Quotation.NvcharDescription.split(',')[0]);
     this.reactForm.controls['contactName'].setValue(Quotation.NvcharDescription.split(',')[1]);
     this.reactForm.controls['email'].setValue(Quotation.NvcharDescription.split(',')[2]);

     this.reactForm.controls['dtEnqDate'].setValue(Quotation.dtEnqDate.substring(0,10));
     this.reactForm.controls['dtQuoDate'].setValue(Quotation.dtQuoDate.substring(0,10))
     this.editPoData(Quotation_id);
     this.showHead = true;
     this.showQuotation=true;
     
    //  this.ShowUpdateQuotationForm=false;

  }
  getQuotationNoSearch(){
    let searchString=this.searchTerm;
    this.quotation=this.quotation.filter(filterArray);
    function filterArray(searchObject){
      return searchObject.quotationsNo==searchString;
   }
  }

  editPoData(Quotation_id:number){
    this.showdata = true;
    let quotationalDetailsPO:QuotationDetail={
      intItem_id:null,
      decNet_amount:null,
      decAmount:null,
      decQuantity:null,
      decUnit_price:null,
      nvcharTax_description:null,
      nvcharPONumber: null, 
      decPo_received_quantity:null,
      decPo_pending_quantity:null,
      decPo_price:null,
      decPo_remaining_price:null,
      nvcharItem_code:null, 
      nvcharItem_description:null,
      intQuotation_detail_id:null,
      intQuotation_id:Quotation_id,
      decTax_add:null,
      NvcharDescription:null,
      DtDateofCreation:null,
      DtDateofModification:null,
      YnDeleted:null
     }
    
     this.poService.GetAllQuotationDetail(quotationalDetailsPO).subscribe((data)=>{
      this.quotationDetailsWithitem=data;
     })
  }

  backToQuotation(){
    this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/quotation']);});
  }
  getQuotationNo(itemCategoryId){
    this.quotationservice.getQuotationNumber(itemCategoryId).subscribe((data)=>{this.quotationNumber=data,this.itemSignAuth=data});
    console.log(itemCategoryId);
  }

  deleteItemToEditableQuotation(i){
    
    this.productclass.deleteQuotation_details(this.quotationDetailsWithitem[i]).subscribe((data)=>{
       console.log(data);
    });
    this.quotationDetailsWithitem.splice(i,1);
  }



  fillModal(i)
  {

   
    console.log(i);
    this.tempIndex=i;
    let pricingJSONArray=JSON.parse(this.items[i].nvcharItem_details);
    console.log(pricingJSONArray);
    let pricing=[];
    for(let i=0;i<pricingJSONArray.length;i++)
    {
      pricing.push(pricingJSONArray[i]);
    }
   this.intItem_id=this.items[i].intItem_id;
   this.nvcharItem_code=this.items[i].nvcharItem_code;
   this.nvcharItem_description=this.items[i].nvcharItem_description; 
   this.pricingColumns=pricing; 
   console.log(this.pricingColumns);
   
  }

  submitItemDetails(value,i,headerArray,intItem_id,nvcharItem_code,nvcharItem_description)
  {
     let closeModal=document.getElementById("closeModal");
     closeModal.click();
     let priceMessage=document.getElementById("priceMessage");
     this.productDescription=headerArray[0][i];
     priceMessage.innerHTML="<br><Strong> Price</Strong> : "+value;
     priceMessage.setAttribute("Price",value);
     priceMessage.setAttribute("NameTag",headerArray[0][i])
     priceMessage.setAttribute("intItem_id",intItem_id);
     priceMessage.setAttribute("nvcharItem_code",nvcharItem_code);
     priceMessage.setAttribute("nvcharItem_description",nvcharItem_description);
     console.log("intItem_id "+intItem_id);
   
  }


   //confirm adding item to qoutatio

   addItemToQuotation(quantity,tax,discount)
   {
     alert(this.productDescription);
     let priceMessage=document.getElementById("priceMessage");
     let itemBaseAmount=parseInt(priceMessage.getAttribute("Price"))*quantity;
     let netAmount=itemBaseAmount-(itemBaseAmount*(discount/100));
     netAmount=netAmount+(netAmount*(tax/100));
     console.log(netAmount)
     let quotationDetail:QuotationDetail={
     intQuotation_detail_id:null,
     intQuotation_id:this.reactForm.controls['intQuotation_id'].value,
     nvcharItem_code:priceMessage.getAttribute("nvcharItem_code"),
     intItem_id:parseInt(priceMessage.getAttribute("intItem_id")),
     nvcharItem_description:this.productDescription,
     nvcharTax_description:null,
     decUnit_price:parseInt(priceMessage.getAttribute("Price")),
     decQuantity:quantity,
     decTax_add:tax,
     decNet_amount:netAmount,
     decAmount:itemBaseAmount,
 
     nvcharPONumber:null,
     decPo_received_quantity:null,
     decPo_pending_quantity:null,
     decPo_price:null, 
     decPo_remaining_price:null,
     NvcharDescription:discount,
     DtDateofCreation:null,
     DtDateofModification:null,
     YnDeleted:null,
     }
     this.quotationDetailsWithitem.push(quotationDetail);
     this.productclass.InsertQuotation_details([quotationDetail]).subscribe(data=>{console.log(data)});
     }



insertUpdatedQuotation(){
console.log("item details in quotation",this.quotationDetailsWithitem)
   var detailString=this.reactForm.controls['phone'].value+","+this.reactForm.controls['contactName'].value+","+this.reactForm.controls['email'].value
    
    let Cust_id:number;
    let Region_id:number;
     for(let i=0;i<this.customers.length;i++)
     {
       if(this.customers[i].nvcharCust_name==this.reactForm.controls['nvcharCust_name'].value)
       {
        Cust_id=this.customers[i].intCust_id;
        this.customerAddress=this.customers[i].nvcharCust_address;
        this.customerName=this.customers[i].nvcharCust_name;
       }
     }
     for(let i=0;i<this.regions.length;i++)
     {
       console.log(this.regions[i].nvcharRegion_name,this.regions);
      if(this.regions[i].nvcharRegion_name==this.reactForm.controls['nvcharRegion_name'].value)
      {
        Region_id=this.regions[i].intRegion_id;
      }
     }
     
  this.quotationservice.setTempQuotationForUpdate(this.reactForm.value,Cust_id,Region_id,this.reactForm.controls["nvcharQuotation_no"].value);
  let qout:Quotation=this.quotationservice.quotation;
  qout.NvcharDescription=detailString;
  this.billedQuotation=qout;
  console.log(qout);
  let netAmount=0
  for(let i=0;i<this.quotationDetailsWithitem.length;i++)
  {
    netAmount=netAmount+this.quotationDetailsWithitem[i].decNet_amount;
  }
  this.billedQuotation.decTotal_amount=netAmount;
  this.quotationservice.UpdateQuotationData(qout).subscribe((data)=>{
    console.log("Billed Quotation",data)
    this.productclass.updateQuotation_detais(this.quotationDetailsWithitem).subscribe((data)=>{console.log(data)
      // this.router.navigateByUrl('/product', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/quotation']);});
        
        this.toastr.success('Quatation Update Successfully!', ' ',{positionClass: 'toast-bottom-right'});
        this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/quotation']);});
       
    })
 
  })
  
}
showQuotationReceipt()
{
  let Cust_id:number;
    let Region_id:number;
     for(let i=0;i<this.customers.length;i++)
     {
       if(this.customers[i].nvcharCust_name==this.reactForm.controls['nvcharCust_name'].value)
       {
        Cust_id=this.customers[i].intCust_id;
        this.customerAddress=this.customers[i].nvcharCust_address;
        this.customerName=this.customers[i].nvcharCust_name;
       }
     }
     for(let i=0;i<this.regions.length;i++)
     {
       console.log(this.regions[i].nvcharRegion_name,this.regions);
      if(this.regions[i].nvcharRegion_name==this.reactForm.controls['nvcharRegion_name'].value)
      {
        Region_id=this.regions[i].intRegion_id;
      }
     }
     this.quotationservice.setTempQuotationForUpdate(this.reactForm.value,Cust_id,Region_id,this.reactForm.controls["nvcharQuotation_no"].value);
  var detailString=this.reactForm.controls['phone'].value+","+this.reactForm.controls['contactName'].value+","+this.reactForm.controls['email'].value
  let qout:Quotation=this.quotationservice.quotation;
  qout.NvcharDescription=detailString;
  this.billedQuotation=qout;
  console.log(qout);
  let netAmount=0
  for(let i=0;i<this.quotationDetailsWithitem.length;i++)
  {
    netAmount=netAmount+this.quotationDetailsWithitem[i].decNet_amount;
  }
  this.billedQuotation.decTotal_amount=netAmount;
  this.EditableQuotationRecipt=true;
}
calcuateTaxAndDiscountDetais(id,price,quantity,discount,tax,i)
{
  console.log(id,price,quantity,discount,tax)
  let itemBaseAmount=(price*quantity);
  let netAmount=itemBaseAmount-(itemBaseAmount*(discount/100));
  netAmount=netAmount+(netAmount*(tax/100));
  this.quotationDetailsWithitem[i].decAmount=itemBaseAmount;
  this.quotationDetailsWithitem[i].decNet_amount=netAmount;
  this.quotationDetailsWithitem[i].decQuantity=quantity;
  this.quotationDetailsWithitem[i].decTax_add=tax;
  this.quotationDetailsWithitem[i].NvcharDescription=discount;
  document.getElementById("baseAmount").setAttribute("value",""+itemBaseAmount);
  document.getElementById("netAmount").setAttribute("value",""+netAmount);
  for(let i=0;i<this.quotationDetailsWithitem.length;i++)
  {
    if(this.quotationDetailsWithitem[i].intItem_id==id)
    {
       this.quotationDetailsWithitem[i].decUnit_price=price;
       this.quotationDetailsWithitem[i].decQuantity=quantity;
       this.quotationDetailsWithitem[i].NvcharDescription=discount;
       this.quotationDetailsWithitem[i].decTax_add=tax;
    }
  }
}
toggle()
{
  // this.showQuotation=!this.showQuotation;
  this.showQuotation=false
}

printOfQuotation(){

  window.print();

}

printTest() {
  es6printJS("test",'html');
}

// makePdf() { 
//   let doc = new jsPDF();
//   doc.addHTML( function() {
//      doc.save("obrz.pdf");
//   });
// }
}