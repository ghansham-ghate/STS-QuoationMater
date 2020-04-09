import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {RegionClass} from '../../shared/region.service';
import {Region} from '../../Models/Region.model';
import { Observable } from 'rxjs'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  p:number;
  region:Region[];
  dataSaved = false;  
  massage: string; 
  reactForm:any;
  searchTerm:string;
  updateFlag="insert"
  
  
  //   onSubmit(){

  //   // let regionTest={
  //   //   name:this.reactForm.controls["regionName"].value,
  //   //   code:this.reactForm.controls["regionCode"].value,
  //   //   domestic:this.reactForm.controls["regiondomestic"].value,
  //   // }
  //   // this.region.push(regionTest);
  //   this.reactForm.reset();
  //   // alert("Data Load succesfull");
  //   console.log(this.GetStudent());
  //   }

    // myFunction(name){
    //   for(let i = 0; i < this.region.length; ++i){
    //     if (this.region[i].name === name) {
    //         this.region.splice(i,1);
    //     }
    // }
    // }
   
  constructor(private regionClass:RegionClass,
    private router:Router,
    private toastr:ToastrService) {
    this.regionClass.getAllRegion().subscribe((data) => this.region=data);
  }
 
   
  AddRegion(Region :Region){
     console.log(Region)
     console.log('add Employee : ' + JSON.stringify(Region));
     if(this.updateFlag=="insert")
     {
      this.regionClass.AddRecord(Region).subscribe(
        ()=>{
          this.dataSaved=true;
          this.massage = 'Record saved Successfully'; 
          this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/region']);});
            this.toastr.success('Region Save Successfully!', ' ',{positionClass: 'toast-bottom-right'});
        }
      )
     
     }
     else
     {
      this.regionClass.UpdateRegionData(Region).subscribe(
        ()=>{
          console.log(Region)
          this.dataSaved=true;
          this.massage = 'Record updated Successfully';
          this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/region']);});
            this.toastr.success('Region Update Successfully!', ' ',{positionClass: 'toast-bottom-right'});
        }
      )
     }
     this.reactForm.reset();
 }

  DeleteRegion(region:Region) {  
    if (confirm("Are You Sure To Delete this Informations")) {  
      console.log(region);
     this.regionClass.DeleteRegionData(region).subscribe(  
      () => {  
        console.log(region);
       this.dataSaved = true;  
       this.massage = "Deleted Successfully";    
       this.router.navigateByUrl('/quotation', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/region']);});
        this.toastr.success('Region Delete Successfully!', ' ',{positionClass: 'toast-bottom-right'});
      }  
     );  
    }  
   }


   UpdateRegion(Region){
    this.updateFlag="update";
    console.log(JSON.stringify(Region))
    this.reactForm.controls['intRegion_id'].setValue(Region.intRegion_id);
    this.reactForm.controls['nvcharRegion_name'].setValue(Region.nvcharRegion_name);
     this.reactForm.controls['nvcharRegion_code'].setValue(Region.nvcharRegion_code);
     this.reactForm.controls['ynRegion_domestic_international'].setValue(Region.ynRegion_domestic_international);
    document.getElementById("select").setAttribute("selected","Domestic")
   }
  
  ngOnInit() {
    this.reactForm = new FormGroup({ 
      intRegion_id:new FormControl(''),
      nvcharRegion_name: new FormControl('',Validators.required),
      nvcharRegion_code:new FormControl('',Validators.required),
      ynRegion_domestic_international: new FormControl('',Validators.required),
      });
  }
  // edit(name,code,domestic)
  // {
  //   console.log(name,code,domestic);
  //   this.reactForm.controls['regionName'].setValue(name);
  //   this.reactForm.controls['regionCode'].setValue(code);
  //   this.reactForm.controls['regiondomestic'].setValue(domestic);
  // }

  
  getRegionName(){
    let searchString=this.searchTerm;
    this.region=this.region.filter(filterArray);
    function filterArray(searchObject){
      return searchObject.Region_name==searchString;
   }
  }

 clearForm()
 {
  this.reactForm.reset();
  this.router.navigateByUrl('/cust', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/region']);});
   this.updateFlag="insert";
 }
 
}
