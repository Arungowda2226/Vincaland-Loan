import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox, Icon as IconElement, Button as RegButton } from 'react-native-elements';


const titleOptions = [
    { label: 'Mr', value: '1' },
    { label: 'Miss', value: '2' },
    { label: 'Mrs', value: '3' },
];

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
];

const maritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
];

const PersonalDetailsForm = ({ showCheck, markComplete, formData, setFormData }) => {
    const [title, setTitle] = useState(null);
    const [gender, setGender] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [spouseName, setSpouseName] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [currentState, setCurrentState] = useState('');
    const [currentPincode, setCurrentPincode] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [permanentState, setPermanentState] = useState('');
    const [permanentPincode, setPermanentPincode] = useState('');

    const handleNext = () => {  
        const formData = {
            title,
            fullName,
            fatherName,
            motherName,
            spouseName,
            gender,
            maritalStatus,
            currentAddress,
            currentState,
            currentPincode,
            isSameAddress,
            permanentAddress: isSameAddress ? currentAddress : permanentAddress,
            permanentState: isSameAddress ? currentState : permanentState,
            permanentPincode: isSameAddress ? currentPincode : permanentPincode,
          };
        setFormData(formData);
        showCheck(false);
        markComplete(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Fill out the information</Text>

            {/* Personal Details Accordion Header (You can wrap this with a toggle button) */}
            <Text style={styles.sectionLabel}>Personal Details</Text>

            {/* Full Name */}
            <Text style={styles.label}>Full Name (as per PAN)</Text>
            <View style={styles.row}>
                <Dropdown
                    style={styles.dropdownShort}
                    data={titleOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Mr"
                    value={title}
                    onChange={(item) => setTitle(item.value)}
                />
                <TextInput
                    placeholder="Michel Joseph"
                    style={[styles.input, { flex: 1 }]}
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            {/* Father's and Mother's Name */}
            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.label}>Father's Name</Text>
                    <TextInput
                        placeholder="Edwards"
                        style={styles.input}
                        value={fatherName}
                        onChangeText={setFatherName}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Mother's Name</Text>
                    <TextInput
                        placeholder="Nancy Edwards"
                        style={styles.input}
                        value={motherName}
                        onChangeText={setMotherName}
                    />
                </View>
            </View>

            {/* Marital and Gender */}
            <View style={{ alignItems: "center", justifyContent: "space-between", marginVertical: 10,flexDirection:"row" }}>
                <View style={{ flex: 1, marginRight: 10, marginVertical:10 }}>
                    <Text style={{ fontWeight: "600", fontSize: 11 }}>Marital Status:</Text>
                    <Dropdown
                        style={[styles.dropdown, { width: 100 }]}
                        data={maritalStatusOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Married"
                        value={maritalStatus}
                        onChange={(item) => setMaritalStatus(item.value)}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={{ fontWeight: "600", fontSize: 11 }}>Gender:</Text>
                    <Dropdown
                        style={[styles.dropdown, { width: 80 }]}
                        data={genderOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Male"
                        value={gender}
                        onChange={(item) => setGender(item.value)}
                    />
                </View>
            </View>

            {/* Spouse Name */}
            <View style={{ marginVertical: 5, flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.label}>Spouse Name :</Text>
                <TextInput
                    placeholder="Bency Michel"
                    style={[styles.input, { marginLeft: 10, flex: 1 }]}
                    value={spouseName}
                    onChangeText={setSpouseName}
                />
            </View>

            {/* Current Address */}
            <Text style={styles.label}>Current Address</Text>
            <TextInput
                placeholder="Enter your address"
                multiline
                numberOfLines={10}
                style={[styles.input, { height: 70 }]}
                value={currentAddress}
                onChangeText={setCurrentAddress}
            />
            {/* State and Pincode */}
            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.label}>State:</Text>
                    <TextInput
                        placeholder="Karnataka"
                        style={[styles.input, { marginLeft: 10 }]}
                        value={currentState}
                        onChangeText={setCurrentState}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.label}>Pincode:</Text>
                    <TextInput
                        placeholder="628401"
                        style={[styles.input, { marginLeft: 10 }]}
                        value={currentPincode}
                        onChangeText={setCurrentPincode}
                    />
                </View>
            </View>

            {/* Checkbox */}
            <View style={styles.checkboxRow}>
                <CheckBox
                    textStyle={{ color: 'black' }}
                    containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', marginLeft: -10 }}
                    onPress={() => setIsSameAddress(!isSameAddress)}
                    checked={isSameAddress}
                    uncheckedColor='orange'
                />
                <Text style={styles.checkboxText}>
                    Select this option if both your permanent and current addresses are the same.
                </Text>
            </View>

            {/* Permanent Address (Conditional) */}
            {!isSameAddress && (
                <>
                    <Text style={styles.label}>Permanent Address</Text>
                    <TextInput
                        placeholder="Enter permanent address"
                        multiline
                        numberOfLines={10}
                        style={[styles.input, { height: 70 }]}
                        value={permanentAddress}
                        onChangeText={setPermanentAddress}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10, flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.label}>State</Text>
                            <TextInput 
                                placeholder="Karnataka" 
                                style={[styles.input, { marginLeft: 10 }]} 
                                value={permanentState}
                                onChangeText={setPermanentState}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.label}>Pincode</Text>
                            <TextInput 
                                placeholder="628401" 
                                style={[styles.input, { marginLeft: 10 }]} 
                                value={permanentPincode}
                                onChangeText={setPermanentPincode}
                            />
                        </View>
                    </View>
                </>
            )}

            {/* Submit */}
            <Pressable onPress={handleNext} style={styles.submitButton}>
                <Text style={styles.submitText}>Next</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderColor: "orange",
        borderWidth: 1,
        borderRadius: 13
    },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    row: { flexDirection: 'row', marginBottom: 12 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        marginTop:5
    },
    dropdownShort: {
        width: 80,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkboxText: {
        flex: 1,
        fontSize: 13,
        color: '#444',
        marginLeft: 8,
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },

    sectionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
    },
});

export default PersonalDetailsForm;
