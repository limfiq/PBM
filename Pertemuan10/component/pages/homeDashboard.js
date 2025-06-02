import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar, Card } from 'react-native-paper';

const menuItems = [
  { label: 'Jadwal', color: '#FAD7D7', icon: require('../../assets/jadwal.png') },
  { label: 'Presensi', color: '#D7F6FA', icon: require('../../assets/presensi.png') },
  { label: 'Nilai', color: '#FAF2D7', icon: require('../../assets/nilai.jpg') },
  { label: 'Bahan & Tugas', color: '#FADFD7', icon: require('../../assets/tugas.png') },
  { label: 'KRSS/KRS', color: '#D7FAE1', icon: require('../../assets/krss.png') },
  { label: 'TA/Wisuda', color: '#D7E9FA', icon: require('../../assets/ta.png') },
  { label: 'Kegiatan', color: '#E7FAD7', icon: require('../../assets/kegiatan.png') },
  { label: 'Biaya Kuliah', color: '#E7D7FA', icon: require('../../assets/biaya.png') },
  { label: 'Kuesioner', color: '#FAD7F6', icon: require('../../assets/kuesioner.png') },
];

function HomeScreen({ user, onLogout }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Dashboard" />
        <Appbar.Action icon="logout-variant" onPress={onLogout} />
      </Appbar.Header>
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images.jpeg')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.major}>Teknik Informatika (S1)</Text>
          <Text style={styles.campus}>STIKOM PGRI Banyuwangi</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>3.4</Text>
          <Text style={styles.statLabel}>IP Kumulatif</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>21</Text>
          <Text style={styles.statLabel}>SKS Tempuh</Text>
        </Card>
      </View>
      <View style={styles.menuGrid}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity key={idx} style={[styles.menuItem, { backgroundColor: item.color }]}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  name: { fontSize: 18, fontWeight: 'bold' },
  major: { fontSize: 14, color: '#666' },
  campus: { fontSize: 12, color: '#888' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#1976D2' },
  statLabel: { fontSize: 12, color: '#555' },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  menuItem: {
    width: '28%',
    aspectRatio: 1,
    margin: '2%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  menuIcon: { width: 32, height: 32, marginBottom: 8 },
  menuLabel: { fontSize: 12, textAlign: 'center' },
});

export default HomeScreen;