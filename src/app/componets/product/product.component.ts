  import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
  import{Router, ActivatedRoute} from '@angular/router';
  import {ProductClass} from '../../shared/product.service';
  import { QuotationClass } from '../../shared/quotation.service';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import {submitDetailsCall,updateSubmitDetailsCall} from '../../shared/productHelper/productHelper';
  import {Quotation} from '../../Models/Quoatation.model';
  import {Item} from '../../Models/Item.model';
  import {ItemCategory} from '../../Models/ItemCategory.modal';
 import {QuotationDetail} from '../../Models/QuotationDetail.model';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
  @Component({
    selector: 'app-product',  
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
  })
  export class ProductComponent implements OnInit {
    itemCategory:ItemCategory[];
    productDescription:string;
    p:number;
    intItem_id:number;
    nvcharItem_code:string;
    nvcharItem_description:string;
    itemWithPriceDetails:QuotationDetail[]=[];
    totalPrice:Quotation[]=[];
    updateFlag="insert";
    tempUpdateItem:Item;
    item:Item[];
    rows:number[]=[];
    columns:number[]=[];
    pricingColumns=[];
    numberOfRows:number=0;
    numberOfColumns:number=0;
    outerCount:number=0;
    rowOuterCount:number=0;
    data=[];
    itemElements=[];
    category:string;
    searchTerm:string;
    decTotal_amount:number=0;
    itemBaseAmount:number=0;
    productDetailpricing;
    showHead: boolean = false;
    isQuotationReady:boolean=false;
    QuotationRecipt:boolean=false;
    updateItemQuotationData:boolean;
    quotation;
    quotationDetail:QuotationDetail[];
    customer_address=window.localStorage.getItem("customer_address"); 
    customer_name=window.localStorage.getItem("customer_name");
    reactForm = new FormGroup({
      intItem_id:new FormControl(''),
      nvcharItem_code: new FormControl('',Validators.required),
      nvcharItem_name:new FormControl('',Validators.required),
      nvcharItem_description: new FormControl('',Validators.required),
      nvcharItem_details: new FormControl(''),
      intItem_category_id: new FormControl('',Validators.required),
     });
 
     reactFormForTax = new FormGroup({
      quantity:new FormControl('',Validators.required),
      tax:new FormControl('',Validators.required),
      discount:new FormControl('',Validators.required)
     })
    

    isCategoryAvailable=false;
    constructor( private productclass:ProductClass,
                 private router:Router,
                 private quotationservice :QuotationClass,
                 private router1:ActivatedRoute,
                 private toastr:ToastrService) {
      this.data=this.productclass.getProduct();
      console.log(this.quotationservice.getTempQoutation());
        this.quotation=this.quotationservice.getTempQoutation();
        this.productclass.GetAllItem().subscribe((data) => this.item=data);
        this.quotationservice.getAlItemCategory().subscribe((data)=>this.itemCategory=data);
     //  this.quotationDetail=this.productclass.GetAllQuotationDetail();
         this.productclass.GetAllQuotationDetail().subscribe((data)=>this.quotationDetail=data);
       
         
      this.router1.params.subscribe((params)=>{
          if(params['id']!=null)
          {
            this.isQuotationReady=true;
          }
      })
      for (let i = 0; i < 10; i++) {
            this.rows.push(i);
            this.numberOfRows=this.rows.length;
          }
          for(let i=0;i<4;i++)
          {
            this.columns.push(i);
            this.numberOfColumns=this.columns.length;
          }
        
          this.productclass.GetAllItem().subscribe((data)=> {
            this.item=data;
          });
    }


    

    addRow(){
      this.rows.push(this.rows.length)
    }

    addColumn(){
      this.columns.push(this.columns.length)
    }
    ngOnInit() {
      
    }
    
    submitDetails()
    {
      this.productDetailpricing=submitDetailsCall(this.productDetailpricing,this.columns,this.rows,this.outerCount,this.rowOuterCount);
      console.log(this.productDetailpricing)
    }
     submitdata(itemdata:Item){

      console.log(itemdata);
      itemdata['nvcharItem_details']=this.productDetailpricing;
      console.log(itemdata);
      if(this.updateFlag=="insert"){
      this.productclass.InsertItemDetail(itemdata).subscribe(()=>{
        this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/product']);});
          this.toastr.success('Save Successfully!', ' ',{positionClass: 'toast-bottom-right'});
    })
     }
     else
     {
      let idFormEement=document.getElementById("itemId");
      itemdata.intItem_id=parseInt(idFormEement.getAttribute("value"));
       itemdata.nvcharItem_code=this.reactForm.controls['nvcharItem_code'].value;
       itemdata.nvcharItem_name=this.reactForm.controls['nvcharItem_name'].value;
       itemdata.nvcharItem_description=this.reactForm.controls['nvcharItem_description'].value
       itemdata.nvcharItem_details=this.reactForm.controls['nvcharItem_details'].value;

       this.productclass.UpdateItemMasterData(itemdata).subscribe(()=>{
        this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/product']);});
          this.toastr.success('Update Successfully!', ' ',{positionClass: 'toast-bottom-right'});
       })
     }
     this.reactForm.reset();
     }

     updateItem(Item:Item)
     {
       console.log(Item);
      let fillPricingButton= document.getElementById("fillPricingButton");
      fillPricingButton.style.display="none";
      // let noteForSelectPricing=document.getElementById("noteForSelectPricing");
      // noteForSelectPricing.style.display="none";
      this.updateFlag="update";
      let idFormEement=document.getElementById("itemId");
      idFormEement.setAttribute("value",""+Item.intItem_id);
      console.log(Item.intItem_id,idFormEement.getAttribute("value"));
      this.reactForm.controls['nvcharItem_code'].setValue(Item.nvcharItem_code);
      this.reactForm.controls['nvcharItem_name'].setValue(Item.nvcharItem_name);
      this.reactForm.controls['nvcharItem_description'].setValue(Item.nvcharItem_description);
      this.reactForm.controls['nvcharItem_details'].setValue(Item.nvcharItem_details);
      this.reactForm.controls['intItem_category_id'].setValue(Item.intItem_category_id);
      document.getElementById("select").setAttribute("selected","Export")

     }

     
  deleteItem(Item:Item){
    if (confirm("Are You Sure To Delete this Informations")) {  
      this.productclass.DeleteItemMasterData(Item).subscribe(  
       () => {  
  
        this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/product']);});
          this.toastr.success('Delete Successfully!', ' ',{positionClass: 'toast-bottom-right'});
       }   
      );  
     } 
  }

    clearAllCell()
    {
      this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/product']);
    }); 
    }
    setValue(value,id)
    {
      let el=document.getElementById(id).setAttribute('cell-value',value);
    }


    getItemName(itemName){
      let searchString=itemName;
      let productData=this.data.filter(filterArray);
      function filterArray(searchObject){
        console.log(searchString+" "+searchObject.itemName);
        return searchObject.itemName==searchString;
     }
      console.log(productData)

      if( productData.length>0 ){
        var showGridButton = document.getElementById("showgrid");
       showGridButton.click();
    }
  }
    
  fillModal(nvcharItem_details:Item)
  {
  
    console.log(nvcharItem_details);
    let pricingJSONArray=JSON.parse(nvcharItem_details.nvcharItem_details);
    console.log(pricingJSONArray);
    let pricing=[];
    for(let i=0;i<pricingJSONArray.length;i++)
    {
      pricing.push(pricingJSONArray[i]);
    }
   this.intItem_id=nvcharItem_details.intItem_id;
   this.nvcharItem_code=nvcharItem_details.nvcharItem_code;
   this.nvcharItem_description=nvcharItem_details.nvcharItem_description; 
   this.pricingColumns=pricing; 
   console.log(this.pricingColumns);

  }

  SearchProductName(){
    let searchString=this.searchTerm;
    this.data=this.data.filter(filterArray);
    function filterArray(searchObject){
      return searchObject.itemName==searchString;
   }
  }

  ///getting product price
  submitItemDetails(value,i,headerArray,intItem_id,nvcharItem_code,nvcharItem_description)
  {
     let closeModal=document.getElementById("closeModal");
     closeModal.click();
     let priceMessage=document.getElementById("priceMessage");
     this.productDescription=headerArray[0][i];
     priceMessage.innerHTML="<Strong> Price</Strong> : "+value+"<hr>";
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

    let priceMessage=document.getElementById("priceMessage");
    let itemBaseAmount=parseInt(priceMessage.getAttribute("Price"))*quantity;
    let netAmount=itemBaseAmount-(itemBaseAmount*(discount/100));
    netAmount=netAmount+(netAmount*(tax/100));
    console.log(netAmount)
  
  
    this.itemElements.push({itemName:priceMessage.getAttribute("NameTag"),
                            itemPrice:priceMessage.getAttribute("Price"),
                            itemId:priceMessage.getAttribute("intItem_id"),
                            nvcharItem_code:priceMessage.getAttribute("nvcharItem_code"),
                            nvcharItem_description:this.productDescription,
                            itemQuantity:quantity,
                            itemTax:tax,
                            itemDiscount:discount,
                            netAmount:netAmount,
                            baseAmount:itemBaseAmount,
                           
                          });
    this.showHead = true;
    this.decTotal_amount=this.decTotal_amount+netAmount;
     
    }

