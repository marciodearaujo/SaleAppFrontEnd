import Client from "./Client";

export default interface SaleClient{
    id:number,
    saleDate:string,
    total:number,
    status:string
    clientId:number,
    client:Client
  }