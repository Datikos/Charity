import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';


@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {

  constructor() { }
  private eth=(window as any).ethereum;
 private web3 = new Web3(this.eth);

  async ngOnInit(): Promise<void> {

   let t=await  this.web3.eth.getTransactionFromBlock(1,1);
   console.log("getTransactionFromBlock",t);

  this.web3.eth.getBlock(12433083).then(d=>{
    console.log("getBlock",d)
  d.transactions.forEach((item)=>{
    this.web3.eth.getTransaction(item)
    .then(data=>console.log("getTransaction",item,data));
  })

  });

  }

}
