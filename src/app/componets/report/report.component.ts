import { Component, OnInit } from '@angular/core';
import { RegionClass } from '../../shared/region.service';
import {Region} from '../../Models/Region.model';
import {QuotationClass} from '../../shared/quotation.service';
import {Quotation} from '../../Models/Quoatation.model';
import {CustomerClass} from '../../shared/customer.service';
import {Customer} from '../../Models/Customer.model';
import { QuotationDetail } from '../../Models/QuotationDetail.model';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  showTable: string;
  ReportTypeArray=["PO Report","PO Receive","Quotation Pending"]
  region:Region[];
  quotation:Quotation[];
  customer:Customer[];
  quotationDetail:QuotationDetail[];
  filteredQuotationDetail:QuotationDetail[];
  searchTerm:string;
  allFilterSet:boolean=false;
  constructor(private regionService:RegionClass,
              private quotationService:QuotationClass,
              private customerService:CustomerClass,
              private toastr:ToastrService) { 
    this.regionService.getAllRegion().subscribe((data) => this.region=data);
    this.quotationService.getQuotation().subscribe((data)=>{this.quotation=data;
      for(let i=0;i<this.quotation.length;i++){
        let   start= new Date(this.quotation[i].dtEnqDate);
        let   end=new Date(this.quotation[i].dtQuoDate);
         console.log(start,end)  
          let timediff=Math.abs(start.getTime()-end.getTime());
            this.quotation[i].NvcharDescription=""+Math.ceil(timediff/(1000 * 3600 * 24));
      }});
     this.quotationService.getQuotationDetail().subscribe((data)=>this.quotationDetail=data);
    this.customerService.getAllCustomer().subscribe((data)=>this.customer=data);
  }

  ngOnInit() {
  }
  
  setReportType(reportType) 
  {
    console.log(reportType);
    this.showTable=reportType;
  }

  checkAllFilters(from,to,regionId,reportType):boolean
  {
   if(from!='' && to!='' && regionId!=0 && reportType!=0)
   {
    this.allFilterSet=true;
     return true;
   }
   else
   {
     this.allFilterSet=false;
     return false;
   }
  }
  
  filterRegion(from ,to,regionId,reportType){
    if(this.checkAllFilters(from,to,regionId,reportType))
    {
    let DayDiff;
    console.log(from+"T00:00:00",to+"T23:59:59",this.quotation);
    let requestBody=[];
    requestBody.push({Key:"dtfromdate",Value:from+"T00:00:00"});
    requestBody.push({Key:"dtTodate",Value:to+"T23:59:59"});
    requestBody.push({Key:"region",Value:regionId});
    
   
    this.regionService.reportFromDateToDate(requestBody).subscribe(
      (data)=>{
       console.log(data)
         this.quotation=data;
         for(let i=0;i<this.quotation.length;i++){
          let   start= new Date(this.quotation[i].dtEnqDate);
          let   end=new Date(this.quotation[i].dtQuoDate);
           console.log(start,end)  
            let timediff=Math.abs(start.getTime()-end.getTime());
              DayDiff=Math.ceil(timediff/(1000 * 3600 * 24));
              this.quotation[i].NvcharDescription=DayDiff;
           console.log(timediff,DayDiff);   
        }
        if(reportType=='Quotation Pending') 
        {
          for(let i=0;i<this.quotationDetail.length;i++)
          {
            
          }
        }
      }
    )
    this.clear();
    }
    else
    {
      this.toastr.error('Please set the filter values', ' ',{positionClass: 'toast-bottom-right'});
    }
  //  this.quotation=this.quotation.filter(filterArray);
  //   function filterArray(searchObject){
  //     console.log(sel+" "+searchObject.mstRegionnvcharRegion_name);
  //     console.log(searchObject.mstRegionnvcharRegion_name==sel)
  //     return searchObject.mstRegionnvcharRegion_name==sel;
     
  //     }
     
   }
   clear() {
     
    let dropDown = document.getElementById("regionreset");
     dropDown.innerHTML.indexOf("0");
  } 
}