// updateItemToQuotation

updateItemToQuotation(itemElements){
  this.updateFlag="update";

   this.reactFormForTax.controls['Quantity'].setValue(itemElements.itemQuantity);
   this.reactFormForTax.controls['tax'].setValue(itemElements.itemTax);
   this.reactFormForTax.controls['discount'].setValue(itemElements.itemDiscount);
}



  deleteItemToQuotation(i){
    this.itemElements.splice(i,1);
    // console.log(this.itemElements[i].netAmount)
    // this.decTotal_amount=this.decTotal_amount-this.itemElements[i].netAmount
    // total=this.decTotal_amount-this.itemElements[i].netAmount
    console.log("Item elements",this.itemElements);
    this.calculateTotal()
  }

calculateTotal(){
  let amount=0;
  for(let i=0;i<this.itemElements.length;i++)
  {
   amount=amount+parseInt(this.itemElements[i].netAmount);
   console.log(this.itemElements[i].decNet_amount,i,amount)
  }
  this.decTotal_amount=amount;
}


createTotal(){

  for(let i=0;i<this.itemElements.length;i++)
  {
   
   let quotationalDetailsWithItem:QuotationDetail={
    intItem_id:this.itemElements[i].itemId,
    decNet_amount:this.itemElements[i].netAmount,
    decAmount:this.itemElements[i].baseAmount,
    decQuantity:this.itemElements[i].itemQuantity,
    decUnit_price:this.itemElements[i].itemPrice,
    nvcharTax_description:"None",
    nvcharPONumber: "None", 
    decPo_received_quantity:0,
    decPo_pending_quantity:0,
    decPo_price:0,
    decPo_remaining_price:0,
    nvcharItem_code:this.itemElements[i].nvcharItem_code, 
    nvcharItem_description:this.itemElements[i].nvcharItem_description,
    intQuotation_detail_id:0,
    intQuotation_id:22,
    decTax_add:this.itemElements[i].itemTax,
    NvcharDescription:this.itemElements[i].itemDiscount,
    DtDateofCreation:0,
    DtDateofModification:0,
    YnDeleted:true
   }
   this.itemWithPriceDetails.push(quotationalDetailsWithItem);
 }

 this.insertQuotationToQuotationMaster();
 this.QuotationRecipt=true;  
}


