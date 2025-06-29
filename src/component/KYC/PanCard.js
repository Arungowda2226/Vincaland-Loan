import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const MAX_FILES = 6;

const PanCard = ({ showCheck, markComplete, formData, setFormData }) => {
    const [files, setFiles] = useState([]);

    const handleFilePick = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/*', 'application/pdf'],
            multiple: true,
        });

        if (!result.canceled) {
            const newFiles = result.assets || [result];
            if (files.length + newFiles.length > MAX_FILES) {
                Alert.alert('Limit Exceeded', 'You can only upload 6 files');
                return;
            }
            setFiles(prev => [...prev, ...newFiles]);
        }
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
            setFiles(prev => [...prev, result.assets[0]]);
        }
    };

    const handleUpload = () => {
        if (files.length === 0) {
            Alert.alert('No Files', 'Please select at least one file');
            return;
        }

        // Log selected files
        files.forEach((file, index) => {
            console.log(`PAN File ${index + 1}:`, file);
        });

        // Save to formData
        setFormData(prev => ({
            ...prev,
            panFiles: files, // change this key to distinguish from Aadhaar
        }));

        showCheck(false);
        markComplete(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload PAN Card</Text>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.subContainer} onPress={handleFilePick}>
                    <MaterialCommunityIcons name="cloud-upload-outline" size={48} color="#4CAF50" />
                    <Text style={styles.orText}>
                        Drag and drop or <Text style={styles.browseText}>browse</Text> your files
                    </Text>
                    <Text style={styles.supportText}>Support JPG, PNG, PDF</Text>
                </TouchableOpacity>
                <Text style={{ marginVertical: 10 }}>Or</Text>
                <TouchableOpacity style={styles.cameraBtn} onPress={handleCamera}>
                    <Text style={styles.cameraText}>Use Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                    <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
                <View style={styles.previewContainer}>
                    {files.map((file, index) => (
                        <View key={index} style={styles.filePreview}>
                            {file.mimeType?.includes('image') || file.uri?.match(/\.(jpg|jpeg|png)$/i) ? (
                                <Image source={{ uri: file.uri }} style={styles.imagePreview} />
                            ) : (
                                <MaterialCommunityIcons name="file-pdf-box" size={40} color="#E53935" />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FEFFFF',
        borderColor: '#cccc',
        borderWidth: 1,
        borderRadius: 13,
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
    },
    subContainer: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'green',
        alignItems: 'center',
        borderRadius: 13,
        width: '100%',
        backgroundColor: '#e2f7dc',
    },
    orText: { marginTop: 10, color: '#555', textAlign: 'center' },
    supportText: { color: 'gray', fontSize: 12 },
    browseText: { color: '#4CAF50', textDecorationLine: 'underline' },
    cameraBtn: {
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
    uploadBtn: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 60,
        paddingVertical: 8,
    },
    uploadText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    previewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        justifyContent: 'center',
    },
    filePreview: {
        margin: 5,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default PanCard;
