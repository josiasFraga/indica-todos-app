import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import COLORS from '@constants/colors';
import Uf from '@components/DropDowns/Uf';
import City from '@components/DropDowns/City';
import GlobalStyle from '@styles/global';
import axios from 'axios';
import AlertHelper from '@components/Alert/AlertHelper';

export default function DadosEmpresa(props) {
  const formik = props.formik;
  const [loading, setLoading] = React.useState(false);

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

  const fetchData = async (cep) => {
    setLoading(true);
    try {
      const response = await axios.get('https://viacep.com.br/ws/' + cep + '/json/');

      if ( response.status != 200 || response.data.erro ) {

        formik.setFieldValue('service_provider.state', '');
        formik.setFieldValue('service_provider.city', '');
        //formik.setFieldValue('service_provider.address', '');
        //formik.setFieldValue('service_provider.neighborhood', '');

        AlertHelper.show(
            'error',
            'Erro de CEP',
            'O cep parece ser inválido',
        );

      } else {

        formik.setFieldValue('service_provider.state', response.data.uf);
        formik.setFieldValue('service_provider.city', response.data.localidade);
        formik.setFieldValue('service_provider.address', response.data.logradouro);
        formik.setFieldValue('service_provider.neighborhood', response.data.bairro);
    
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {

    if ( formik.values.service_provider.postal_code.length >= 9 ) {
        fetchData(formik.values.service_provider.postal_code);
    }
  }, [formik.values.service_provider.postal_code]);


  return (
    <>
    <View>
        <Text style={styles.sectionLabel}>Dados do seu negócio</Text>
        <Text style={styles.sectionLabelDesc}>Esses dados ficarão visíveis para os usuários do Indica Tudo</Text>

        <Input
            label="Nome "
            leftIcon={<Icon name="md-business-outline"  size={24} color={COLORS.secondary} type='ionicon' />}
            onChangeText={formik.handleChange('service_provider.name')}
            onBlur={formik.handleBlur('service_provider.name')}
            value={formik.values.service_provider.name}
            errorMessage={formik.touched.service_provider && formik.touched.service_provider.name && formik.errors.service_provider && formik.errors.service_provider.name}
            keyboardType="default"
            autoCorrect={false}
            placeholder='Digite o nome do seu negócio'
            placeholderTextColor={COLORS.quaternary}
        />
    
        <Input
            label="Telefone Celular"
            leftIcon={<Icon name="phone" size={24} color={COLORS.secondary} />}
            onChangeText={(value) => {
                const telefone_formatado = maskPhone(value);
                formik.setFieldValue('service_provider.phone', telefone_formatado)
            }}
            onBlur={formik.handleBlur('service_provider.phone')}
            value={formik.values.service_provider.phone}
            errorMessage={formik.touched.service_provider && formik.touched.service_provider.phone && formik.errors.service_provider && formik.errors.service_provider.phone}
            keyboardType="phone-pad"
            autoCorrect={false}
            autoCompleteType="tel"
            placeholder="Digite o telefone celular"
            placeholderTextColor={COLORS.quaternary}
            maxLength={15}
        />
    
        <Input
            label="E-mail"
            leftIcon={<Icon name="mail" size={24} color={COLORS.secondary} type='antdesign' />}
            onChangeText={formik.handleChange('service_provider.email')}
            onBlur={formik.handleBlur('service_provider.email')}
            value={formik.values.service_provider.email}
            errorMessage={formik.touched.service_provider && formik.touched.service_provider.email && formik.errors.service_provider && formik.errors.service_provider.email}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="email"
            placeholder='Digite o email'
            placeholderTextColor={COLORS.quaternary}
        />

        <Input
            label="CEP"
            leftIcon={<Icon name="md-location"  size={24} color={COLORS.secondary} type='ionicon' />}
            onChangeText={(value) => {
                const cep_formatado = maskCEP(value);
                formik.setFieldValue('service_provider.postal_code', cep_formatado);
            }}
            onBlur={formik.handleBlur('service_provider.postal_code')}
            value={formik.values.service_provider.postal_code}
            errorMessage={formik.touched.service_provider && formik.touched.service_provider.postal_code && formik.errors.service_provider && formik.errors.service_provider.postal_code}
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder='Digite o CEP do seu negócio'
            placeholderTextColor={COLORS.quaternary}
            maxLength={9}
            disabled={loading}
        />

        <Input
            label="Endereço "
            leftIcon={<Icon name="md-location"  size={24} color={COLORS.secondary} type='ionicon' />}
            onChangeText={formik.handleChange('service_provider.address')}
            onBlur={formik.handleBlur('service_provider.address')}
            value={formik.values.service_provider.address}
            errorMessage={formik.touched.service_provider && formik.touched.service_provider.address && formik.errors.service_provider && formik.errors.service_provider.address}
            keyboardType="default"
            autoCorrect={false}
            placeholder='Endereço do seu negócio'
            placeholderTextColor={COLORS.quaternary}
            disabled={loading}
        />

        <View style={GlobalStyle.row}>

            <View style={{flex: 2}}>

                <Input
                    label="Nº"
                    leftIcon={<Icon name="md-location"  size={24} color={COLORS.secondary} type='ionicon' />}
                    onChangeText={formik.handleChange('service_provider.address_number')}
                    onBlur={formik.handleBlur('service_provider.address_number')}
                    value={formik.values.service_provider.address_number.toString()}
                    errorMessage={formik.touched.service_provider && formik.touched.service_provider.address_number && formik.errors.service_provider && formik.errors.service_provider.address_number}
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
                    leftIcon={<Icon name="md-location"  size={24} color={COLORS.secondary} type='ionicon' />}
                    onChangeText={formik.handleChange('service_provider.address_complement')}
                    onBlur={formik.handleBlur('service_provider.address_complement')}
                    value={formik.values.service_provider.address_complement}
                    errorMessage={formik.touched.service_provider && formik.touched.service_provider.address_complement && formik.errors.service_provider && formik.errors.service_provider.address_complement}
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
            leftIcon={<Icon name="md-location"  size={24} color={COLORS.secondary} type='ionicon' />}
            onChangeText={formik.handleChange('service_provider.neighborhood')}
            onBlur={formik.handleBlur('service_provider.neighborhood')}
            value={formik.values.service_provider.neighborhood}
            errorMessage={formik.touched.service_provider && formik.touched.service_provider.neighborhood && formik.errors.service_provider && formik.errors.service_provider.neighborhood}
            keyboardType="default"
            autoCorrect={false}
            placeholder='Bairro do seu negócio'
            placeholderTextColor={COLORS.quaternary}
            disabled={loading}
        />

        <Uf 
            formik={props.formik} 
            fieldName='service_provider.state' 
            value={formik.values.service_provider.state}
            touched={formik.touched.service_provider && formik.touched.service_provider.state}  
            error={formik.errors.service_provider && formik.errors.service_provider.state}
            disabled={loading}
        />

        <View style={GlobalStyle.spaceSmall} />

        <City 
            formik={props.formik} 
            fieldName='service_provider.city' 
            value={formik.values.service_provider.city}
            uf={formik.values.service_provider.state}
            touched={formik.touched.service_provider && formik.touched.service_provider.city}  
            error={formik.errors.service_provider && formik.errors.service_provider.city}
            disabled={loading}
        />

    </View>
    </>
  );
}

const styles = StyleSheet.create({
    sectionLabelDesc: {
        fontSize: 12,
        color: COLORS.quaternary,
        textAlign: 'center',
        marginBottom: 5
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.primary,
        textTransform: 'uppercase'
    }
})