import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterCharityModel } from '../models/register-charity.model';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class CharityFactoryService {

  constructor(
    private web3Service: Web3Service,
    private _snackBar: MatSnackBar){}

    private isInitialized:boolean=false;
  private factoryContract:any;
  private factoryABI:any= [
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

  public InitService(){

    this.factoryContract = new this.web3Service.web3.eth.Contract(this.factoryABI,this.web3Service.getContractAddress(),
      {
        //from:this.web3Service.getCurrentAccount(), //local ganachee
        // gasPrice: '20000000000', // 20 gwei
        // gas:5000000
      });
    this.isInitialized=true;

    this.web3Service.currentAccount.subscribe((acc:string)=>{
            this.factoryContract.options.from=acc;
            this.factoryContract.defaultAccount=acc;

              });
  }

  public getBalance():Promise<string>
      {
        let promise = new Promise<string>((resolve, reject) => {
        this.factoryContract.methods
        .getBalance()
        .call({},(error:any, result:any)=>{
          if(error){
             reject(error);
          }else{
            resolve(result);
          }
        });
        });
        return promise;
      }

      public getCharities(take:number,offcet:number):Promise<any>
      {
        let promise = new Promise<any>((resolve, reject) => {
        this.factoryContract.methods
        .getCharities(take,offcet)
        .call({},(error:any, result:any)=>{
          console.log('Result: ',error,result);
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        });
      });
      return promise;
      }


      addCharity(model:RegisterCharityModel):Promise<void>{

        let promise = new Promise<void>((resolve, reject) => {
        this.factoryContract.methods.createCharity(
          model.Name,
          model.Description,
          model.BeneficiaryName,
          model.BeneficiaryAddress,
          model.ImageUrl)
        .send({},(error:any, result:any)=>{
          console.log('Result: ',error,result);
      })
      .on('error', (error:any, receipt:any)=>{
        console.log("err.message =",error.message);
        console.log("receipt =", receipt);
      })
      // .on('transactionHash', (transactionHash:string)=>{
      //     console.log("transactionHash:" + transactionHash)
      // })
      // .on('receipt', (receipt:any)=>{
      //   console.log("receipt: ", receipt)
      // })
      .on('confirmation', (confirmationNumber:any, receipt:any)=>{
        console.log("confirmation: "+ confirmationNumber );
        console.log("receipt: ", receipt);
        if(confirmationNumber==1){
          this._snackBar.open('Charity Added', 'Close', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
          });
        }

        resolve();
      })
      // .then((newContractInstance:any)=>{
      //     console.log("Then",newContractInstance);
      // })
      ;
    });
    return promise;
}

chachgeBeneficiary(contractAddress:string,beneficiaryAddress:string):Promise<void>
      {
        return new Promise<void>((resolve, reject) => {
          this.factoryContract.methods
          .setCharityBeneficiaryAddress(contractAddress,beneficiaryAddress)
          .send({},(error:any, result:any)=>{
            console.log('Result: ',error,result);
            if(error){
              reject(error);
            }
            else{
              resolve();
            }
          });
        });
      }


      projectSubmitted()
      {
        this.factoryContract.methods
        .projectSubmitted("496b79f1e87fb7419b56f1cb13d7bd7b0cd27d5450185aec781b893739602c33","David Sakhelashvili","0xa9b18c8291e05C7cd9c3030979553cB9e6742b86")
        .send({},(error:any, result:any)=>{
          console.log('Result: ',error,result);

        }).on('error', (error:any, receipt:any)=>{
          console.log("err.message =",error.message);
          console.log("receipt =", receipt);
        })
        .on('transactionHash', (transactionHash:string)=>{
            console.log("transactionHash:" + transactionHash)
        })
        .on('receipt', (receipt:any)=>{
          console.log("receipt: ", receipt)
        })
        .on('confirmation', (confirmationNumber:any, receipt:any)=>{
          console.log("confirmation: "+ confirmationNumber );
          console.log("receipt: ", receipt);
        })
        .then((newContractInstance:any)=>{
            console.log("Then",newContractInstance);
        });
      }
      public getTotalDonors():Promise<number>
      {
        let promise = new Promise<number>((resolve, reject) => {
        this.factoryContract.methods
        .totalDonors()
        .call({},(error:any, result:number)=>{
          if(error){
             reject(error);
          }else{
            resolve(result);
          }
        });
        });
        return promise;
      }

      public getDonor(address:string):Promise<any>
      {
        let promise = new Promise<any>((resolve, reject) => {
        this.factoryContract.methods
        .getDonor(address)
        .call({},(error:any, result:any)=>{
          if(error){
             reject(error);
          }else{
            resolve(result);
          }
        });
        });
        return promise;
      }

      public registerDonor(name:string):Promise<void>
      {
        return new Promise<void>((resolve, reject) => {
          this.factoryContract.methods
          .registerDonor(name)
          .send({},(error:any, result:any)=>{
            console.log('Result: ',error,result);
            if(error){
              reject(error);
            }
            else{
              resolve();
            }
          });
        });
      }
}
