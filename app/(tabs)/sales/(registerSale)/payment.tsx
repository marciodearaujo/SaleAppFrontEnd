import { postSale } from '@/backednAPIRequests/saleRequests'
import RefreshListsContext from '@/contexts/refreshListsContext'
import ShoppingCartContext, { Cart } from '@/contexts/shoppingCartContext'
import { router } from 'expo-router'
import { useContext, useState } from 'react'
import {Button, Text, TextInput, View} from 'react-native'
import { CheckBox } from 'react-native-elements'

export default function payment(){
    const {clientsCart,selectedClient,setSelectedClient,setClientsCart}= useContext(ShoppingCartContext)
    const {refreshProductListNow,} = useContext(RefreshListsContext)
    const [paymentForm, setpaymentForm]= useState("à vista")
    const [portionNumber, setPortionNumber]= useState(0)
    const [portioPayDayLimit, setPortionPayDaylimit]= useState(1)

    let totalValue=0
    let selectedClientCart:Cart
    if(selectedClient){
        selectedClientCart=clientsCart.filter(cart=>cart.client.id===selectedClient.id)[0]
        totalValue=selectedClientCart.products.reduce((value,product)=>value+product.amount*product.price,0)
    }

    async function save(){
      if(selectedClient && selectedClient.id){
        await postSale(selectedClient.id,selectedClientCart.products)
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
            <Text>Numero de parcelas:</Text>
            <TextInput onChangeText={(text)=>setPortionNumber(parseInt(text))}/>
            <Text>Dia de vencimento:</Text>
            <TextInput onChangeText={(text)=>setPortionPayDaylimit(parseInt(text))}/>
            </View>}
            </View>
            <Button title='concluir venda' onPress={()=>save}/>   
        </View>
    )

}



function refreshSaleListNow() {
    throw new Error('Function not implemented.')
}
        