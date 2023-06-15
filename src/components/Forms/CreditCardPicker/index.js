import React from 'react';
import {
	View,
} from 'react-native'
import {Text, Input} from 'react-native-elements';
import CreditCard from 'react-native-credit-card-v2';
import GlobalStyle from '@styles/global';

export default function CreditCardPicker(props) {

    const [focused, setFocused] = React.useState(false);
    const [type, setType] = React.useState('');
    const formik = props.formik;
    const values = formik.values;

    const maskCCExpiry = (text) => {
      let x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
      let retorno = x[1] + '/' + x[2];
  
      return retorno;
    }

    const maskNumber = (text) => {
      return text.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    }

    return(
        <View style={{flex: 1}}>

            <View style={GlobalStyle.spaceSmall} />
            <Text style={GlobalStyle.title2}>Valor: R$ 19,90 mensais</Text>
            <View style={GlobalStyle.spaceSmall} />

            <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <CreditCard
                    type={type}
                    shiny={false}
                    bar={true}
                    focused={focused}
                    number={values.cc_number}
                    name={values.cc_name}
                    expiry={values.cc_expiry}
                    cvc={values.cc_secure_code}
                />
            </View>
        
            <View style={GlobalStyle.spaceSmall} />
            
            <Input
                name={`cc_number`}
                placeholder='Número do cartão'
                label="Número do cartão"
                onChangeText={formik.handleChange(`cc_number`)}
                onBlur={formik.handleBlur(`cc_number`)}
                value={formik.values.cc_number}
                errorMessage={
                formik.touched.cc_number &&
                formik.errors.cc_number
                }
                maxLength={16}
            />

            <Input
                name={`cc_name`}
                placeholder='Nome impresso no cartão'
                label="Nome impresso no cartão"
                onChangeText={formik.handleChange(`cc_name`)}
                onBlur={formik.handleBlur(`cc_name`)}
                value={formik.values.cc_name}
                errorMessage={
                formik.touched.cc_name &&
                formik.errors.cc_name
                }
            />

            <View style={GlobalStyle.row}>

                <View style={{flex: 1}}>

                    <Input
                        name={`cc_expiry`}
                        placeholder='Válido Até'
                        label="Válido Até"
                        maxLength={5}
                        onChangeText={(value) => {
                            formik.setFieldValue(`cc_expiry`, maskCCExpiry(value))
                        }}
                        onBlur={() => formik.handleBlur(`cc_expiry`)} 
                        value={formik.values.cc_expiry}
                        errorMessage={
                        formik.touched.cc_expiry &&
                        formik.errors.cc_expiry
                        }
                    />
                </View>

                <View style={{flex: 1}}>

                    <Input
                        name={`cc_secure_code`}
                        placeholder='Código de Verificação'
                        label="Código de Verificação"
                        maxLength={3}
                        onFocus={()=> setFocused(true)}
                        onChangeText={(value) => {
                            formik.setFieldValue(`cc_secure_code`, maskNumber(value))
                        }}
                        onBlur={()=> {
                            formik.handleBlur(`cc_secure_code`);
                            setFocused(false)
                        }}
                        value={formik.values.cc_secure_code}
                        errorMessage={
                        formik.touched.cc_secure_code &&
                        formik.errors.cc_secure_code
                        }
                    />
                </View>

            </View>
        </View>

    )
}