insertQuotationToQuotationMaster(){
  this.quotation.decTotal_amount=this.decTotal_amount;
  
  this.quotationservice.AddQuotation(this.quotation).subscribe((data)=> {
  for(let i=0;i<this.itemWithPriceDetails.length;i++)
  {
    this.itemWithPriceDetails[i].intQuotation_id=data;
    
  }
  
  console.log(this.quotation)
    
  this.productclass.InsertQuotation_details(this.itemWithPriceDetails).subscribe((data)=>{
    console.log(data);
    console.log("Item with details qout",this.itemWithPriceDetails);
    // this.router.navigate(['/quotation']);
    this.toastr.success('Quotation Submit Successfully!', ' ',{positionClass: 'toast-bottom-right'});
  }) 
  })
let itemList={}; 
}

//////update pricing modal

updatePricingModal(Item,event)
{
  this.tempUpdateItem=Item;
    let pricingJSONArray=JSON.parse(Item.nvcharItem_details);
    console.log(Item);
    for(let i=0;i<pricingJSONArray.length;i++)
    {
      for(let j=0;j<pricingJSONArray[i].length;j++)
      {
        console.log(pricingJSONArray[i][j]);
      
        document.getElementById(""+i+""+(j)+"l").setAttribute("value",pricingJSONArray[i][j]);
        document.getElementById(""+i+""+(j)+"l").setAttribute("cell-value",pricingJSONArray[i][j]);
      }
    }
  
  
}

