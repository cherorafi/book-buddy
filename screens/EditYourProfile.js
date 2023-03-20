import React, { useState } from 'react';
import {
View,
Text,
Modal,
TextInput,
TouchableHighlight,
StyleSheet,
Pressable,
} from 'react-native';




import {
GetFirstName,
GetLastName,
GetEmail,
ChangeFirstName,
ChangeLastName,
ChangeEmail,
ChangePass
} from '../components/Firestore.js';




const EditYourProfile = () => {
const [modalVisible, setModalVisible] = useState(false);
const name = GetFirstName();
const lastName = GetLastName();
const email = GetEmail();
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [newName, setNewName] = useState(name);
const [newLastName, setLastName] = useState(lastName);
const [newEmail, setEmail] = useState(email);




const handleSave = () => {
  ChangeFirstName(newName);
  ChangeLastName(newLastName);
  ChangeEmail(newEmail);
  if (newPassword) {
    ChangePass(currentPassword, newPassword);
  }
  setModalVisible(false);
};




const EditProfileItem = ({ label, placeholder, onChangeText }) => (
  <TouchableHighlight
    onPress={() => setModalVisible(true)}
    underlayColor="#f0f0f0"
    style={styles.editProfileItem}
  >
    <>
      <Text style={styles.editProfileLabel}>{label}</Text>
      <Text style={styles.editProfileValue} numberOfLines={1}>
        {placeholder}
      </Text>
    </>
  </TouchableHighlight>
);




return (
  <View style={styles.container}>
    <EditProfileItem
      label="First Name"
      placeholder={name}
      onChangeText={setNewName}
    />
    <EditProfileItem
      label="Last Name"
      placeholder={lastName}
      onChangeText={setLastName}
    />
    <EditProfileItem
      label="Email"
      placeholder={email}
      onChangeText={setEmail}
    />




    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Your Profile</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalLabel}>New First Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={name}
              placeholderTextColor={'lightgrey'}
              onChangeText={setNewName}
            />
            <Text style={styles.modalLabel}>New Last Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={lastName}
              placeholderTextColor={'lightgrey'}
              onChangeText={setLastName}
            />
            <Text style={styles.modalLabel}>New Email</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new email"
              onChangeText={setEmail}
            />
            <Text style={styles.modalLabel}>Current Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter current password"
              onChangeText={setCurrentPassword}
              secureTextEntry={true}
            />
            <Text style={styles.modalLabel}>New Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new password"
              onChangeText={setNewPassword}
              secureTextEntry={true}
            />




        </View>
        <View style={styles.modalFooter}>
        <Pressable
     style={{
         borderRadius: 40,
         padding: 20,
         elevation: 2,
         alignItems: 'center',
     }}
     onPress={() => handleSave()}>
     <Text style={{fontSize: 20,textAlign: 'center'}}>Save Changes</Text>
   </Pressable>
   <View style={styles.footer}>
</View>
     </View>
      </View>
    </View>
  </Modal>
</View>
);
};








const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#ffffff',
  paddingHorizontal: 20,
  paddingTop: 20,
},
editProfileItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 15,
  borderBottomColor: '#f0f0f0',
  borderBottomWidth: 1,
},
editProfileLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: 5,
},
editProfileValue: {
  fontSize: 16,
  color: '#666666',
  maxWidth: 200,
},
modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#ffffff',
  borderRadius: 10,
  overflow: 'hidden',
  width: '80%',
  maxHeight: '80%',
},
modalHeader: {
  backgroundColor: '#f0f0f0',
  paddingVertical: 15,
  paddingHorizontal: 20,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333333',
},
modalBody: {
  padding: 20,
},
modalLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: 5,
  marginTop: 10,
},
modalInput: {
  fontSize: 16,
  color: '#666666',
  backgroundColor: '#f0f0f0',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginBottom: 10,
},
saveButton: {
  backgroundColor: '#026efd',
  borderRadius: 5,
  paddingHorizontal: 15,
  paddingVertical: 10,
  alignSelf: 'center',
  marginTop: 20,
},
saveButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#ffffff',
},
cancelButton: {
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#333333',
  borderRadius: 5,
  paddingHorizontal: 15,
  paddingVertical: 10,
  alignSelf: 'center',
  marginTop: 20,
},
cancelButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333333',
},
});
export default EditYourProfile;
