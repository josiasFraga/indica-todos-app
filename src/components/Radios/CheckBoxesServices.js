import React from 'react';
import { View } from 'react-native';
import COLORS from '@constants/colors';
import { Text, CheckBox } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckBoxesServices(props) {

  const dispatch = useDispatch();
  const services = useSelector((state) => state.appReducer.services);
  const formik = props.formik;
  const fieldName = props.fieldName;
  const touched = props.touched;
  const error = props.error;
  const service_provider_id = props.service_provider_id;

  const fetchData = async () => {
    dispatch({
        type: 'LOAD_SERVICES',
        payload: {
            service_provider_id: service_provider_id
        }
    })

  };

  React.useEffect(() => {

    fetchData();
  }, []);

  const handleServiceSelection = (serviceId) => {
    // Aqui você pode atualizar o valor selecionado no seu formik
    formik.setFieldValue(fieldName, serviceId);
  };

  return (
    <View>
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Qual serviço você contratou?</Text>

        {services.map((service, index) => {
            return(
            <CheckBox
                key={service.id}
                title={service.title}
                checked={formik.values[fieldName] === service.id}
                onPress={() => handleServiceSelection(service.id)}
            />
            )
        })}
  
        {
            touched && error && <Text style={GlobalStyle.errorValidation}>{error}</Text>
        }
        
    </View>
  );
}