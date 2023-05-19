import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableHighlight, StyleSheet, Pressable, } from 'react-native';
import { ChangeFirstName, ChangeLastName, ChangeEmail, ChangePass } from '../components/Firestore.js';
import { GetUserData } from '../components/Firestore.js';
import { useContext } from 'react';
import ColorSchemeContext from './../ColorSchemeContext';

const EditYourProfile = () => {
  // State variables to control the visibility of modals
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [lastNameModalVisible, setLastNameModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passModalVisible, setPassModalVisible] = useState(false);

  // Getting user data using the GetUserData() function
  const userInfo = GetUserData();
  const name = userInfo.firstName;
  const lastName = userInfo.lastName;
  const email = userInfo.email;

  // State variables to hold the new values for profile update
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState(name);
  const [newLastName, setLastName] = useState(lastName);
  const [newEmail, setEmail] = useState(email);
  const { colorScheme } = useContext(ColorSchemeContext);

  // Function to handle saving profile updates
  const handleSave = (item) => {
    if (item == "name") {
      ChangeFirstName(newName);
    } else if (item == "lastname") {
      ChangeLastName(newLastName);
    } else if (item == "email") {
      ChangeEmail(newEmail);
    } else if (item == "pass") {
      ChangePass(newPassword);
    }
    // Closing the modals after saving changes
    setNameModalVisible(false);
    setLastNameModalVisible(false);
    setEmailModalVisible(false);
    setPassModalVisible(false);

  };
  // EditProfileName component for editing the first name
  const EditProfileName = ({ label, placeholder, onChangeText }) => (
    <TouchableHighlight
      onPress={() => setNameModalVisible(true)}
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

  // EditProfileLS component for editing the last name
  const EditProfileLS = ({ label, placeholder, onChangeText }) => (
    <TouchableHighlight
      onPress={() => setLastNameModalVisible(true)}
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

  // EditProfileEmail component for editing the email
  const EditProfileEmail = ({ label, placeholder, onChangeText }) => (
    <TouchableHighlight
      onPress={() => setEmailModalVisible(true)}
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
  // EditProfilePass component for editing the password
  const EditProfilePass = ({ label, placeholder, onChangeText }) => (
    <TouchableHighlight
      onPress={() => setPassModalVisible(true)}
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
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222' : '#f5f5f5' }]}>
      {/* Modals for editing profile information */}
      <EditProfileName
        label="First Name"
        placeholder={name}
        onChangeText={setNewName}
      />
      <EditProfileLS
        label="Last Name"
        placeholder={lastName}
        onChangeText={setLastName}
      />
      <EditProfileEmail
        label="Email"
        placeholder={email}
        onChangeText={setEmail}
      />

      <EditProfilePass
        label="Password"
        placeholder={"*******"}
        onChangeText={setNewPassword}
      />
      {/* Modal for editing the first name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nameModalVisible}
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
            </View>
            <View style={styles.modalFooter}>
              {/* Save button for updating the first name */}
              <Pressable
                style={{
                  borderRadius: 35,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                }}
                onPress={() => handleSave("name")}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Save Changes</Text>
              </Pressable>

              {/* Cancel button for closing the modal */}
              <Pressable
                style={{
                  borderRadius: 35,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => setNameModalVisible(false)}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Cancel</Text>
              </Pressable>
              <View style={styles.footer}>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal for editing the last name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={lastNameModalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Your Profile</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>New Last Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={lastName}
                placeholderTextColor={'lightgrey'}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.modalFooter}>
              {/* Save button for updating the last name */}
              <Pressable
                style={{
                  borderRadius: 25,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                }}
                onPress={() => handleSave("lastname")}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Save Changes</Text>
              </Pressable>

              {/* Cancel button for closing the modal */}
              <Pressable
                style={{
                  borderRadius: 25,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => setLastNameModalVisible(false)}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Cancel</Text>
              </Pressable>
              <View style={styles.footer}>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal for editing the new email */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Your Profile</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>New Email</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new email"
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.modalFooter}>
              {/* Save button for updating the new email */}
              <Pressable
                style={{
                  borderRadius: 25,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                }}
                onPress={() => handleSave("email")}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Save Changes</Text>
              </Pressable>

              {/* Cancel button for closing the modal */}
              <Pressable
                style={{
                  borderRadius: 25,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => setEmailModalVisible(false)}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Cancel</Text>
              </Pressable>
              <View style={styles.footer}>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal for editing the new password */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passModalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Your Profile</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>New Password</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new password"
                onChangeText={setNewPassword}
              />
            </View>
            <View style={styles.modalFooter}>
              {/* Save button for updating the new email */}
              <Pressable
                style={{
                  borderRadius: 25,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                }}
                onPress={() => handleSave("pass")}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Save Changes</Text>
              </Pressable>

              {/* Cancel button for closing the modal */}
              <Pressable
                style={{
                  borderRadius: 25,
                  padding: 10,
                  elevation: 2,
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => setPassModalVisible(false)}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Cancel</Text>
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
