import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';


const PaySlip = ({ showCheck, markComplete, formData, setFormData }) => {
    const [payslips, setPayslips] = useState([null, null, null]); // 3 slots

    const handlePick = async (index) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/*', 'application/pdf'],
        });

        if (!result.canceled) {
            const selectedFile = result.assets ? result.assets[0] : result;
            const newPayslips = [...payslips];
            newPayslips[index] = selectedFile;
            setPayslips(newPayslips);
        }
    };

    const handleUpload = () => {
        if (payslips.every(file => file === null)) {
            Alert.alert('No Files', 'Please upload at least one payslip');
            return;
        }

        // Log each selected payslip
        payslips.forEach((file, index) => {
            if (file) {
                console.log(`Payslip ${index + 1}:`, {
                    name: file.name || `CameraImage_${index + 1}`,
                    type: file.mimeType || 'image/jpeg',
                    uri: file.uri,
                    size: file.size || 'unknown'
                });
            } else {
                console.log(`Payslip ${index + 1}: Not uploaded`);
            }
        });

        // Save to formData (if needed)
        setFormData(prev => ({
            ...prev,
            payslipFiles: payslips,
        }));

        showCheck(false);
        markComplete(true);
    };
    

    const handleCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission Denied', 'Camera permission is required');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            const newPayslips = [...payslips];
            const emptyIndex = newPayslips.findIndex(p => p === null);
            if (emptyIndex !== -1) {
                newPayslips[emptyIndex] = result.assets[0];
                setPayslips(newPayslips);
            } else {
                Alert.alert("Limit Reached", "You have already added 3 payslips.");
            }
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please upload last 3 Month's Pay slips</Text>
            <View style={styles.row}>
                {payslips.map((file, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.uploadBox}
                        onPress={() => handlePick(index)}
                    >
                        {file ? (
                            file.mimeType?.includes('image') || file.uri?.match(/\.(jpg|jpeg|png)$/i) ? (
                                <Image source={{ uri: file.uri }} style={styles.imagePreview} />
                            ) : (
                                <MaterialCommunityIcons name="file-pdf-box" size={40} color="#E53935" />
                            )
                        ) : (
                            <MaterialCommunityIcons name="cloud-upload-outline" size={48} color="#4CAF50" />
                        )}
                    </TouchableOpacity>
                ))}

            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.orText}>
                    Drag and drop or <Text style={styles.browseText}>browse</Text> your files
                </Text>
                <Text style={styles.supportText}>Support JPG, PNG, PDF</Text>
            </View>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>Or</Text>

            <TouchableOpacity style={styles.cameraBtn} onPress={handleCamera}>
                <Text style={styles.cameraText}>Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FEFFFF',
        borderRadius: 13,
        borderColor: '#cccc',
        borderWidth: 1,
    },
    title: {
        fontSize: 15,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    uploadBox: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F5E9',
    },
    label: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
    imagePreview: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    uploadBtn: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal:80,
        alignSelf:"center"
    },
    uploadText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: { marginTop: 10, color: '#555', textAlign: 'center' },
    supportText: { color: 'gray', fontSize: 12 },
    browseText: { color: '#4CAF50', textDecorationLine: 'underline' },
    cameraBtn: {
        alignSelf:"center",
        borderWidth: 1,
        borderColor: '#4CAF50',
        paddingVertical: 4,
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 30,
    },
    cameraText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PaySlip;
