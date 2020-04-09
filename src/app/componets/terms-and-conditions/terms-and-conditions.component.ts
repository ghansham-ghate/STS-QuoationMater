import { Component, OnInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';
class tabledata{
  index:number;
  value:string;

}
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit,OnChanges {
  
  @Input()
  count:number=1;
  @Input()
  data:tabledata[]=[{index:1,value:""}];
  @Input()
  updateTerms:string="notUpdate";
  @Output() sendData : EventEmitter <tabledata[]> = new EventEmitter<tabledata[]>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.updateTerms,"len");
    if(this.updateTerms!=undefined)
    {
      let terms=this.updateTerms.split(',');
      this.data.pop();
      for(let i=0;i<terms.length;i++)
      {
        this.data.push({index:this.count,value:""});
        this.count+=1;
      }
    }
  }

  addRow()
  {
    this.count+=1;
    this.data.push({index:this.count,value:""});
  }
  addCondition(condition,index)
  {
     this.data[index-1].value=condition;
     this.sendData.emit(this.data)
  }
  removeRow()
  {
    this.count=this.count-1;
    this.data.pop();
  }
}
