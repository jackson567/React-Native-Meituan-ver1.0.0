/**
 * Created by Administrator on 2017/7/6 0006.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


export default class OrderBar extends Component {

    /**定义默认属性*/
    static  defaultProps={
        orderbars:null,
    }
    /**
     * 渲染界面
     * @returns {XML}
     */
    render(){
        return(
            <View style={styles.viewStyle}>
                {/*icon  1*/}
                {this.renderBar(this.props.orderbars)}
            </View>
        )
    }
    /**渲染整个Bar*/
    renderBar(orderbars){
        var Icons=[];
        for (var i=0;i<orderbars.length;i++){
            Icons.push(
                this.renderIcon(orderbars[i],i)
            )
        }
        return Icons;
    }
    /**渲染每一个item**/
    renderIcon(icon,i){

        if(icon.hasMsg){
            return (
                <View key={i} style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <Image source={{uri:icon.icon}} style={{width:30,height:30}}></Image>
                        <Text style={{textAlign:'center',fontSize:12}}>{icon.title} </Text>
                    </View>

                    {/*点*/}
                    <Text style={styles.textCirleDot}>{icon.msgNumber}</Text>
                </View>
            )
        }else{
            return(
                <View key={i} style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <Image source={{uri:icon.icon}} style={{width:30,height:30}}></Image>
                        <Text style={{textAlign:'center',fontSize:12}}>{icon.title} </Text>
                    </View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        height:55,
        backgroundColor:'white',
        flexDirection:'row',
    },
    textCirleDot:{
        position:'absolute',
        top:4,
        right:20,

        width:12,
        height:12,
        backgroundColor:'red',
        borderRadius:8,
        fontSize:8,
        textAlign:'center',
        color:'white'
    }
})
