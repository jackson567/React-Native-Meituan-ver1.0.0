/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';

import  NearItem from '../NearItem';

var Dimensions=require('Dimensions');
var windowWidth=Dimensions.get('window').width;
var TextWidth=70;
var cls=4;
var TextMarginLeft=(windowWidth-TextWidth*cls)/(cls+1);

export default class Food extends Component {
    /***
     * 定义默认的变量，
     * 可接收上一个组件传递过来的数据
     */
    static defaultProps(){
        itemBean:{}
    }

    /**** 状态*/
    constructor(props){
        super(props);
        //1.创建数据源
        var ds=new ListView.DataSource({rowHasChanged:( (r1,r2)=>r1!==r2) } );
        this.state={
            dataSource:ds.cloneWithRows(this.props.itemBean.nearbeans),
            headerSelectPosition:0
        }
    }

    /*** 界面的渲染*/
    render(){
        //1.如果没有数据，直接返回
        if(this.props.itemBean.nearbeans==null){
              return <View></View>
        }
        //2.将数据复制给数据源,重新设计状态机中的dataSource
        // this.state={
        //     dataSource:this.state.dataSource.cloneWithRows(this.props.itemBean.nearbeans),
        //     headerSelectPosition:0
        // }
        //3.开始渲染界面
        return(
            <View style={styles.viewStyle}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={ (rowData)=> this.renderItem(rowData)}
                renderHeader={()=>this.renderItemHeader(this.props.itemBean.topLables)}
                >
                </ListView>
            </View>
        )
    }
    /**** 渲染每一个Item*/
    renderItem(rowData){
        return(
            <TouchableOpacity activeOpacity={0.9} onPress={ () =>this.onItemClick(rowData) }>
                 <NearItem rowData={rowData}></NearItem>
            </TouchableOpacity>
        )
    }
    /***处理点击事件*/
    onItemClick(rowData){
        alert(rowData.storeName);
    }

    renderItemHeader(topLables) {
        /***如果没有数据直接返回*/
        if (topLables == null)
            return;

        return (
            <View style={styles.headerViewStyle}>
                {this.headerItem(topLables)}
            </View>
        )
    }

    headerItem(topLables){
        //1.定义一个组件数组
        var topItem=[];
        for(var i=0;i<topLables.length;i++){
            var str=topLables[i];
            /*背景颜色*/
            var bgColor=this.state.headerSelectPosition==i?'#FF4346':'white';
            /*字体颜色*/
            var textColor=this.state.headerSelectPosition==i?'white':'gray';
            topItem.push(
                <Text key={i} style={[styles.headerTextStyle,{backgroundColor:bgColor,color:textColor}]}>{str}</Text>
            )
        }
        return topItem;
    }

}




const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        backgroundColor:'#F5FCFF'
    },
    headerViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap',
        height:70,
        backgroundColor:'#dddddd'
    },
    headerTextStyle:{
        width:TextWidth,
        height:20,
        marginLeft:TextMarginLeft,
        textAlign:'center',
        backgroundColor:'white',
        marginTop:10,
        borderRadius:10,
        fontSize:12,
        color:'gray'


    }
})
