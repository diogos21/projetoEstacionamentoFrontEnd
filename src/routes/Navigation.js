import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from '../themes/ThemeProvider'

const Stack = createStackNavigator()

import Inicio from '../screens/Inicio'
import Configuracoes from '../screens/Configuracoes'
import ListaVeiculos from '../screens/ListaVeiculos'
import AdicionaVeiculo from '../screens/AdicionaVeiculo'
import AlteraVeiculo from '../screens/AlteraVeiculo'


export default function Navigation(){
    const { tema } = useContext(AppContext)
    return(
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName="Inicio" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Configuracoes" component={Configuracoes} /> 
                <Stack.Screen name="ListaVeiculos" component={ListaVeiculos}  />
                <Stack.Screen name="AdicionaVeiculo" component={AdicionaVeiculo}  /> 
                <Stack.Screen name="AlteraVeiculo" component={AlteraVeiculo}  />      
            </Stack.Navigator>
        </NavigationContainer>
    )
}