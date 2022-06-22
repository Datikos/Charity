import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CharityFactoryService } from '../services/charity-factory.service';
import { CharityService } from '../services/charity.service';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss']
})
export class CharityComponent implements OnInit {
  public balance:string="0";
  public donationAmount:number=100000000;
  public donationMessage:string="";
  public newBeneficiaryAddress:string="";

  public name:string="";
  public description:string="";
  public beneficiaryName:string="";
  public totalDonationsCount:number=0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web3Service: Web3Service,
    private charityService: CharityService,
    private charityFactoryService:CharityFactoryService) { }


   displayedColumns: string[] = ['date', 'amount', 'message', 'donorAddress'];
   dataSource:any[] =[];

   daiAbi:any = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_beneficiaryName",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "_beneficiaryAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_charity_fee",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_imageUrl",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "available",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "required",
          "type": "uint256"
        }
      ],
      "name": "InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "UnknownError",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "DonationReceived",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "beneficiaryAddress",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "beneficiaryName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "description",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donationsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "f",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "imageUrl",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalDonations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_factoryAddress",
          "type": "address"
        }
      ],
      "name": "setFactoryAddres",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_beneficiaryAddress",
          "type": "address"
        }
      ],
      "name": "setBeneficiaryAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_message",
          "type": "string"
        }
      ],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "myDonationsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "myDonations",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "donorAddress",
              "type": "address"
            }
          ],
          "internalType": "struct Charity.Donation[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
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
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  charityContract:any;
  private currentContractAddress:string|null=null;
  async ngOnInit(): Promise<void> {
    this.balance="0";
     this.currentContractAddress = this.route.snapshot.paramMap.get('id');
    if(this.currentContractAddress){
      this.charityService.InitService(this.currentContractAddress);
      this.getMyDonations();
      this.charityFactoryService.InitService();
      await this.getInfo();
    }
  }

    donate(){
        this.charityService.donate(this.donationMessage, this.donationAmount);
    }

    async getInfo()
        {
          this.charityService.getBalance().then(result=>{
            this.balance=this.web3Service.web3.utils.fromWei(result,"ether");
          });
          this.name=await this.charityService.getName();
          this.description=await this.charityService.getDescription();
          this.beneficiaryName=await this.charityService.getBeneficiaryName();
          this.totalDonationsCount=await this.charityService.getDonationsCount();

        }
    getMyDonations()
          {
            this.charityService.getMyDonations()
            .then(result=>{
              this.dataSource=result.map(m=> {
                return {
                  date :new Date(m.date*1000),
                  amount:this.web3Service.web3.utils.fromWei(m.amount,"ether") ,
                  message:m.message,
                  donorAddress:m.donorAddress
                }
              });
            });
          }
    withdraw()
          {
            this.charityService.withdraw();
          }

          async chachgeBeneficiary()
          {
            if(this.currentContractAddress){
              await this.charityFactoryService.chachgeBeneficiary(this.currentContractAddress,this.newBeneficiaryAddress);
              this.newBeneficiaryAddress="";
            }
          }
}
