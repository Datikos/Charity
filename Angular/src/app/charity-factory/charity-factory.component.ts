import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { RegisterCharityModel } from '../models/register-charity.model';
import { CharityFactoryService } from '../services/charity-factory.service';

@Component({
  selector: 'app-charity-factory',
  templateUrl: './charity-factory.component.html',
  styleUrls: ['./charity-factory.component.scss']
})
export class CharityFactoryComponent implements OnInit {

  constructor(
    private web3Service: Web3Service,
    private charityFactoryService:CharityFactoryService,
    private router:Router)
  {
    this.registerCharity=new RegisterCharityModel();
  }

  public registerCharity:RegisterCharityModel;
  public balance:string="0";
  public totalDonors:number=0;

  ngOnInit(): void {
      this.charityFactoryService.InitService();
      this.getBalance();
  }

  addCharity()
  {
    this.charityFactoryService.addCharity(this.registerCharity)
    .then(result=>{
      this.router.navigate(['home'])
    });
    this.router.navigate(['home']);
  }
  async getBalance()
  {
    this.charityFactoryService.getBalance().then(result=>{
      this.balance=this.web3Service.web3.utils.fromWei(result,"ether")
    });
    this.totalDonors=await this.charityFactoryService.getTotalDonors();
  }
}


