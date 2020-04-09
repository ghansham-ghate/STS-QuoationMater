import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {POFeedClass} from '../../shared/pofeed.service';
import {QuotationClass} from '../../shared/quotation.service';
import {Quotation}  from '../../Models/Quoatation.model';
import {QuotationDetail} from '../../Models/QuotationDetail.model';
import { Toast, ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit {

  p:number;
  searchTerm:string;
  quotation:Quotation[];
  quotationDetailsWithitem:QuotationDetail[]=[];
  quotationWithPO:Quotation[]=[];
  quotationData:QuotationDetail[];
  showData: boolean = false;
  tempQuotation:Quotation;
   POData=[
  ]

  reactForm= new FormGroup({
  
    nvcharPONumber: new FormControl('',Validators.required),
    decPo_received_quantity: new FormControl('',Validators.required),
    decPo_pending_quantity: new FormControl('',Validators.required),
    decPo_price: new FormControl('',Validators.required),
    decPo_remaining_price: new FormControl('',Validators.required),
  })

  onSubmit(){
    let POTest={
      name:this.reactForm.controls["regionName"].value,
      quotationNo:this.reactForm.controls["quotationNo"].value,
      quotationDate:this.reactForm.controls["quotationDate"].value,
      poDate:this.reactForm.controls["poDate"].value,
      poNumber:this.reactForm.controls["poNumber"].value,  
      partyName:this.reactForm.controls["partyName"].value,
      amount:this.reactForm.controls["amount"].value 
    }
    this.POData.push(POTest);
    this.reactForm.reset();
  }

  
  myFunction(name){
    for(let i = 0; i < this.POData.length; ++i){
      if (this.POData[i].name === name) {
          this.POData.splice(i,1);
      }
  }
  }




  constructor(pofeed:POFeedClass,
    private quotationMasterService:QuotationClass,
    private poService:POFeedClass,
    private toastr:ToastrService,
    private router:Router) { 
    this.POData=pofeed.getPOFeed()
 
    this.quotationMasterService.getQuotation().subscribe((data)=>{this.quotation=data})
  }

  ngOnInit() {
  }

 

  getPONumber(){
    console.log(this.searchTerm);
    let searchString=this.searchTerm;
    let POdataArray=this.POData;
    this.POData=this.POData.filter(filterArray);
    function filterArray(searchObject){
      console.log(searchString+" "+searchObject.quotationNo);
      return searchObject.quotationNo==searchString;
   }
  }
  

  edit(name,quotationNo,quotationDate,poDate,poNumber,partyName,amount)
  {
    console.log(name,quotationNo,quotationDate,poDate,poNumber,partyName,amount);
    this.reactForm.controls['regionName'].setValue(name);
    this.reactForm.controls['quotationNo'].setValue(quotationNo);
    this.reactForm.controls['quotationDate'].setValue(quotationDate);
    this.reactForm.controls['poDate'].setValue(poDate);
    this.reactForm.controls['poNumber'].setValue(poNumber);
    this.reactForm.controls['partyName'].setValue(partyName);
    this.reactForm.controls['amount'].setValue(amount);
   
  }
editPoData(Quotation_id,tempQuotation){
  this.showData = true;
  
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
   this.tempQuotation=tempQuotation;
 
}

submitPoData(PoNumber,dtPoDate)
{
  for(let i=0;i<this.quotationDetailsWithitem.length;i++)
  
  {
     let received=parseInt(document.getElementById(""+i).innerHTML);
     this.quotationDetailsWithitem[i].nvcharPONumber=PoNumber;
     this.quotationDetailsWithitem[i].decPo_received_quantity=received;
     this.quotationDetailsWithitem[i].decPo_pending_quantity=this.quotationDetailsWithitem[i].decQuantity-received;
     this.quotationDetailsWithitem[i].decPo_price=(this.quotationDetailsWithitem[i].decPo_received_quantity)*this.quotationDetailsWithitem[i].decUnit_price;
     this.quotationDetailsWithitem[i].decPo_remaining_price=(this.quotationDetailsWithitem[i].decQuantity-received)*this.quotationDetailsWithitem[i].decUnit_price;
   
  }
  this.poService.submitPoData(this.quotationDetailsWithitem).subscribe((data)=>{
     console.log("Done");
     this.tempQuotation.nvcharPONumber=PoNumber;
     this.tempQuotation.dtPoDate=dtPoDate;
     this.poService.updatePODataInQuotation(this.tempQuotation).subscribe((data)=>{

      this.toastr.success('PO Update Successfully!', ' ',{positionClass: 'toast-bottom-right'});
    
       this.router.navigate(['/quotation']);
     })
  })
  


}


backToPOList(){
  this.router.navigateByUrl('/region', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/po']);});
}
}

