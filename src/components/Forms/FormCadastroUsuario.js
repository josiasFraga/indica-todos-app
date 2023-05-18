import React from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import COLORS from '@constants/colors';

export default function FormCadastroUsuario(props) {
  const formik = props.formik;

  return (
    <>
    <View>
        <Input
            label="Nome"
            leftIcon={<Icon name="user"  size={24} color={COLORS.secondary} type='antdesign' />}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            value={formik.values.name}
            errorMessage={formik.touched.name && formik.errors.name}
            keyboardType="default"
            autoCorrect={false}
            placeholder='Digite seu nome'
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="Telefone"
            leftIcon={<Icon name="phone" size={24} color={COLORS.secondary} type='antdesign' />}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            value={formik.values.phone}
            errorMessage={formik.touched.phone && formik.errors.phone}
            keyboardType="phone-pad"
            autoCorrect={false}
            autoCompleteType="tel"
            placeholder="Digite seu telefone"
            placeholderTextColor={COLORS.quaternary}
        />
        <Input
            label="E-mail"
            leftIcon={<Icon name="mail" size={24} color={COLORS.secondary} type='antdesign' />}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            errorMessage={formik.touched.email && formik.errors.email}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="email"
            placeholder='Digite seu email'
            placeholderTextColor={COLORS.quaternary}
        />
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
            placeholder='Digite sua senha cadastrada'
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
            placeholder="Repita sua senha"
            placeholderTextColor={COLORS.quaternary}
        />
        <Button
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
            title="Enviar Cadastro"
            onPress={formik.handleSubmit}
        />
    </View>
    </>
  );
}