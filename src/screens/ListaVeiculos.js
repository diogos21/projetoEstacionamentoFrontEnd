import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { Text, withTheme, List, Avatar, FAB, ActivityIndicator } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'
import ListaVeiculo from './ListaVeiculo'

function ListaVeiculos({ navigation, theme }) {
    const { colors } = theme
    const [veiculos, setVeiculos] = useState([])
    const [carregandoVeiculos, setCarregandoVeiculos] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        obterVeiculos()
    }, [])

    async function obterVeiculos() {
        
        setCarregandoVeiculos(true)
        //alert(BACKEND)
        let url = `${BACKEND}/veiculos`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setVeiculos(data)
                console.log(data)

            })
            .catch(function (error) {
                console.error('Erro ao obter veiculos! ' + error.message)
            })
        setCarregandoVeiculos(false)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        try {
            await obterVeiculos()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }, [refreshing])

    return (
        <>
            <Header titulo="Veiculos" voltar={true} navigation={navigation} />
            {carregandoVeiculos && <ActivityIndicator animating={true} size="large" color={colors.primary} />}
            <View>
                <List.Subheader>
                    <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
                </List.Subheader>
                
                {veiculos.length === 0 && !carregandoVeiculos
                    ? (
                        <View>
                            <Text style={{ fontSize: 20 }}>Ainda não há nenhum veiculo cadastrado</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            data={veiculos}
                            renderItem={({ item }) => (
                                <ListaVeiculo data={item} navigation={navigation} />
                            )}
                            keyExtractor={item => item._id.toString()}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            />}
                        />
                    )}
                <FAB
                    style={styles.fab}
                    icon='plus'
                    label=''
                    onPress={() => navigation.navigate('AdicionaVeiculo')}
                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab:{
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    }
})

export default withTheme(ListaVeiculos)