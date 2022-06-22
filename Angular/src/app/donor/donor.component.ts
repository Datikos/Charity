import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CharityFactoryService } from '../services/charity-factory.service';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {

  constructor(
    private web3Service: Web3Service,
    private charityFactoryService:CharityFactoryService,
    private cdr: ChangeDetectorRef) { }
  public factoryABI:any= [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "ProjectSubmittionFailed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract Charity",
          "name": "charity",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "CharityCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Fallback",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "ProjectSubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Received",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback",
      "payable": true
    },
    {
      "inputs": [],
      "name": "totalDonors",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "registerDonor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "donorAddress",
          "type": "address"
        }
      ],
      "name": "getDonor",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "donorAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "totalDonationAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "donationCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct CharityFactory.Donor",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "beneficiaryName",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "beneficiaryAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "imageUrl",
          "type": "string"
        }
      ],
      "name": "createCharity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "charitiesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "limit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offset",
          "type": "uint256"
        }
      ],
      "name": "getCharities",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "beneficiaryName",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "beneficiaryAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "imageUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            }
          ],
          "internalType": "struct CharityFactory.ReturnCharity[]",
          "name": "coll",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "donorAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "donationAmount",
          "type": "uint256"
        }
      ],
      "name": "setDonationInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "setCharityFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "contractAddr",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "_beneficiaryAddress",
          "type": "address"
        }
      ],
      "name": "setCharityBeneficiaryAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_codeHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_authorName",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_sendHashTo",
          "type": "address"
        }
      ],
      "name": "projectSubmitted",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  public donorResult:any={};
  public donorName:string="";
  private currentAccount:string="";
  ngOnInit(): void {
    this.web3Service.currentAccount.subscribe((acc:string)=>{
      this.currentAccount=acc;
      this.getDonor();
      this.cdr.detectChanges();
    })
  }

  async getDonor()
      {
        await this.charityFactoryService.getDonor(this.currentAccount)
        .then((result:any)=>{
          if(result){
            this.donorResult=result;
          }else{
            this.donorResult={};
          }
        });
      }

      async addDonor(){
        await this.charityFactoryService.registerDonor(this.donorName);
        this.donorName="";
  }
}
