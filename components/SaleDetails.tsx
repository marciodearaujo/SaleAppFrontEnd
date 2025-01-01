import Item from "@/models/Item"
import PaymentPortion from "@/models/paymentPortion"
import Product from "@/models/Product"
import { color } from "@rneui/base"
import {View, Text, StyleSheet, FlatList } from "react-native"


interface props{
    value:number,
    saleDate:string,
    clientName:string,
    saleItems:Item[] | null,
    products:Product[]| null,
    paymentPortions:PaymentPortion[] | null,
}

export default function SaleDetails({value,saleDate,clientName,saleItems,products,paymentPortions}:props){
    return(
            <View style={styles.container}>
                <View style={styles.saleData} >
                    <Text style={styles.headerText}>Data: {new Date(saleDate).toLocaleDateString("pt-br")}</Text>
                    <Text style={styles.headerText}>Cliente: {clientName}</Text>
                    <Text style={styles.headerText}>Total: R$ {value}</Text>   
                </View>
                <View style={styles.listArea}>
                    {products&&saleItems&&
                    <View style={styles.lists}>
                      <Text style={{fontWeight:"bold", fontSize:20}}>{saleItems.length} {saleItems.length===1?"item":"itens"}</Text>
                      <FlatList style={styles.flatList}
                          data={saleItems}
                          renderItem={({item}) =>{
                            const product=products.filter((product)=>product.id===item.productId)[0]
                            return <View  key={item.id} style={styles.itens}>
                              <Text style={styles.itemText}>{product.description}</Text>
                              <Text style={styles.itemText}>{item.amount}</Text>
                          </View>}}
                      />
                  </View>}
                  {paymentPortions&&paymentPortions.length>0&&
                  <View style={styles.lists}>
                    <Text style={{fontWeight:"bold", fontSize:20}}>{paymentPortions.length} parcelas:</Text>
                      <FlatList style={styles.flatList}
                          data={paymentPortions}
                          renderItem={({item}) =>{
                            return <View  key={item.id} style={styles.itens}>
                                    <Text style={styles.itemText}>{new Date(item.paymentDateLimit).toLocaleDateString("pt-br")}</Text>
                                    <Text style={styles.itemText}>R$ {item.value.toFixed(2)}</Text>
                                    <Text style={item.status==="paid"?{...styles.itemText,color:"green"}:{...styles.itemText,color:"red"}}>{item.status=="paid"?"Quitada":"Em aberto"}</Text>
                                  </View>}}
                      />
                  </View>}
                  </View>
            </View>   
    )

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:"column",
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      fontSize:20,
      borderRadius:10,
      borderWidth:1,
      padding:5
    },
  flatList:{
      alignSelf:"flex-start",
      height:"50%",
      borderBlockColor: "black",
      borderRadius: 10,
      borderWidth:2
  },
  itemText: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    textInput:{
      borderWidth:1,
      width:"90%",
      margin:10,
      padding:10,
  },
  itens:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    width:"90%",
    margin:20,
    borderBottomWidth:1
  },
  icons:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf:'flex-end',
    width:"40%"
  },
  viewText:{
    width:"60%"
  },
  listArea:{
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    
  },
  saleData:{
    marginBottom:20,
    backgroundColor:"#1E90FF",
    color:"#fff",
    width:"100%",
    padding:10,
    borderRadius: 10
  },
  lists:{
    flex:1,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start"
  },
  headerText:{
    fontWeight:"bold",
    fontSize:20,
  }
  });