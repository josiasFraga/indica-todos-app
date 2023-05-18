import React from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import COLORS from '@constants/colors';

export default function FormSenha(props) {
  const formik = props.formik;

  return (
    <>
    <View style={{width: '100%'}}>
        <Input
            label="Senha"
            leftIcon={<Icon name="lock" size={24} color={COLORS.secondary} />}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            errorMessage={formik.touched.password && formik.errors.password}
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            placeholder='Digite sua nova senha'
            placeholderTextColor={COLORS.quaternary}
        />

        <Input
            label="Confirmar senha"
            leftIcon={<Icon name="lock" size={24} color={COLORS.secondary} />}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
            errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Repita sua nova senha"
            placeholderTextColor={COLORS.quaternary}
        />
        <Button
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
            title="Salvar Alterações"
            onPress={formik.handleSubmit}
        />
    </View>
    </>
  );
}