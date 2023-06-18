import React from 'react';
import { View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import CheckBoxesServies from '@components/Radios/CheckBoxesServices';
import COLORS from '@constants/colors';
import GlobalStyle from '@styles/global';

export default function FormAvaliarPrestador(props) {
  const formik = props.formik;

  return (
    <>
    <View>
        <CheckBoxesServies 
            formik={formik}
            service_provider_id={formik.values.service_provider_id}
            fieldName={`service_id`}
            value={formik.values.service_id}
            touched={formik.touched.service_id}  
            error={formik.errors.service_id}
        />
    </View>

    <View style={GlobalStyle.spaceMedium} />

    <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Como você avalia o serviço?</Text>

    <View>
        <AirbnbRating
          count={5}
          reviews={['Muito Ruim', 'Ruim', 'Ok', 'Bom', 'Muito Bom']}
          defaultRating={formik.values.rating}
          onFinishRating={(rating) => formik.setFieldValue('rating', rating)}
          size={30}
        />
    </View>

    <View style={GlobalStyle.spaceMedium} />

    <View>
        <Input
            label="Comentários"
            onChangeText={formik.handleChange('comment')}
            onBlur={formik.handleBlur('comment')}
            value={formik.values.comment}
            multiLine={true}
            numberOfLines={4}
            errorMessage={formik.touched.comment && formik.errors.comment}
            placeholder={"Descreva com foi sua" + "\n" + "experiência contratando esse serviço"}
            placeholderTextColor={COLORS.quaternary}
        />
    </View>
    </>
  );
}