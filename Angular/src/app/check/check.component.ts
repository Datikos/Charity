import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  public checkResult:any="";
  public projectAddress:string="0x5222da98b2df16ffb98C2b7A77e5b9bA310947A8";

  constructor(private web3Service: Web3Service) { }

  currentContract:any;
  daiAbi:any=[{
		"inputs": [
			{
				"internalType": "address",
				"name": "_submission",
				"type": "address"
			}
		],
		"name": "getSubmissionByContractAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "authorName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "blockNum",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectReceiver.Project",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
  ];
  contractAddress:string="0xa9b18c8291e05C7cd9c3030979553cB9e6742b86";

  async ngOnInit(): Promise<void> {


    this.currentContract = new this.web3Service.web3.eth.Contract(this.daiAbi,this.contractAddress, { });

      this.web3Service.currentAccount.subscribe((acc:string)=>{
        this.currentContract.options.from=acc;
          this.currentContract.defaultAccount=acc;
      })

    }
    check()
        {
          this.currentContract.methods
          .getSubmissionByContractAddress(this.projectAddress)
          .call({},(error:any, result:any)=>{
            console.log('Result: ',error,result);
            this.checkResult=result;
          });
        }
}
