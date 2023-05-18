import React from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import COLORS from '@constants/colors';

export default function FormLogin(props) {
  const formik = props.formik;

  return (
    <>
    <View>
        <Input
            label="E-mail"
            leftIcon={<Icon name="email" size={24} color={COLORS.secondary} />}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            errorMessage={formik.touched.email && formik.errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            placeholder='Digite seu email cadastrado'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Senha"
            leftIcon={<Icon name="lock" size={24} color={COLORS.secondary} />}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            errorMessage={formik.touched.password && formik.errors.password}
            secureTextEntry
            autoCapitalize="none"
            placeholder='Digite sua senha cadastrada'
            placeholderTextColor={COLORS.quaternary}
        />
        <Button
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
            title="Entrar"
            onPress={formik.handleSubmit}
            //disabled={formik.isSubmiting}
        />
    </View>
    </>
  );
}