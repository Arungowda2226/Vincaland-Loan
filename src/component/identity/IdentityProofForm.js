import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IdentityProofForm = ({ showCheck, markComplete, formData, setFormData }) => {
    const [aadhar, setAadhar] = useState('');
    const [pan, setPan] = useState('');

    const isValidAadhar = (value) => /^[2-9]{1}[0-9]{11}$/.test(value);
    const isValidPAN = (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase());

    const renderValidationIcon = (value, isValid, length) => {
        if (value.length === length) {
            return (
                <Ionicons
                    name={isValid(value) ? 'checkmark-circle' : 'close-circle'}
                    size={24}
                    color={isValid(value) ? 'green' : 'red'}
                />
            );
        }
        return null;
    };

    const handleNext = () => {
        const formData = {
            aadhar,
            pan,
        }
        setFormData(formData);
        showCheck(false);
        markComplete(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Aadhar Card Number</Text>
            <View style={styles.inputContainer}>
                <Image source={require('../../../assets/aadhaar_card.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={aadhar}
                    onChangeText={setAadhar}
                    keyboardType="numeric"
                    maxLength={12}
                    placeholder="1234 5678 9012"
                    placeholderTextColor={"gray"}
                />
                {renderValidationIcon(aadhar, isValidAadhar, 12)}
            </View>

            <Text style={styles.label}>PAN Card Number</Text>
            <View style={styles.inputContainer}>
                <Image source={require('../../../assets/pan-card.png')} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={pan}
                    onChangeText={setPan}
                    autoCapitalize="characters"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    placeholderTextColor={"gray"}
                />
                {renderValidationIcon(pan, isValidPAN, 10)}
            </View>
            <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 13,
    },
    label: {
        marginTop: 10,
        fontWeight: '600',
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 6,
    },
    icon: {
        height: 30,
        width: 40,
        resizeMode: 'stretch',
        marginRight: 8,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 13,
        alignSelf: "center",
        paddingHorizontal: 100
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default IdentityProofForm;
