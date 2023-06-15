import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '@constants/colors';
import { Text } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import { useDispatch, useSelector } from 'react-redux';

export default function Category(props) {

  const dispatch = useDispatch();
  const measurement_units = useSelector((state) => state.appReducer.service_measurement_units);
  const loading = useSelector((state) => state.appReducer.service_measurement_units_loading);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const formik = props.formik;
  const fieldName = props.fieldName;
  const touched = props.touched;
  const error = props.error;

  const fetchData = async () => {
    dispatch({
        type: 'LOAD_MEASUREMENT_UNITS',
        payload: {}
    })
  };

  React.useEffect(() => {

    fetchData();
  }, [])

  React.useEffect(() => {

    formik.setFieldValue(fieldName, value);
  }, [value]);

  return (
    <View style={{paddingHorizontal: 7}}>
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Preço por</Text>
        <DropDownPicker
            open={open}
            value={props.value}
            items={measurement_units.map((unit) => ({label: unit.titulo, value: unit.titulo}))}
            setOpen={setOpen}
            setValue={setValue}
            //setItems={setStates}
            loading={loading}
            style={{borderColor: COLORS.primary}}
            textStyle={{color: COLORS.primary }}
            placeholder="Não obrigatório"
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