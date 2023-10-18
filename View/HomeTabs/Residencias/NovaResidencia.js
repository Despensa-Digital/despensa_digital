import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const NovaResidencia = ({ setModal, modal }) => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '45%', '60%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setModal(false);
    }
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="none"
        opacity={0.5}
        enableTouchThrough={false}
      />
    ),
    []
  );

  const [nomeResidencia, setNomeResidencia] = useState('');

  return (
    <BottomSheet
      style={{ flex: 1 }}
      ref={bottomSheetRef}
      index={modal ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.textBox}>Nova Residência</Text>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          outlineColor="black"
          label="Nome da residência"
          value={nomeResidencia}
          onChangeText={(nome) => setNomeResidencia(nome)}
        />

        <Button
          color="#5DB075"
          style={styles.buttonSave}
          mode="contained"
          onPress={() => setModal(false)}
        >
          Salvar nova residência
        </Button>

        <Button
          color="white"
          textColor="#5DB075"
          theme={{ colors: { outline: '#5DB075' } }}
          style={styles.buttonCancel}
          mode="outlined"
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
});

export default NovaResidencia;
