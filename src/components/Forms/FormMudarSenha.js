import React from 'react';
import { View } from 'react-native';
import { Input, Icon, Text } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import COLORS from '@constants/colors';

export default function FormSenha(props) {

  const formik = props.formik;
  const step = props.step;

  if (step == 0) {

    return (
        <>
        <View style={{width: '100%'}}>
            <Input
                label="Digite seu email"
                leftIcon={<Icon name="mail" size={24} color={COLORS.secondary} />}
                onChangeText={formik.handleChange('user_email')}
                onBlur={formik.handleBlur('user_email')}
                value={formik.values.user_email}
                errorMessage={formik.touched.user_email && formik.errors.user_email}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder='Digite seu email cadastrado no Indica Todos'
                placeholderTextColor={COLORS.quaternary}
                keyboardType='email-address'
            />
        </View>
        </>
      );
  }

  else if (step == 1) {

    return (
        <>
        <View style={{width: '100%'}}>
            <Input
                label="Código"
                leftIcon={<Icon name="lock-open" size={24} color={COLORS.secondary} />}
                onChangeText={formik.handleChange('code')}
                onBlur={formik.handleBlur('code')}
                value={formik.values.code}
                errorMessage={formik.touched.code && formik.errors.code}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder='Digite o código que você recebeu no seu email'
                placeholderTextColor={COLORS.quaternary}
                maxLength={10}
                keyboardType='number-pad'
            />

            <Text>Obs: Você só irá receber o código se o email digitado na etapa anterior, estiver cadastrado no Indica Todos</Text>

            <View style={GlobalStyle.spaceMedium} />
        </View>
        </>
      );
  }

  else if (step == 2) {

    return (
        <>
        <View style={{width: '100%'}}>
            <Input
                label="Senha"
                leftIcon={<Icon name="lock" size={24} color={COLORS.secondary} />}
                onChangeText={formik.handleChange('new_password')}
                onBlur={formik.handleBlur('new_password')}
                value={formik.values.new_password}
                errorMessage={formik.touched.new_password && formik.errors.new_password}
                autoCorrect={false}
                secureTextEntry
                autoCapitalize="none"
                placeholder='Digite sua nova senha'
                placeholderTextColor={COLORS.quaternary}
            />
    
            <Input
                label="Confirmar senha"
                leftIcon={<Icon name="lock" size={24} color={COLORS.secondary} />}
                onChangeText={formik.handleChange('confirm_new_password')}
                onBlur={formik.handleBlur('confirm_new_password')}
                value={formik.values.confirm_new_password}
                errorMessage={formik.touched.confirm_new_password && formik.errors.confirm_new_password}
                autoCorrect={false}
                secureTextEntry
                autoCapitalize="none"
                placeholder="Repita sua nova senha"
                placeholderTextColor={COLORS.quaternary}
            />
        </View>
        </>
      );
  }
}