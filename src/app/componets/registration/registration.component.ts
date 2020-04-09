import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {User} from '../../Models/User.model';
import { RegistrationClass } from '../../shared/Registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  dataSaved = false;  
  massage = null; 
  user:User[];
  reactForm =new FormGroup({
    nvcharUserName: new FormControl('',Validators.required),
    nvcharPassword: new FormControl('',Validators.required),
    nvcharEmail: new FormControl('',Validators.required),
    nvcharRole: new FormControl('',Validators.required)
      });

  constructor(private registrationservice:RegistrationClass,private router:Router,private toastr:ToastrService) {

    this.registrationservice.getAllUser().subscribe((data)=> this.user=data);
   }


  AddUser(userdata:User){
  //    console.log(us);
  //  var us=this.reactForm.value;
  //   if(us==""){
  //     document.getElementById("username").innerHTML="please fill form"
  //     return false;
  //   }
      this.registrationservice.UserRegister(userdata).subscribe(
        ()=>{
      
            this.toastr.success('Registration Successfully!', ' ',{positionClass: 'toast-bottom-right'});
            this.router.navigate(['/login']);
          }
      )
      
  }

  ngOnInit() {
    
  }
  onSubmit(){
    console.log(this.reactForm.value)
    this.reactForm.reset();
  }

}
