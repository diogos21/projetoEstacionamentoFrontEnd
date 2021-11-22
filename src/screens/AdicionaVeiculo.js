import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withTheme, Caption, TextInput, FAB, HelperText, Checkbox, Snackbar } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AdicionaVeiculo({ navigation, theme }) {
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [cor, setCor] = useState('')
    const [ano, setAno] = useState(0)
    const [placa, setPlaca] = useState('')
    const [vaga, setVaga] = useState('')
    const [status, setStatus] = useState(true)
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

   async function salvaVeiculo() {
       const novosErros = validaErrosVeiculo()

       if (Object.keys(novosErros).length > 0) {

           setErros(novosErros)
       } else {

           setErros({})
           let statusVeiculo = (status === true || status === 'ativo') ? 'ativo' : 'inativo'
           let anoVeiculo = parseInt(ano)
           let veiculo = {marca: marca, modelo: modelo, ano: anoVeiculo, cor: cor, placa: placa, vaga: vaga, status: statusVeiculo}
           setSalvandoVeiculo(true)
           let url = `${BACKEND}/veiculos`
           await fetch(url, {
               mode: 'cors',
               method: 'POST',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(veiculo)
           }).then(response => response.json())
           .then(data => {
               (data.message || data._id) ? setAviso('Veiculo incluído com sucesso!') : setAviso('')
               setMarca('')
               setModelo('')
               setAno(0)
               setCor('')
               setPlaca('')
               setVaga('')
               setStatus(true)
           })
           .catch(function (error) {
               setAviso('Não foi possível salvar o veiculo '+error.message)
           })
       }
       setSalvandoVeiculo(false)
   }

    return (
        <View style={{flex:1, paddingVertical: 0, paddingHorizontal:0}}>
        <Header titulo="Cadastro de Veiculos"
        voltar={true} navigation={navigation} />
        <View style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 16,
        paddingVertical: 4 }}>  
            <Caption style={styles.titulo}>Inclusão de Veiculos</Caption>
            <TextInput
                label="Marca do Veiculo"
                mode="outlined"
                name="marca"
                value={marca}
                onChangeText={setMarca}
                error={!!erros.marca}
            />
            <TextInput
                label="Modelo do Veiculo"
                mode="outlined"
                name="modelo"
                value={modelo}
                onChangeText={setModelo}
                error={!!erros.modelo}
            />
            <TextInput
                label="Ano do Veiculo"
                mode="outlined"
                name="ano"
                value={ano == 0 ? undefined : ano}
                onChangeText={setAno}
                error={!!erros.ano}
            />
            <TextInput
                label="Cor"
                mode="outlined"
                name="cor"
                value={cor}
                onChangeText={setCor}
                error={!!erros.cor}
            />
            <TextInput
                label="Placa do Veiculo"
                mode="outlined"
                name="placa"
                value={placa}
                onChangeText={setPlaca}
                error={!!erros.placa}
            />
            <TextInput
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
             onPress={() => salvaVeiculo()}
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

    }
})

export default withTheme(AdicionaVeiculo)