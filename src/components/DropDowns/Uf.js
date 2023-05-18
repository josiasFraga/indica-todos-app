import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '@constants/colors';
import { Text } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import axios from 'axios';

export default function Uf(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [states, setStates] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  const formik = props.formik;
  const fieldName = props.fieldName;
  const touched = props.touched;
  const error = props.error;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');

      setStates(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {

    fetchData();
  }, [])

  React.useEffect(() => {

    formik.setFieldValue(fieldName, value);
  }, [value]);

  return (
    <View style={{paddingHorizontal: 7}}>
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Estado</Text>
        <DropDownPicker
        open={open}
        value={props.value}
        items={states.map((state) => ({label: state.nome, value: state.sigla}))}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setStates}
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