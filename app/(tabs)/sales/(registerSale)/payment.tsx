import { postSale } from '@/backednAPIRequests/saleRequests'
import ListNumberInput from '@/components/ListNumberInput'
import RefreshListsContext from '@/contexts/refreshListsContext'
import ShoppingCartContext, { Cart } from '@/contexts/shoppingCartContext'
import { router } from 'expo-router'
import { useContext, useState } from 'react'
import {Button, Text, View} from 'react-native'
import { CheckBox } from 'react-native-elements'

export default function payment(){
    const {clientsCart,selectedClient,setSelectedClient,setClientsCart}= useContext(ShoppingCartContext)
    const {refreshProductListNow,refreshSaleListNow} = useContext(RefreshListsContext)
    const [paymentForm, setpaymentForm]= useState("à vista")
    const [portionsNumber, setPortionNumber]= useState(0)
    const [portionPayDayLimit, setPortionPayDaylimit]= useState(0)

    let totalValue=0
    let selectedClientCart:Cart
    if(selectedClient){
        selectedClientCart=clientsCart.filter(cart=>cart.client.id===selectedClient.id)[0]
        totalValue=selectedClientCart.products.reduce((value,product)=>value+product.amount*product.price,0)
    }

    async function save(){
      if(selectedClient && selectedClient.id){
        await postSale(selectedClient.id,portionsNumber,portionPayDayLimit,selectedClientCart.products)
        refreshSaleListNow()
        refreshProductListNow()
        setSelectedClient(null)
        setClientsCart([])
        router.navigate("/(tabs)/sales")
      }
    }
    
    

    return(
        <View>
            <Text>Valor total: {totalValue}</Text>
            <View>
                <Text>Forma de pagamento:</Text>
                <View>
                    <CheckBox
                        title='à vista'
                        checked={paymentForm==='à vista'?true:false}
                        onPress={()=>setpaymentForm("à vista")}
                    />
                    <CheckBox
                        title='parcelado'
                        checked={paymentForm==='parcelado'?true:false}
                        onPress={()=>setpaymentForm("parcelado")}
                    />
                </View>
            </View>
            <View>
            {paymentForm==="parcelado"&&
            <View>
            <Text>Número de parcelas:</Text>
            <ListNumberInput getNumber={setPortionNumber} MaxNumber={12} modalTitle='Selecione o número de parcelas' placeholder=''/>
            <Text>Dia de vencimento:</Text>
            <ListNumberInput getNumber={setPortionPayDaylimit} MaxNumber={10} modalTitle='Selecione o dia do vencimento' placeholder=''/>
            </View>}
            </View>
            {(portionsNumber!==0&&portionPayDayLimit!==0||paymentForm==="à vista")&&<Button title='concluir venda' onPress={()=>save()}/>}  
        </View>
    )

}



