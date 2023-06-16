import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '@constants/colors';
import { Text } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import { useDispatch, useSelector } from 'react-redux';

export default function City(props) {

  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.appReducer.service_subcategories);
  const loading = useSelector((state) => state.appReducer.service_subcategories_loading);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const formik = props.formik;
  const fieldName = props.fieldName;
  const categoryId = props.categoryId;
  const touched = props.touched;
  const error = props.error;

  const fetchData = async () => {
    dispatch({
        type: 'LOAD_SERVICE_SUBCATEGORIES',
        payload: {
            category_id: categoryId
        }
    })

  };

  React.useEffect(() => {
    if ( categoryId && categoryId != null && categoryId != '' ) {
    
        fetchData();
    }
  }, [categoryId])

  React.useEffect(() => {

    if ( value != '' ) {
      formik.setFieldValue(fieldName, value);
    }
  }, [value]);

  return (
    <View style={{paddingHorizontal: 7}}>
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Subcategoria do serviço</Text>
        <DropDownPicker
        open={open}
        value={props.value}
        items={subcategories.map((subcategory) => ({label: subcategory.name, value: subcategory.id}))}
        setOpen={setOpen}
        setValue={setValue}
        //setItems={setCities}
        loading={loading}
        style={{borderColor: COLORS.primary}}
        textStyle={{color: COLORS.primary }}
        placeholder="Selecione uma opção"
        placeholderStyle={{
            color: COLORS.quaternary,
            fontWeight: "normal",
            fontSize: 17
        }}
        //searchable={true}
        listMode="MODAL"
        />
        {
            touched && error && <Text style={GlobalStyle.errorValidation}>{error}</Text>
        }
        
    </View>
  );
}