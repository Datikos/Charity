import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CharityFactoryService } from '../services/charity-factory.service';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private web3Service: Web3Service,
    private charityFactoryService:CharityFactoryService,
    private cdr: ChangeDetectorRef) {
    }

    public currentAccount:string="";
    public contractAddress:string="";
    public charities:any[]=[];

  async ngOnInit(): Promise<void> {
    this.contractAddress=this.web3Service.getContractAddress();
    this.charityFactoryService.InitService();
    this.getCharities();
    this.web3Service.currentAccount.subscribe((acc:string)=>{
      this.currentAccount=acc;
      this.cdr.detectChanges();

    })
  }

  getCharities()
      {
        this.charityFactoryService.getCharities(20,0).then(result=>{
          this.charities=result;
        });
      }



}
