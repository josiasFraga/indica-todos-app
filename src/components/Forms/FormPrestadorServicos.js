import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import COLORS from '@constants/colors';
import Category from '@components/DropDowns/Category';
import SubCategory from '@components/DropDowns/SubCategory';
import MeasurementUnits from '@components/DropDowns/MeasurementUnits';
import GlobalStyle from '@styles/global';

export default function FormPrestadorServicos(props) {
  const formik = props.formik;
  const serviceFormObject = props.serviceFormObject;

  const handleRemoveService = (index) => {
    const services = [...formik.values.services];
    services.splice(index, 1);
    formik.setFieldValue('services', services);
  };

  const handleAddService = () => {
    const services = [...formik.values.services];
    services.push(serviceFormObject);
    formik.setFieldValue('services', services);
  }

  const maskMoney = (text) => {
    let numberPattern = /\d+/g;
    let formated = text.match(numberPattern).join('');
    formated = formated / 100;
    formated = number_format(formated, 2, ',', '.');
    formated = 'R$ ' + formated;

    if (formated == 'R$ 0,00') {
      formated = '';
    }

    return formated;
  }

  return (
    <>
    <View>
        <Text style={styles.sectionLabel}>Serviços Prestados</Text>

        {formik.values.services.map((service, index) => (
        <View key={index} style={styles.fieldsetContainer}>
            <Input
                name={`services.${index}.title`}
                placeholder='Digite o nome do serviço prestado'
                label="Nome"
                onChangeText={formik.handleChange(`services.${index}.title`)}
                onBlur={formik.handleBlur(`services.${index}.title`)}
                value={formik.values.services[index].title}
                errorMessage={
                formik.touched.services?.[index]?.title &&
                formik.errors.services?.[index]?.title
                }
            />

            <Input
                name={`services.${index}.description`}
                placeholder='Digite uma breve descrição do serviço prestado'
                label="Descrição"
                onChangeText={formik.handleChange(`services.${index}.description`)}
                onBlur={formik.handleBlur(`services.${index}.description`)}
                value={formik.values.services[index].description}
                multiline
                errorMessage={
                formik.touched.services?.[index]?.description &&
                formik.errors.services?.[index]?.description
                }
            />

            <Category 
                formik={formik} 
                fieldName={`services.${index}.category_id`}
                value={formik.values.services[index].category_id}
                touched={formik.touched.services?.[index]?.category_id}  
                error={formik.errors.services?.[index]?.category_id}
            />

            <View style={GlobalStyle.spaceSmall} />

            <SubCategory 
                formik={formik} 
                fieldName={`services.${index}.subcategory_id`}
                value={formik.values.services[index].subcategory_id}
                categoryId={formik.values.services[index].category_id}
                touched={formik.touched.services?.[index]?.subcategory_id}  
                error={formik.errors.services?.[index]?.subcategory_id}
            />

            <View style={GlobalStyle.spaceSmall} />

            <View style={GlobalStyle.row}>
                <View style={{flex: 1}}>
                    <Input
                        name={`services.${index}.price`}
                        placeholder='Digite o preço do serviço'
                        label="Preço"
                        onChangeText={(input_value)=>{
                            console.log(input_value);
                            //formik.handleChange(`services.${index}.price`)
                        }}
                        onBlur={formik.handleBlur(`services.${index}.price`)}
                        value={formik.values.services[index].price}
                        errorMessage={
                        formik.touched.services?.[index]?.price &&
                        formik.errors.services?.[index]?.price
                        }
                    />
                </View>
                <View style={{flex: 1}}>
                    <MeasurementUnits 
                        formik={formik} 
                        fieldName={`services.${index}.price_unit`}
                        value={formik.values.services[index].price_unit}
                        touched={formik.touched.services?.[index]?.price_unit}  
                        error={formik.errors.services?.[index]?.price_unit}
                    />
                </View>
            </View>

            <View style={GlobalStyle.spaceSmall} />

            <Button
                title="Remover Serviço"
                buttonStyle={{paddingVertical: 5, backgroundColor: COLORS.primary, marginBottom: 15}}
                onPress={() => handleRemoveService(index)}
            />
        </View>
      ))}

     <View style={{alignItems: 'flex-end', marginBottom: 50}}>
        <Button 
            title="Adicionar Outro Serviço" 
            buttonStyle={{paddingVertical: 5, backgroundColor: COLORS.primary, marginBottom: 15}}
            icon={
                <Icon name="plus" size={24} color={COLORS.secondary} type='antdesign' />
            }
            onPress={handleAddService}
        />
     </View>

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
    },
    fieldsetContainer: {
        backgroundColor: '#e6f4f5', 
        paddingHorizontal: 5, 
        paddingVertical: 10, 
        borderRadius: 10, 
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#CCC'
    }
})