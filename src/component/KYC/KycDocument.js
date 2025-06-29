import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import Header from '../Header';
import { Ionicons } from '@expo/vector-icons';
import Aadhaar from './Aadhaar';
import PanCard from './PanCard';
import PaySlip from './PaySlip';
import BankStatement from './BankStatement';

const KycDocument = ({ navigation }) => {

    const [sections, setSections] = useState({
        aadhaar: { expanded: false, completed: false },
        pan: { expanded: false, completed: false },
        payslip: { expanded: false, completed: false },
        bank: { expanded: false, completed: false },
    });

    const [aadhaarData, setAadhaarData] = useState({});
    const [panData, setPanData] = useState({});
    const [payslipData, setPayslipData] = useState({});
    const [bankData, setBankData] = useState({});

    const toggleSection = (key) => {
        setSections((prev) => ({
            ...prev,
            [key]: { ...prev[key], expanded: !prev[key].expanded },
        }));
    };

    const markComplete = (key) => {
        setSections((prev) => ({
            ...prev,
            [key]: { ...prev[key], completed: true, expanded: false },
        }));
    };

    const renderSection = (label, key, FormComponent, data, setData, imageSource) => (
        <>
            <Pressable onPress={() => toggleSection(key)} style={styles.card}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={imageSource} style={styles.labelImage} />
                    <Text style={styles.btnLabel}>{label}</Text>
                </View>
                <Ionicons
                    name={sections[key].completed ? "checkmark" : "chevron-down"}
                    size={24}
                    color={sections[key].completed ? "green" : "black"}
                />
            </Pressable>
            {sections[key].expanded && (
                <FormComponent
                    showCheck={() => toggleSection(key)}
                    markComplete={() => markComplete(key)}
                    setFormData={setData}
                />
            )}
        </>
    );

    const handleNext = () => {
        console.log("Aadhaar Data:", aadhaarData);
        console.log("PAN Card Data:", panData);
        console.log("Payslip Data:", payslipData);
        console.log("Bank Statement Data:", bankData);
    };

    return (
        <View style={styles.container}>
            <Header title="KYC-Document" navigation={navigation} />
            <ScrollView style={styles.mainContainer}>
                <Text style={styles.headerLabel}>Add Your KYC Documents</Text>

                {renderSection("Aadhaar Card", "aadhaar", Aadhaar, aadhaarData, setAadhaarData, require('../../../assets/aadhaar_card.png'))}
                {renderSection("PAN Card", "pan", PanCard, panData, setPanData, require('../../../assets/pan-card.png'))}
                {renderSection("Payslip", "payslip", PaySlip, payslipData, setPayslipData, require('../../../assets/payslip.png'))}
                {renderSection("Bank Statement", "bank", BankStatement, bankData, setBankData, require('../../../assets/Bank_statements.png'))}

                <Image
                    source={require('../../../assets/personalLoan.png')}
                    style={styles.image}
                />
                <View style={{ marginTop: "30%" }} />
            </ScrollView>

            <Pressable onPress={handleNext} style={styles.nextButton}>
                <Text style={[styles.headerLabel, { color: "white" }]}>Submit Your Application</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    mainContainer: { padding: 24, paddingBottom: 200 },
    headerLabel: { fontWeight: "900", fontSize: 18 },
    card: {
        padding: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        borderRadius: 8,
        elevation: 1,
    },
    image: {
        width: "70%",
        height: "30%",
        resizeMode: "stretch",
        alignSelf: "center",
        marginTop: 50,
    },
    nextButton: {
        backgroundColor: "green",
        paddingVertical: 20,
        alignItems: "center",
    },
    btnLabel: {
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 15
    },
    labelImage: {
        height: 30,
        width: 30,
        resizeMode: "stretch"
    }
});

export default KycDocument;
