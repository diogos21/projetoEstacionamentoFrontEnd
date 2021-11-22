import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { withTheme, Caption, TextInput, FAB, HelperText, Checkbox, Snackbar } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AlteraVeiculo({ navigation, theme, route }) {
    //Obtendo os dados passados via parâmetro
    const veiculoAlterado = route.params.veiculo
     //Atribuindo os valores nos campos a partir do valor passado
    const [id, setId] = useState(veiculoAlterado._id)
    const [marca, setMarca] = useState(veiculoAlterado.marca)
    const [modelo, setModelo] = useState(veiculoAlterado.modelo)
    const [cor, setCor] = useState(veiculoAlterado.cor)
    const [ano, setAno] = useState(veiculoAlterado.ano)
    const [placa, setPlaca] = useState(veiculoAlterado.placa)
    const [vaga, setVaga] = useState(veiculoAlterado.vaga)
    const [status, setStatus] = useState((veiculoAlterado.status === 'ativo') ? true : false)
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')
    const [salvandoVeiculo, setSalvandoVeiculo] = useState(false)

    const { colors } = theme

   const validaErrosVeiculo = () => {
       const novosErros = {}
       //Validação do nome
       if (!marca || marca ==='') novosErros.marca = 'O nome não pode ser vazio!'
       else if (marca.length > 30) novosErros.marca = 'O nome informado é muito longo!'
       else if (marca.length < 3) novosErros.marca = 'O nome informado é muito curto!'
       
       return novosErros
   }

   async function salvaVeiculoAlterado() {
       const novosErros = validaErrosVeiculo()
       //Existe algum erro no objet?
       if (Object.keys(novosErros).length > 0) {
           //Sim, temos erros
           setErros(novosErros)
       } else {
           //Iremos salvar os dados alterados...
           setErros({})
           let statusVeiculo = (status === true || status === 'ativo') ? 'ativo' : 'inativo'
           let anoVeiculo = parseInt(ano)
           let veiculo = {_id: id, marca: marca, modelo: modelo, ano: anoVeiculo, cor: cor, placa: placa, vaga: vaga, status: statusVeiculo}
           setSalvandoVeiculo(true)
           let url = `${BACKEND}/veiculos`
           await fetch(url, {
               mode: 'cors',
               method: 'PUT',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(veiculo)
           }).then(response => response.json())
           .then(data => {
               (data.message || data._id) ? setAviso('Veiculo alterado com sucesso!') : setAviso('')
               
               setStatus(true)
           })
           .catch(function (error) {
               setAviso('Não foi possível salvar o veiculo alterado '+error.message)
           })
       }
       setSalvandoVeiculo(false)
   }

    return (
        <View style={{flex:1, paddingVertical: 0}}>
        <Header titulo="Cadastro de Veiculos"
        voltar={true} navigation={navigation} />
        <View style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 16,
        paddingVertical: 4 }}>  
            <Caption style={styles.titulo}>Alteração dos Veiculos</Caption>
            <TextInput style={styles.input}
                label="Marca do Veiculo"
                mode="outlined"
                name="marca"
                value={marca}
                onChangeText={setMarca}
                error={!!erros.marca}
            />
            <TextInput style={styles.input}
                label="Modelo do Veiculo"
                mode="outlined"
                name="modelo"
                value={modelo}
                onChangeText={setModelo}
                error={!!erros.modelo}
            />
            <TextInput style={styles.input}
                label="Ano do Veiculo"
                mode="outlined"
                name="ano"
                value={ano == 0 ? undefined : ano}
                onChangeText={setAno}
                error={!!erros.ano}
            />
            <TextInput style={styles.input}
                label="Cor"
                mode="outlined"
                name="cor"
                value={cor}
                onChangeText={setCor}
                error={!!erros.cor}
            />
            <TextInput style={styles.input}
                label="Placa do Veiculo"
                mode="outlined"
                name="placa"
                value={placa}
                onChangeText={setPlaca}
                error={!!erros.placa}
            />
            <TextInput style={styles.input}
                label="Vaga"
                mode="outlined"
                name="vaga"
                value={vaga}
                onChangeText={setVaga}
                error={!!erros.vaga}
            />
            <HelperText type="error" visible={!!erros.nome}>
                {erros.nome}
            </HelperText>
            <View style={styles.checkbox}>
                <Checkbox
                    status={status ? 'checked' : 'unchecked'}
                    onPress={() => setStatus(!status)}
                />
                <Text style={{ color: colors.text, marginTop: 8 }}>Ativa?</Text>
            </View>
        </View>
        <FAB style={styles.fab}
             icon='content-save'
             loading={salvandoVeiculo}
             disabled={erros.length>0}
             onPress={() => salvaVeiculoAlterado()}
             />
        <Snackbar
            visible={aviso.length > 0}
            onDismiss={()=> setAviso('')}
            action={{
                label: 'Voltar',
                onPress: () => navigation.goBack()
            }}>
                <Text>{aviso}</Text>
            </Snackbar>
        </View>
    )
}

const styles  = StyleSheet.create({
    checkbox: {
        flexDirection: 'row'
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    },
    titulo: {
        fontSize: 20,
        marginBottom: 16,
        marginTop: 16

    },
    input: {
        marginBottom: 15
    }
})

export default withTheme(AlteraVeiculo)