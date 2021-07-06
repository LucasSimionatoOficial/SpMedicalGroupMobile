import React, {Component} from 'react'
import {Text, TextInput, View, Pressable, StyleSheet} from 'react-native'
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            senha : '',
            loading : false,
            erro: ''
        }
    }
    
    login =  () => {
        this.setState({loading : true})
        api.post('/login', {
            email : this.state.email,
            senha : this.state.senha
        })
        .then(async response => {
            if(response.status === 200){
                await AsyncStorage.setItem('jwt_key', response.data.token)
                this.setState({
                    email : '',
                    senha : '',
                    loading : false,
                    erro : ''
                })
                this.props.navigation.navigate('ListarConsultas')
            } else {
                this.setState({
                    erro : 'sem conexao, tente novamente',
                    loading : false
                })
            }
        })
        .catch(error => {
            this.setState({loading : false})
        })
    }

    render(){
        return (
            <View style={style.backgroundColor}>
                <View style={style.area}>
                    <TextInput 
                        placeholder="email"
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        style={style.Input}
                    />
                    <TextInput 
                        placeholder="senha"
                        value={this.state.senha}
                        onChangeText={senha => this.setState({senha})}
                        style={style.Input}
                    />
                    {this.state.loading ?
                    <Pressable style={style.Pressable}><Text>Entrando</Text></Pressable> :
                    <Pressable
                        onPress={this.login}
                        style={style.Pressable}
                    ><Text style={style.textPressable}>Entrar</Text></Pressable>
                    }
                    <Text>{this.state.erro}</Text>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    Pressable : {
        color: 'black',
        backgroundColor: 'blue',
        width: '60%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPressable : {
        fontSize: '22px'
    },
    Input : {
        borderBottomWidth: '1px',
        marginBottom: '10px',
        width: '100%',
        heigth: '20%',
        marginBottom: '7.5%',
        fontSize: '20px'
    },
    area : {
        width: '60%',
        heigth: '20%',
        alignItems: 'center',
        marginTop: '40%'
    },
    backgroundColor : {
        backgroundColor: 'cyan',
        flex: 1,
        alignItems: 'center'
    }
})