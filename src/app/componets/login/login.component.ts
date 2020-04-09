import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Login} from '../../shared/productHelper/login.service';
import {submitDetailsCall} from '../../shared/productHelper/productHelper';
import { from, BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import {User} from '../../Models/User.model'
import {RegistrationClass} from '../../shared/Registration.service';
import {AuthService} from '../../shared/AuthService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private loggedIn = new BehaviorSubject<boolean>(false);
 
user:User[];
isCreatePassword:boolean;
isForgotPassword: boolean;
isUpdatePassword:boolean;
model : any={};
tempUser:User[];
tempUpdatePassword:string;
reactForm =new FormGroup({
  nvcharUserName: new FormControl('',Validators.required),
  nvcharPassword: new FormControl('')
  })
  constructor(private router:Router,
               private registrationservice:RegistrationClass,
               private authservice:AuthService,
               private login:Login,
               private toastr:ToastrService ) {
  


  }
  onSubmit(user){
  // var us=this.reactForm.controls["nvcharUserName"].value;
  //  if(us==""){
  //    document.getElementById("username").innerHTML="please fill User Name"
     
  //    return false;
  //  }
  // console.log(us);
    this.login.LoginAuth(this.reactForm.controls["nvcharUserName"].value,this.reactForm.controls["nvcharPassword"].value).subscribe((user)=>{
       if(user.length>=1)
       {
        this.router.navigate(['/quotation'])
        this.toastr.success('Login Successfull!', ' ',{positionClass: 'toast-bottom-right'});
        window.localStorage.setItem("isLogin","true");
        window.localStorage.setItem("intUser_id",""+user[0].intUser_id);
       }
       else{
        this.toastr.error('Username & Password incorrect!', ' ',{positionClass: 'toast-bottom-right'});
        window.localStorage.setItem("isLogin","false");
       }
       
    });
    this.reactForm.reset();
}

resetPassword(user){
  this.login.ResetPassword(this.reactForm.controls["nvcharUserName"].value).subscribe((user)=>{
    if(user.length>=1)
    {
      this.tempUser=user;
     this.toastr.success('Username  Available!', ' ',{positionClass: 'toast-bottom-right'});
    this.isCreatePassword=true
    }
    else{
     this.toastr.error('Username Not Available !', ' ',{positionClass: 'toast-bottom-right'});
  
    }
    this.reactForm.reset();
 });
}
  
changePassword(){
  if(this.tempUser.length>=1 && this.tempUpdatePassword!="")
  {
    this.tempUser[0].nvcharPassword=this.tempUpdatePassword;
this.login.updatePassword(this.tempUser[0]).subscribe((user)=>{
  console.log(user);
  this.isCreatePassword=false
  this.isForgotPassword=false
  this.router.navigate(['/login']);
  this.toastr.success('Password Create successfully!', ' ',{positionClass: 'toast-bottom-right'});
  

})
this.reactForm.reset(); 
  
  }
}
  ngOnInit() {
   if(this.authservice.isAuthenticated()){
      this.router.navigate(['/quotation'])

    }
  }
  setTempPassword(tempPassword)
  {
    console.log(tempPassword);
     this.tempUpdatePassword=tempPassword;
  }
  backToLogin(){
    this.isCreatePassword=false
    this.isForgotPassword=false
    this.reactForm.reset();
  }
}
