import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const titleOptions = [
    { label: 'Currently Working', value: '1' },
    { label: 'Not Working', value: '2' },
];

const EmploymentDetailsForm = ({ showCheck, markComplete, formData, setFormData }) => {
    const [status, setStatus] = useState("");
    const [employerName, setEmployerName] = useState("");
    const [salary, setSalary] = useState("")

    const handleNext = () => {
        const formData = {
            status,
            employerName,
            salary,
        }
        setFormData(formData);
        showCheck(false);
        markComplete(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Employer Name</Text>
            <TextInput style={styles.inputContainer} onChangeText={(Ename)=> setEmployerName(Ename)}/>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Employment Status:</Text>
                <Dropdown
                    style={styles.dropdownShort}
                    data={titleOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Status"
                    value={status}
                    onChange={(item) => setStatus(item.value)}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                <Text>Montly Salary:</Text>
                <View style={[styles.inputContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                    <Text style={{ fontWeight: "900", fontSize: 16, marginHorizontal: 15 }}>₹</Text>
                    <View style={{ borderWidth: 1, borderColor: "black", height: 30 }} />
                    <TextInput style={{ width: 180, marginRight: 10 }} placeholder='10,00,000' onChangeText={(sal) => setSalary(sal)} />
                </View>
            </View>
            <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 13,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical: 7
    },
    label: {
        marginTop: 10,
        fontWeight: '600',
        marginBottom: 4,
    },
    dropdownShort: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginLeft: 10,
        backgroundColor: '#fff',
        flex: 1
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
})

export default EmploymentDetailsForm;
