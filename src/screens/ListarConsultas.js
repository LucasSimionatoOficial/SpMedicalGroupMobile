import React, {Component} from 'react'
import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native'
import api from '../services/api.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {userData} from '../services/auth.js'

export default class ListarConsultas extends Component{
    constructor(props){
        super(props)
        this.state = {
            consultas : [],
            erro : ''
        }
    }

    renderItem = ({item}) => {
        return <View style={style.consulta}>
            <Text style={style.descricao}>{item.descricao === '' ? 'sem descricao' : item.descricao}</Text>
            <View style={style.flex}>
                <Text style={style.dados}>{item.dataConsulta}</Text>
                <Text style={style.dados}>{item.idSituacaoNavigation.situacao1}</Text>
            </View>
        </View>
    }

    async componentDidMount() {
        try{
            const token = await AsyncStorage.getItem('jwt_key')
            let role = await userData()
            let url = await role.role === '2' ? '/consultas/agendadas' : '/consultas'
            const response = await api.get(url, {
                headers : {
                    "Authorization" : "Bearer " + token
                }
            })
            if(response.status === 200){
                this.setState({consultas : response.data})
            }else{
                this.setState({erro : 'sem conexao'})
            }
        } catch (error){
        }
    }

    sair = () => {
        AsyncStorage.removeItem('jwt_key')
        this.props.navigation.navigate('Login')
    }
    
    render(){
        return(
            <View style={style.area}>
                <View style={style.header}>
                    <Text style={style.headerText}>SP Medical Group</Text>
                </View>
                     
                     
                    <View style={{flex: 6, alignItems: 'center',}}>
                        {this.state.consultas[0] === undefined ?
                        <Text style={style.descricao}>nenhuma consulta</Text> :
                        <FlatList 
                            style={{width: '80%'}}
                            renderItem = {this.renderItem} 
                            data={this.state.consultas} 
                            keyExtractor={item => item.idConsulta} />}
                    </View>
                    <Pressable onPress={this.sair} style={{flex: 1, alignItems: 'center'}}><Text>sair</Text></Pressable>
            </View>
        )
    }
}

const style = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText : {
        fontSize: '30px'
    },
    consulta : {
        width: '100%',
        padding: '10px',
        borderBottomColor: 'black',
        borderBottomWidth: '1px',
        marginBottom: '10px'
    },
    area : {
        width: '100%',
        height: '100%',
        backgroundColor: 'cyan'
    },
    flex : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    descricao : {
        fontSize: '22px'
    },
    dados : {
        fontSize: '18px'
    }
})