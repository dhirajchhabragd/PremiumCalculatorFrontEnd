import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-premium-calulator',
  templateUrl: './premium-calulator.component.html',
  styleUrls: ['./premium-calulator.component.css']
})
export class PremiumCalulatorComponent implements OnInit {
  premium:FormGroup
  premiumAmount:any;
  date:any;
  
  OccupationList:any[];
  RatingList:any[];
  constructor(private service:SharedService) { }
  


  ngOnInit(): void {
    this.premium=new FormGroup({
      'name':new FormControl('',Validators.required),
      'age':new FormControl('',Validators.required),
      'dob':new FormControl('',Validators.required),
      'sumAssured':new FormControl('',Validators.required),
      'occupation':new FormControl('',Validators.required)
    })
    this.refreshData();

    this.date= new Date(new Date().setFullYear(new Date().getFullYear()-1));
  }

  refreshData(){
    this.service.getOccupationList().subscribe(data=>{
      this.OccupationList=data;
    })

    this.service.getRatingList().subscribe(data=>{
      this.RatingList=data;
    })
  }

 
  DobChange(){
    var diff =(new Date().getTime() - new Date(this.premium.value.dob).getTime()) / 1000;
   diff /= (60 * 60 * 24);
    var age = Math.abs(Math.round(diff/365.25))
    this.premium.patchValue({
      age:age
    })
  }
  onSubmit(){
    this.calculatePremium();
  }

  onOccupationChange(){
    if(this.premium.valid && this.premiumAmount!=undefined)
    this.calculatePremium()
  }

  calculatePremium(){
    var occupation = this.OccupationList.find(m=>m.id==this.premium.value.occupation);
    var rating = this.RatingList.find(m=>m.id==occupation.ratingId);
    this.premiumAmount = (this.premium.value.sumAssured*rating.factor * this.premium.value.age)/1000*12
  }

}
