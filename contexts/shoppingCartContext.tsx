import Client from '@/models/Client'
import Product from '@/models/Product'
import  {useState,createContext, ReactNode} from 'react'


interface ShoppingCartContextInterface{
   clientsCart:Cart[],
   setClientsCart:React.Dispatch<React.SetStateAction<Cart[]>>
   updateClientCart:(client:Client,product:Product)=>void,
   selectedClient:Client | null,
   setSelectedClient:React.Dispatch<React.SetStateAction<Client | null>>
   createSelectedClientCart:(client:Client)=>void
}

export interface Cart{
  client:Client,
  products:Product[]
}

type props = {
  children: ReactNode
}

const ShoppingCartContext=createContext<ShoppingCartContextInterface>({} as ShoppingCartContextInterface)

export function ShoppingCartProvider({children}:props){
    const [clientsCart,setClientsCart]=useState<Cart[]>([])
    const [selectedClient, setSelectedClient]= useState<Client | null>(null)
    
  function updateClientCart(client:Client,product:Product){
      setClientsCart(prev=>{
        if(prev.length!==0){// se o vetor de carrinhos não estiver vazio
          const clientIndex =prev.findIndex(cart=>cart.client.id===client.id)
          if(clientIndex!==-1){ // se encontrou o carrinho do cliente
            const productIndex=prev[clientIndex].products.findIndex(prod=>prod.id==product.id)//procura o produto no carrinho do cliente
            if(productIndex===-1){// se não encontrou o produto no carrinho do cliente
              prev[clientIndex].products.push(product)
              return [...prev]
            }else{// se encontrou o produto no carrinho do cliente
             const previewProduct=prev[clientIndex].products[productIndex]
             const listWhitOutCartClient=prev.filter(cart=>cart.client.id!==client.id)
             const cartClientWhitoutProduct= prev[clientIndex].products.filter(prod=>prod.id!==product.id)
             return [...listWhitOutCartClient,{
                     client,
                     products:[...cartClientWhitoutProduct,{
                      ...previewProduct,
                      amount: previewProduct.amount&&product.amount&&previewProduct.amount+product.amount
                     }]
             }]
            }
          }
          else // não encontrou o carrrinho do cliente
            return [...prev,{
              client,
              products:[product]
            }]
        }else // o vetor de carrinhos está vazio
          return [{
            client,
            products:[product]
          }]
      })
  }

  function createSelectedClientCart(client:Client){
    setSelectedClient(client)
    setClientsCart(prev=>{
      return [
        ...prev,
        {
        client,
        products:[]
        }
      ]
    })
  }
    
  return(
      <ShoppingCartContext.Provider value={{createSelectedClientCart,clientsCart,updateClientCart,selectedClient,setSelectedClient,setClientsCart}}>
        {children}
      </ShoppingCartContext.Provider>
    )
  }

  export default ShoppingCartContext;