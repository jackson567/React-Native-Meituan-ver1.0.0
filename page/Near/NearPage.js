/**
 * Created by Administrator on 2017/6/15 0015.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import  NearBar from '../../component/NearBar';
//引入react-native-scrollable-tab-view组件
var ScrollableTabView= require('../../react-native-scrollable-tab-view');

import  Food from './TabPage/Food';
import  Hotel from './TabPage/Hotel';
import  Play from './TabPage/Play';
import  All from './TabPage/All';
export default class NearPage extends Component {

    /***
     * 定义默认的变量
     * @type {{}}
     */
    static  defaultProps={
        url:'http://47.93.30.78:8080/MeiTuan/near',
    }

    /***
     * 添加状态机
     * @type {{}}
     */
    state={
        foodItem:{},
        hotelItem:{},
        playItem:{},
        allItem:{},
        responseJson:null,
    }

    /***
     * 界面的渲染
     * @returns {XML}
     */
    render(){
        //定义参数
        var option={
            leftName:'大地工业区',
            playHolder:'找附近吃喝玩乐',
        }
        //如果this.state.responseJson=null ,直接返回空的View
        if(this.state.responseJson==null)
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>正在加载中....</Text>
                </View>
            );
        return(
            <View style={styles.viewStyle}>
                <NearBar option={option}></NearBar>
                <ScrollableTabView
                    tabBarBackgroundColor='#F5FCFF'
                    tabBarActiveTextColor='#FF4645'
                    tabBarInactiveTextColor='gray'
                    tabBarUnderlineStyle={{backgroundColor:'#FF4645',height:1}}
                >
                    <Food tabLabel='享美食' itemBean={this.state.foodItem}></Food>
                    <Food tabLabel='住酒店' itemBean={this.state.hotelItem}></Food>
                    <Food tabLabel='爱玩' itemBean={this.state.playItem}></Food>
                    <Food tabLabel='全部' itemBean={this.state.allItem}></Food>

                </ScrollableTabView>
            </View>
        )
    }
    /**
     * 界面加载完毕后调用
     */
    componentDidMount() {
        //从网络上获取数据
        fetch(this.props.url)
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                this.setState({
                    foodItem:responseJson.foodItem,
                    hotelItem:responseJson.hotelItem,
                    playItem:responseJson.playItem,
                    allItem:responseJson.allItem,
                    responseJson:responseJson,
                })
            })
            .catch((e)=>{
                alert('error='+e.toString());
            })
    }

}


const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        backgroundColor:'#F5FCFF'
    }
})