//////// clearing update pricing model

clearModal()
{
  for(let i=0;i<this.rows.length;i++)
    {
      for(let j=0;j<this.columns.length;j++)
      {
        document.getElementById(""+i+""+(j)+"l").setAttribute("value","");
        document.getElementById(""+i+""+(j)+"l").setAttribute("cell-value","NA");
      }
    }
}
/////update price set value function
updatePriceSetValue(value,id)
    {
      let el=document.getElementById(id).setAttribute('cell-value',value);
    }
////////updating pricing Modal
SubmitUpdatedPricingDetail()
{
  this.productDetailpricing=updateSubmitDetailsCall(this.productDetailpricing,this.columns,this.rows,this.outerCount,this.rowOuterCount);
  this.tempUpdateItem.nvcharItem_details=this.productDetailpricing;
  this.productclass.UpdateItemMasterData(this.tempUpdateItem).subscribe(()=>{
    this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product']);});
      this.toastr.success('Update Successfully!', ' ',{positionClass: 'toast-bottom-right'});
   }) 
  console.log(this.productDetailpricing)
}
/////// clear form after update

clearForm()
{
  this.reactForm.reset();
  this.updateFlag="insert";
  let fillPricingButton= document.getElementById("fillPricingButton");
  fillPricingButton.style.display="block";
}

calcuateTaxAndDiscountDetais(id,price,quantity,discount,tax,i)
{
  console.log(id,price,quantity,discount,tax)
  let itemBaseAmount=(price*quantity);
  let netAmount=itemBaseAmount-(itemBaseAmount*(discount/100));
  netAmount=netAmount+(netAmount*(tax/100));
  this.itemElements[i].baseAmount=itemBaseAmount;
  this.itemElements[i].netAmount=netAmount;
  this.itemElements[i].itemQuantity=quantity;
  this.itemElements[i].itemTax=tax;
  this.itemElements[i].itemDiscount=discount;
  document.getElementById("baseAmount").setAttribute("value",""+itemBaseAmount);
  document.getElementById("netAmount").setAttribute("value",""+netAmount);
  for(let i=0;i<this.itemWithPriceDetails.length;i++)
  {
    if(this.itemWithPriceDetails[i].intItem_id==id)
    {
       this.itemWithPriceDetails[i].decUnit_price=price;
       this.itemWithPriceDetails[i].decQuantity=quantity;
       this.itemWithPriceDetails[i].NvcharDescription=discount;
       this.itemWithPriceDetails[i].decTax_add=tax;
    }
  }
}

// Printout Of Quoatation

printOfQuotation(){

  window.print();

}

}
