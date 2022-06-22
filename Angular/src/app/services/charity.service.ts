import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class CharityService {
  private charityContract:any;
  private daiAbi:any = [
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

  constructor(
    private web3Service: Web3Service,
    private _snackBar: MatSnackBar){}



    public InitService(contractAddress:string){
      this.charityContract = new this.web3Service.web3.eth.Contract(this.daiAbi,contractAddress,
        {
         // from:this.web3Service.getCurrentAccount(),
          // gasPrice: '20000000000', // 20 gwei
          // gas:5000000
        });

        this.web3Service.currentAccount.subscribe((acc:string)=>{
          this.charityContract.options.from=acc;
          this.charityContract.defaultAccount=acc;

            });
    }
    public getBalance():Promise<string>
      {
        return new Promise<string>((resolve, reject) => {
        this.charityContract.methods
        .getBalance()
        .call({},(error:any, result:any)=>{
          if(error)
          {reject(error); }
          else{ resolve(result); } });
        });
      }




      public donate(message:string,amount:number){

        this.charityContract.methods
        .donate(message)
        .send({value:amount},
          (error:any, result:any)=>{
          console.log('Result: ',error,result);
          })
          .on('error', (error:any, receipt:any)=>{
            console.log("CharityService.error =",error);
            console.log("CharityService.receipt =", receipt);
          })
          // .on('transactionHash', (transactionHash:string)=>{
          //     console.log("CharityService.transactionHash:" + transactionHash)
          // })
          .on('receipt', (receipt:any)=>{
            console.log("CharityService.receipt: ", receipt)
          })
          .on('confirmation', (confirmationNumber:any, receipt:any)=>{
            console.log("CharityService.confirmation: "+ confirmationNumber );
            console.log("CharityService.receipt: ", receipt);
          })
          // .then((newContractInstance:any)=>{
          //     console.log("CharityService.Then",newContractInstance);
          // })
          ;
      }


      public getMyDonations():Promise<any[]>
            {
              return new Promise<any[]>((resolve, reject) => {
              this.charityContract.methods
              .myDonations()
              .call({},(error:any, result:any[])=>{
                console.log('Result: ',error,result);
                if(error){
                  reject(error);
                }else{
                  resolve(result);
                }

              });
            });
            }
      public withdraw()
            {
              this.charityContract.methods
              .withdraw()
              .send({},(error:any, result:string)=>{
                console.log('Result: ',error,result);
              })
              // .on('error', (error:any, receipt:any)=>{
              //   console.log("err.message =",error.message);
              //   console.log("receipt =", receipt);
              // })
              // .on('transactionHash', (transactionHash:string)=>{
              //     console.log("transactionHash:" + transactionHash)
              // })
              // .on('receipt', (receipt:any)=>{
              //   console.log("receipt: ", receipt)
              // })
              // .on('confirmation', (confirmationNumber:any, receipt:any)=>{
              //   console.log("confirmation: "+ confirmationNumber );
              //   console.log("receipt: ", receipt);
              // })
              // .then((newContractInstance:any)=>{
              //     console.log("Then",newContractInstance);
              // })
              ;
            }


      public getName():Promise<string>
      {
        return new Promise<string>((resolve, reject) => {
        this.charityContract.methods
        .name()
        .call({},(error:any, result:any)=>{
          if(error)
          {reject(error); }
          else{ resolve(result); } });
        });
      }
      public getDescription():Promise<string>
      {
        return new Promise<string>((resolve, reject) => {
        this.charityContract.methods
        .description()
        .call({},(error:any, result:any)=>{
          if(error)
          {reject(error); }
          else{ resolve(result); } });
        });
      }
      public getBeneficiaryName():Promise<string>
      {
        return new Promise<string>((resolve, reject) => {
        this.charityContract.methods
        .beneficiaryName()
        .call({},(error:any, result:any)=>{
          if(error)
          {reject(error); }
          else{ resolve(result); } });
        });
      }
      public getDonationsCount():Promise<number>
      {
        return new Promise<number>((resolve, reject) => {
        this.charityContract.methods
        .donationsCount()
        .call({},(error:any, result:number)=>{
          if(error)
          {reject(error); }
          else{ resolve(result); } });
        });
      }
  }
