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
  }

  refreshData(){
    this.service.getOccupationList().subscribe(data=>{
      this.OccupationList=data;
    })

    this.service.getRatingList().subscribe(data=>{
      this.RatingList=data;
    })
  }

 

  onSubmit(){
    this.premiumAmount=20000;
    var occupation = this.OccupationList.find(m=>m.id==this.premium.value.occupation);
    var rating = this.RatingList.find(m=>m.id==occupation.ratingId);
    this.premiumAmount = (this.premium.value.sumAssured*rating.factor * this.premium.value.age)/1000*12
  }

}
