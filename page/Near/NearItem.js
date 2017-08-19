/**
 * Created by Administrator on 2017/7/7 0007.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';


export default class NearItem extends Component {
    /**
     * 定义默认的值
     * @type {{rowData: null}}
     */
    static  defaultProps={
        rowData:null,
    }
    /***界面的渲染*/
    render(){
        var rowData=this.props.rowData;

        if(rowData==null)
            return <View/>
        console.log('rowData='+rowData.toString());

        return(
            <View style={styles.viewStyle}>
                {/*左边的View*/}
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                    <Image source={{uri:rowData.icon}} style={styles.imageStyle}></Image>
                </View>
                {/*右边的View*/}
                <View  style={{flex:2,marginBottom:10,marginTop:10}}>

                    {/*上*/}
                    <View style={styles.view1Style} >
                        <View style={{flexDirection:'row',maxWidth:110,alignItems:'center'}}>
                            <Text numberOfLines={1}>{rowData.storeName}</Text>
                            {/*渲染标签*/}
                            {this.renderTag(rowData.tagIcons)}
                        </View>
                        <View>
                            <Text>{rowData.distance}</Text>
                        </View>
                    </View>
                    {/*中*/}
                    <View style={styles.view2Style}>
                        <Image style={{height:12,width:60,resizeMode:'contain',marginRight:10}}
                               source={{uri:rowData.starIcon}}></Image>
                        <Text style={styles.textStyle}>人均价：￥{rowData.price}</Text>
                    </View>
                    {/*下*/}
                    <View style={styles.view3Style}>
                        <Text numberOfLines={1} style={styles.textStyle}>{rowData.descrption}</Text>
                    </View>
                </View>
            </View>
        )
    }
    /**** 渲染标签*/
    renderTag(tagIcons){
        if(tagIcons.length<=0)
            return;
        //定义一个标签数组
        var Tags=[];
        for(var i=0;i<tagIcons.length;i++){
            var iconUrl=tagIcons[i];
            Tags.push(
                <Image key={i} style={{width:13,height:13,resizeMode:'contain',marginRight:3}} source={{uri:iconUrl}}></Image>
            )
        }
        return Tags;
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        height:100,
        backgroundColor:'#F5FCFF',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#dddddd'
    },
    imageStyle:{
        height:85,
        width:85
    },
    view1Style:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    view2Style:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    view3Style:{
        flex:1,
        justifyContent:'center'
    },
    textStyle:{
        fontSize:12,
        color:'#cdcdcd'
    }
})
