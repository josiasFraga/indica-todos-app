import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '@constants/colors';
import { Text } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import { useDispatch, useSelector } from 'react-redux';

export default function Category(props) {

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.appReducer.service_categories);
  const loading = useSelector((state) => state.appReducer.service_categories_loading);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');


  const formik = props.formik;
  const fieldName = props.fieldName;
  const touched = props.touched;
  const error = props.error;

  const fetchData = async () => {
    dispatch({
        type: 'LOAD_SERVICE_CATEGORIES',
        payload: {}
    })
  };

  React.useEffect(() => {

    fetchData();
  }, [])

  React.useEffect(() => {

    if ( value != '' ) {
      formik.setFieldValue(fieldName, value);
    }
  }, [value]);


  return (
    <View style={{paddingHorizontal: 7}}>
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Categoria do serviço</Text>
        <DropDownPicker
            open={open}
            value={props.value}
            items={categories.map((category) => ({label: category.name, value: category.id}))}
            setOpen={setOpen}
            setValue={setValue}
            //setItems={setStates}
            loading={loading}
            style={{borderColor: COLORS.primary}}
            textStyle={{color: COLORS.primary }}
            placeholder="Selecione uma opção"
            placeholderStyle={{
                color: COLORS.quaternary,
                fontWeight: "normal",
                fontSize: 17
            }}
            searchable={true}
            listMode="MODAL"
        />
        {
            touched && error && <Text style={GlobalStyle.errorValidation}>{error}</Text>
        }
        
    </View>
  );
}