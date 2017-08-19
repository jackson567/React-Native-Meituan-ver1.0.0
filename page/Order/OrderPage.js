/**
 * Created by Administrator on 2017/6/15 0015.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import  OrderBar from '../../component/OrderBar';
//1.引入本地数据
var OrderPageBean =require('../../data/OrderPageBean.json');
import  OrderItemView from './OrderItemView';
import  DividingHomeLine from '../../component/DividingHomeLine';
import  DividingLine from '../../component/DividingLine';
import  OrderItemBar from './OrderItemBar';
import  NearItem from '../Near/NearItem';
var items=[
    {titleLeft:"我的订单",titleRight:"全部订单"},
    {titleLeft:"最近浏览",titleRight:"查看全部"}
]

export default class OrderPage extends Component {

    static  defaultProps={
        url:'http://47.93.30.78:8080/MeiTuan/order'
    }
    /**** 状态机 */
    constructor(props){
        super(props);
        this.state={
           orderPage:OrderPageBean,
           isRefreshing: false,
        }
        _this=this;
    }
    /***界面渲染*/
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#F5FCFF'}}>
                <OrderBar leftName='订单'></OrderBar>
                <ScrollView
                     refreshControl={
                          <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}

                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"

                            colors={['green']}
                            progressBackgroundColor="white"
                          />
                     }

                >
                    {/*渲染我的订单*/}
                    <OrderItemView option={items[0]}></OrderItemView>
                    <DividingHomeLine></DividingHomeLine>
                    {/*渲染四个icon*/}
                    <OrderItemBar orderbars={this.state.orderPage.orderbars}></OrderItemBar>
                    {/*最近订单*/}
                    <Text style={{height:20,backgroundColor:'#dddddd',
                            fontSize:11,paddingLeft:10,paddingTop:2}}>最近订单</Text>
                    {this.renderItems(this.state.orderPage.nearOrder)}

                    {/*渲染最近浏览*/}
                    <DividingLine></DividingLine>
                    <OrderItemView option={items[1]}></OrderItemView>
                    <DividingHomeLine></DividingHomeLine>
                    {this.renderItems(this.state.orderPage.nearBeans)}
                    <DividingLine></DividingLine>

                </ScrollView>
            </View>
        )
    }

    /**
     * 渲染Item
     * @param nearBeans
     * @returns {Array}
     */
    renderItems(nearBeans){
        var NearItems=[];
        for (var i=0;i<nearBeans.length;i++){
            var obj = nearBeans[i];
            NearItems.push(
               this.renderItem(obj,i)
            )
        }
        return NearItems;
    }

    renderItem(nearBean,i){
        return(
            <TouchableOpacity key={i} activeOpacity={0.9} onPress={()=>this.onClickItem(nearBean)}>
                <NearItem rowData={nearBean}></NearItem>
            </TouchableOpacity>
        )
    }

    /***处理点击事件*/
    onClickItem(nearBean){
        alert(nearBean.storeName);
    }

    onRefresh(){
        /***正在刷新*/
        _this.setState({
            isRefreshing: true
        });

        /**网络请求*/
        fetch(_this.props.url)
            .then( (response)=>response.json())
            .then((responseJson)=>{
                /***停止刷新*/
                _this.setState({
                    orderPage:responseJson,
                    isRefreshing: false
                })
            })
    }


}


const styles = StyleSheet.create({

})
