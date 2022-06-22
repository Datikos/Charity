import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Web3 from 'web3';

interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

interface Window {
  ethereum?: MetaMaskEthereumProvider;
}

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class Web3Service {

  constructor(){
    console.log("Web3Service Created.")
  }
  private eth=(window as any).ethereum;
  web3 = new Web3(this.eth);

  private currentChain:string="";
  private isMetaMask:boolean=false;
  // private  NETWORKS = {
  //   1: "Ethereum Main Network",
  //   3: "Ropsten Test Network",
  //   4: "Rinkeby Test Network",
  //   5: "Goerli Test Network",
  //   42: "Kovan Test Network",
  // };

//   Hex	Decimal	Network
// 0x1	1	Ethereum Main Network (Mainnet)
// 0x3	3	Ropsten Test Network
// 0x4	4	Rinkeby Test Network
// 0x5	5	Goerli Test Network
// 0x2a	42	Kovan Test Network

  getCurrentChain():string{
    return this.currentChain;
  }
  public getWeb3():Web3{
    return this.web3;
  }
  // getNetworkName(){
  //  return this.NETWORKS[this.currentChain];
  // }

  getContractAddress():string{
    return "0xfBFe8d2E6bC8954591EA3C10D79373555abc683f";
  }
  // public subject = new Subject();
  public currentAccount = new BehaviorSubject<string>(this.eth?this.eth.selectedAddress:"");

  async InitService(){
        // this.subject.subscribe(value => console.log('Received new subject value: ' + value))
        // this.behaviourSubject.subscribe(value=>console.log('Received new behaviour subject value: ' + value))
        this.isMetaMask=this.eth.isMetaMask;
        console.log("Web3Service.eth.isConnected:",this.eth.isConnected());

        this.eth.on('chainChanged', (chainId:string) => {
          this.currentChain=chainId;
          window.location.reload();
        });

        this.eth.on('connect', (connectInfo: any) => {
          console.log("Web3Service.eth.connect",connectInfo);

        });
        this.eth.on('disconnect', (error: any) => {
          console.log("Web3Service.eth.disconnect",error);
        });


        let accounts:string[] = await this.eth.request({ method: 'eth_requestAccounts' });

        if(accounts && accounts.length>0){
          //this.currentAccount=accounts[0];
          this.currentAccount.next(accounts[0]);
        }

      this.eth.on('accountsChanged',
      (accs:string[]) => {
                      if(accs && accs.length>0){
                        //this.currentAccount=accs[0];
                        this.currentAccount.next(accs[0]);
                      }
                      });

      this.eth.on('message', (info: any) => {
        console.log("Web3Service.eth.message",info);

      });
    //ethereum.removeListener('accountsChanged', handleAccountsChanged);
    let subscription = this.web3.eth
    .subscribe('newBlockHeaders', (error, result)=>{
      if (!error) {
          console.log("Web3Service.newBlockHeaders",result);
          return;
      }
      console.error(error);
    })
    .on("connected", (subscriptionId:any)=>{
      console.log("Web3Service.connected",subscriptionId);
    })
    .on("data", (blockHeader:any)=>{
      console.log("Web3Service.data",blockHeader);
    })
    .on("changed", (data:any)=>{
      console.log("Web3Service.changed",data);
    })
    .on("error", (error:any)=>{
      console.log("Web3Service.error",error);
    });

    // unsubscribes the subscription
// subscription.unsubscribe(function(error:any, success:any){
//   if (success) {
//       console.log('Successfully unsubscribed!');
//   }
// });
  }
}
