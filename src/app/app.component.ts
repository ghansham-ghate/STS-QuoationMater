import { Component, NgZone } from '@angular/core';
import { AuthService } from './shared/AuthService.service';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workdome';
  private loggedIn = new BehaviorSubject<boolean>(false);
  showHead: boolean = false;
  StripHide:boolean=false;
  constructor(private router: Router,private authService:AuthService) {

      router.events.forEach((event) => {
        console.log("Inside router events")

          if (!this.authService.isAuthenticated()) {
            this.showHead = true;
            
          } else {
            this.showHead = false;
          }
        
      });


    //   var element = document.getElementsByClassName("navbar-nav")[0];
    //   element.addEventListener("click", myFunction);
    //  function  myFunction(e) {
    //       var elems = document.querySelector("active");
    //       if(elems !=null) {
    //         elems.classList.add("active");
    //       }
    //       e.target.className = "active";
    //       console.log(e.target.className)
    //     }
      
    }
    ngOnChanges(){
      if (!this.authService.isAuthenticated()) {
        this.showHead = true;
        
      } else {
        this.showHead = false;
      }
    }
    ngAfterViewInit() {
      if (!this.authService.isAuthenticated()) {
        this.showHead = true;
        
      } else {
        this.showHead = false;
      }
      console.log("RouterUrl",);
  }
    logout() {                            
      this.authService.logout();
      this.router.navigate(['/login']);
      this.StripHide=true;
      }
     
}
