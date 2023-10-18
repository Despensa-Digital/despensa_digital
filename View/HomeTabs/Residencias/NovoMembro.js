import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';

const NovoMembro = ({ setModal, modal }) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '65%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setModal(false);
    }
  }, []);

  const [nomeMembro, setNomeMembro] = useState("");
  const [emailMembro, setEmailMembro] = useState("");

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={modal ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textBox}>Adicionar novo membro</Text>
        <Text style={styles.textSubtitulo}>Para adicionar um novo membro digite o e-mail e nome abaixo:</Text>
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="Nome"
          value={nomeMembro}
          onChangeText={setNomeMembro}
        />
        <TextInput
          style={styles.textInput}
          mode='outlined'
          outlineColor='black'
          label="E-mail"
          value={emailMembro}
          onChangeText={setEmailMembro}
        />

        <Button
          color='#5DB075'
          style={styles.buttonSave}
          mode="contained"
          onPress={() => setModal(false)}>
          Enviar convite
        </Button>

        <Button
          color='white'
          textColor='#5DB075'
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonCancel}
          mode="outlined"
          onPress={() => setModal(false)}>
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#fff',
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
  textSubtitulo: { alignSelf: 'center', fontSize: 15 }
});

export default NovoMembro;
