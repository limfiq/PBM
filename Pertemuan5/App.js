import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider'; // Import Slider

export default function App() {
  const [nama, setNama] = useState('');
  const [gender, setGender] = useState('');
  const [agama, setAgama] = useState('');
  const [usia, setUsia] = useState(18); // Tambahkan state untuk usia
  const [hobi, setHobi] = useState({
    membaca: false,
    menulis: false,
    olahraga: false,
  });
  const [savedDataList, setSavedDataList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formData');
        if (savedData !== null) {
          const data = JSON.parse(savedData);
          setNama(data.nama);
          setGender(data.gender);
          setAgama(data.agama);
          setUsia(data.usia); // Muat data usia
          setHobi(data.hobi);
        }

        const allData = await AsyncStorage.getItem('allData');
        if (allData !== null) {
          setSavedDataList(JSON.parse(allData));
        }
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
    };
    loadData();
  }, []);

  const submitData = async () => {
    const data = {
      nama,
      gender,
      agama,
      usia, // Simpan usia
      hobi,
    };

    try {
      await AsyncStorage.setItem('formData', JSON.stringify(data));

      const updatedList = [...savedDataList, data];
      await AsyncStorage.setItem('allData', JSON.stringify(updatedList));
      setSavedDataList(updatedList);

      Alert.alert('Data Tersimpan!', `Nama: ${nama}\nGender: ${gender}\nAgama: ${agama}\nUsia: ${usia}\nHobi: ${Object.keys(hobi).filter(k => hobi[k]).join(', ')}`);
    } catch (e) {
      Alert.alert('Gagal menyimpan data!');
    }
  };

  const editData = (index) => {
    const dataToEdit = savedDataList[index];
    setNama(dataToEdit.nama);
    setGender(dataToEdit.gender);
    setAgama(dataToEdit.agama);
    setUsia(dataToEdit.usia); // Edit usia
    setHobi(dataToEdit.hobi);

    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    AsyncStorage.setItem('allData', JSON.stringify(updatedList));
  };

  const deleteData = async (index) => {
    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    await AsyncStorage.setItem('allData', JSON.stringify(updatedList));
    Alert.alert('Data berhasil dihapus!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Form Input Biodata</Text>

        <Text style={styles.label}>Nama:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama"
          value={nama}
          onChangeText={setNama}
        />

        <Text style={styles.label}>Jenis Kelamin:</Text>
        {['Pria', 'Wanita'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.radioButton, gender === item && styles.radioActive]}
            onPress={() => setGender(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Agama:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={agama}
            onValueChange={(itemValue) => setAgama(itemValue)}
          >
            <Picker.Item label="Pilih Agama" value="" />
            <Picker.Item label="Islam" value="Islam" />
            <Picker.Item label="Kristen" value="Kristen" />
            <Picker.Item label="Katolik" value="Katolik" />
            <Picker.Item label="Hindu" value="Hindu" />
            <Picker.Item label="Buddha" value="Buddha" />
            <Picker.Item label="Konghucu" value="Konghucu" />
          </Picker>
        </View>

        <Text style={styles.label}>Usia: {usia}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={usia}
          onValueChange={(value) => setUsia(value)}
          minimumTrackTintColor="#3399ff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#3399ff"
        />

        <Text style={styles.label}>Hobi:</Text>
        {Object.keys(hobi).map((item) => (
          <View key={item} style={styles.hobiRow}>
            <Switch
              value={hobi[item]}
              onValueChange={(val) => setHobi({ ...hobi, [item]: val })}
            />
            <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
          </View>
        ))}

        <View style={{ marginTop: 20 }}>
          <Button title="Simpan ke Local Storage" onPress={submitData} />
        </View>

        <Text style={[styles.label, { marginTop: 30 }]}>Daftar Data Tersimpan:</Text>
        <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
          <View style={[styles.savedItem, { flexDirection: 'row', backgroundColor: '#f0f0f0' }]}>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Nama</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Gender</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Agama</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Usia</Text>
            <Text style={{ flex: 2, fontWeight: 'bold' }}>Hobi</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Aksi</Text>
          </View>
        </View>
        {savedDataList.map((item, index) => (
          <View
            key={index}
            style={[
              styles.savedItem,
              { flexDirection: 'row', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' },
            ]}
          >
            <Text style={{ flex: 1 }}>{item.nama}</Text>
            <Text style={{ flex: 1 }}>{item.gender}</Text>
            <Text style={{ flex: 1 }}>{item.agama}</Text>
            <Text style={{ flex: 1 }}>{item.usia}</Text>
            <Text style={{ flex: 2 }}>{Object.keys(item.hobi).filter(k => item.hobi[k]).join(', ')}</Text>
            <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
              <Button title="Edit" onPress={() => editData(index)} />
              <Button title="Hapus" color="red" onPress={() => deleteData(index)} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  radioActive: {
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
  },
  hobiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginBottom: 10,
  },
  savedItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
});
