import React from 'react';
import {
	View,
    StyleSheet
} from 'react-native'
import {Text, Input} from 'react-native-elements';
import COLORS from '@constants/colors';
import GlobalStyle from '@styles/global';
import axios from 'axios';
import AlertHelper from '@components/Alert/AlertHelper';

import Uf from '@components/DropDowns/Uf';
import City from '@components/DropDowns/City';

export default function CreditCardHolder (props) {
    const [loading, setLoading] = React.useState(false);
    const formik = props.formik;
    const values = formik.values;

    const maskCEP = (text) => {
      let x = text.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
      let retorno = x[1] + '-' + x[2];
  
      return retorno;
    }

    const maskPhone = (text) => {
      let x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      let retorno = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  
      return retorno;
    }

    const maskCPF = (text) => {
      return text
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const maskDate = (text) => {
        return text
          .replace(/\D/g, '') // substitui qualquer caracter que não seja número por nada
          .replace(/(\d{2})(\d)/, '$1/$2') // captura 2 grupos de número: os dois primeiros dígitos (dia) e o terceiro dígito (primeiro dígito do mês), e adiciona uma barra entre eles
          .replace(/(\d{2})(\d)/, '$1/$2') // captura 2 grupos de número: os dois primeiros dígitos (mês) e o terceiro e quarto dígitos (ano), e adiciona uma barra entre eles
          .replace(/(\d{4})\d+?$/, '$1') // captura os 4 dígitos do ano e não permite digitar mais nada
      }

    const fetchData = async (cep) => {
      setLoading(true);
      try {
        const response = await axios.get('https://viacep.com.br/ws/' + cep + '/json/');
  
        if ( response.status != 200 || response.data.erro ) {
  
          formik.setFieldValue('billing_address.state', '');
          formik.setFieldValue('billing_address.city', '');
          //formik.setFieldValue('billing_address.address', '');
          //formik.setFieldValue('billing_address.neighborhood', '');
  
          AlertHelper.show(
              'error',
              'Erro de CEP',
              'O cep parece ser inválido',
          );
  
        } else {
  
          formik.setFieldValue('billing_address.state', response.data.uf);
          formik.setFieldValue('billing_address.city', response.data.localidade);
          formik.setFieldValue('billing_address.address', response.data.logradouro);
          formik.setFieldValue('billing_address.neighborhood', response.data.bairro);
      
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  

    React.useEffect(() => {
  
      if ( values.billing_address.postal_code.length >= 9 ) {
          fetchData(values.billing_address.postal_code);
      }
    }, [values.billing_address.postal_code]);

    return(
        <View style={{flex: 1}}>

            <View>
                <Input
                    label="Nome"
                    onChangeText={formik.handleChange('credit_card_holder.name')}
                    onBlur={formik.handleBlur('credit_card_holder.name')}
                    value={formik.values.credit_card_holder.name}
                    errorMessage={formik.touched.credit_card_holder?.name && formik.errors.credit_card_holder?.name}
                    keyboardType="default"
                    autoCorrect={false}
                    placeholder='Digite o nome do titular'
                    placeholderTextColor={COLORS.quaternary}
                />
            </View>
            <View>
                <Input
                    label="E-mail"
                    onChangeText={formik.handleChange('credit_card_holder.email')}
                    onBlur={formik.handleBlur('credit_card_holder.email')}
                    value={formik.values.credit_card_holder.email}
                    errorMessage={formik.touched.credit_card_holder?.email && formik.errors.credit_card_holder?.email}
                    keyboardType="email-address"
                    autoCorrect={false}
                    placeholder='Digite o e-mail do titular'
                    placeholderTextColor={COLORS.quaternary}
                />
            </View>
            <View>
                <Input
                    label="Telefone"
                    onChangeText={(value) => {
                        const telefone_formatado = maskPhone(value);
                        formik.setFieldValue('credit_card_holder.phone', telefone_formatado)
                    }}
                    onBlur={formik.handleBlur('credit_card_holder.phone')}
                    value={formik.values.credit_card_holder?.phone}
                    errorMessage={formik.touched.credit_card_holder?.phone && formik.errors.credit_card_holder?.phone}
                    keyboardType="phone-pad"
                    autoCorrect={false}
                    autoCompleteType="tel"
                    placeholder="Digite o telefone do titular"
                    placeholderTextColor={COLORS.quaternary}
                />
            </View>
            <View>
                <Input
                    label="CPF"
                    onChangeText={(value) => {
                        const cpf_formatado = maskCPF(value);
                        formik.setFieldValue('credit_card_holder.cpf', cpf_formatado)
                    }}
                    onBlur={formik.handleBlur('credit_card_holder.cpf')}
                    value={formik.values.credit_card_holder?.cpf}
                    errorMessage={formik.touched.credit_card_holder?.cpf && formik.errors.credit_card_holder?.cpf}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    placeholder="Digite o CPF do titular"
                    placeholderTextColor={COLORS.quaternary}
                    maxLength={14}
                />
            </View>
            <View>
                <Input
                    label="Data de Nascimento"
                    onChangeText={(value) => {
                        const data_formatada = maskDate(value);
                        formik.setFieldValue('credit_card_holder.birth_date', data_formatada)
                    }}
                    onBlur={formik.handleBlur('credit_card_holder.birth_date')}
                    value={formik.values.credit_card_holder?.birth_date}
                    errorMessage={formik.touched.credit_card_holder?.birth_date && formik.errors.credit_card_holder?.birth_date}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    placeholder="Digite a data de nascimento do titular"
                    placeholderTextColor={COLORS.quaternary}
                    maxLength={10}
                />
            </View>

            <View style={GlobalStyle.spaceSmall} />
            <Text style={GlobalStyle.title2}>Endereço de Cobrança</Text>
            <View style={GlobalStyle.spaceSmall} />

            <Input
                label="CEP"
                onChangeText={(value) => {
                    const cep_formatado = maskCEP(value);
                    formik.setFieldValue('billing_address.postal_code', cep_formatado)
                }}
                onBlur={formik.handleBlur('billing_address.postal_code')}
                value={formik.values.billing_address.postal_code}
                errorMessage={formik.touched.billing_address?.postal_code && formik.errors.billing_address?.postal_code}
                keyboardType="number-pad"
                autoCorrect={false}
                placeholder='Digite o CEP do endereço de cobrança'
                placeholderTextColor={COLORS.quaternary}
                maxLength={9}
                disabled={loading}
            />

            <Input
                label="Endereço"
                onChangeText={formik.handleChange('billing_address.address')}
                onBlur={formik.handleBlur('billing_address.address')}
                value={formik.values.billing_address.address}
                errorMessage={formik.touched.billing_address?.address && formik.errors.billing_address?.address}
                keyboardType="default"
                autoCorrect={false}
                placeholder='Endereço de cobrança'
                placeholderTextColor={COLORS.quaternary}
                disabled={loading}
            />

            <View style={GlobalStyle.row}>
    
                <View style={{flex: 2}}>
    
                    <Input
                        label="Nº"
                        onChangeText={formik.handleChange('billing_address.address_number')}
                        onBlur={formik.handleBlur('billing_address.address_number')}
                        value={formik.values.billing_address.address_number}
                        errorMessage={formik.touched.billing_address?.address_number && formik.errors.billing_address?.address_number}
                        keyboardType="number-pad"
                        autoCorrect={false}
                        placeholder='Nº'
                        placeholderTextColor={COLORS.quaternary}
                        disabled={loading}
                    />
                </View>
    
                <View style={{flex: 4}}>
    
                    <Input
                        label="Complemento"
                        onChangeText={formik.handleChange('billing_address.address_complement')}
                        onBlur={formik.handleBlur('billing_address.address_complement')}
                        value={formik.values.billing_address.address_complement}
                        errorMessage={formik.touched.billing_address?.address_complement && formik.errors.billing_address?.address_complement}
                        keyboardType="default"
                        autoCorrect={false}
                        placeholder='Complemento'
                        placeholderTextColor={COLORS.quaternary}
                        disabled={loading}
                    />
                </View>
            </View>

            <Input
                label="Bairro "
                onChangeText={formik.handleChange('billing_address.neighborhood')}
                onBlur={formik.handleBlur('billing_address.neighborhood')}
                value={formik.values.billing_address.neighborhood}
                errorMessage={formik.touched.billing_address?.neighborhood && formik.errors.billing_address?.neighborhood}
                keyboardType="default"
                autoCorrect={false}
                placeholder='Bairro do endereço de cobrança'
                placeholderTextColor={COLORS.quaternary}
                disabled={loading}
            />

            <Uf 
                formik={props.formik} 
                fieldName='billing_address.state' 
                value={formik.values.billing_address.state}
                touched={formik.touched.billing_address && formik.touched.billing_address.state}  
                error={formik.errors.billing_address && formik.errors.billing_address.state}
                disabled={loading}
            />
    
            <View style={GlobalStyle.spaceSmall} />
    
            <City 
                formik={props.formik} 
                fieldName='billing_address.city' 
                value={formik.values.billing_address.city}
                uf={formik.values.billing_address.state}
                touched={formik.touched.billing_address && formik.touched.billing_address.city}  
                error={formik.errors.billing_address && formik.errors.billing_address.city}
                disabled={loading}
            />

            <View style={GlobalStyle.spaceSmall} />

        </View>

    )
}

const styles = StyleSheet.create({
  containerTextReadOnly: {
      alignContent: 'center',
      justifyContent: 'center'
  },
  textReadOnly: {
      fontSize: 20,
      color: '#999',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center'
  }
});

