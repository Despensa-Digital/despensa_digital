import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { BottomSheet } from '@gorhom/bottom-sheet';

const EditarNomeResidencia = ({ setModal, modal }) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '45%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setModal(false);
    }
  }, []);

  const [nomeResidencia, setNomeResidencia] = useState('');

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={modal ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textBox}>Editar nome da residência</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label='Nome'
          value={nomeResidencia}
          onChangeText={(nome) => setNomeResidencia(nome)}
        />
        <Button
          color='#5DB075'
          style={styles.buttonSave}
          mode='contained'
          onPress={() => setModal(false)}
        >
          Salvar alteração
        </Button>

        <Button
          color='white'
          style={styles.buttonCancel}
          mode='outlined'
          onPress={() => setModal(false)}
        >
          Cancelar
        </Button>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonCancel: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  buttonSave: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  textBox: { alignSelf: 'center', fontSize: 25 },
  textSubtitulo: { alignSelf: 'center', fontSize: 15 },
});

export default EditarNomeResidencia;
