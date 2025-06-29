import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import Header from '../Header';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {

    const handlePersonalLoan = () => {
        navigation.navigate("PersonalLoan");
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#ffcc00', '#ff6f00']} style={{ flex: 1, marginVertical: 10 }}>
                <Header />
                <View style={styles.content}>
                    <View style={styles.personalContainer}>
                        <View style={styles.topTextContainer}>
                            <Image source={require('../../../assets/profile.png')} style={{ resizeMode: "stretch", height: 50, width: 50 }} />
                            <Text style={styles.profileText}>Hi, Mariya 👋</Text>
                        </View>
                        <View style={styles.topImageContainer}>
                            <View style={styles.imageMainContainer}>
                                <Image source={require('../../../assets/392.png')} style={styles.topImage} />
                            </View>
                            <View style={[styles.imageMainContainer, { marginLeft: 30 }]}>
                                <Image source={require('../../../assets/176.png')} style={styles.topImage} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.loanContainer}>
                        <View style={styles.loanBtnContainer}>
                            <Image source={require('../../../assets/388.png')} style={{ height: 20, width: 20, resizeMode: "stretch" }} />
                            <Text style={styles.loanTxt}>Personal Loan</Text>
                        </View>
                        <View style={[styles.loanBtnContainer, { marginLeft: 20 }]}>
                            <Image source={require('../../../assets/homeLoan.png')} style={{ height: 20, width: 20, resizeMode: "stretch" }} />
                            <Text style={styles.loanTxt}>Home Loan</Text>
                        </View>
                    </View>
                    <View style={styles.loanCategory}>
                        <Text style={{ fontWeight: "800", fontSize: 16 }}>Loan Categories</Text>
                        <View style={{ borderWidth: 1, borderColor: "gray", marginVertical: 5 }} />
                        <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                            <Pressable onPress={handlePersonalLoan} style={styles.categoryBtn}>
                                <Image source={require('../../../assets/389.png')} style={{ height: 20, width: 30, resizeMode: "stretch" }} />
                                <Text style={styles.categLabel}>Personal Loan</Text>
                            </Pressable>
                            <View style={styles.categoryBtn}>
                                <Image source={require('../../../assets/402.png')} style={{ height: 20, width: 30, resizeMode: "stretch" }} />
                                <Text style={styles.categLabel}>Home Loan</Text>
                            </View>
                            <View style={styles.categoryBtn}>
                                <Image source={require('../../../assets/404.png')} style={{ height: 20, width: 30, resizeMode: "stretch" }} />
                                <Text style={styles.categLabel}>BT-Balance Transfer Loan</Text>
                            </View>
                            <View style={styles.categoryBtn}>
                                <Image source={require('../../../assets/406.png')} style={{ height: 20, width: 30, resizeMode: "stretch" }} />
                                <Text style={styles.categLabel}>Insurance Loan</Text>
                            </View>
                            <View style={styles.categoryBtn}>
                                <Image source={require('../../../assets/405.png')} style={{ height: 20, width: 30, resizeMode: "stretch" }} />
                                <Text style={styles.categLabel}>Cibil Score Repair</Text>
                            </View>
                            <View style={styles.categoryBtn}>
                                <Image source={require('../../../assets/403.png')} style={{ height: 20, width: 30, resizeMode: "stretch" }} />
                                <Text style={styles.categLabel}>Business Loan</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.footerContainer}>
                <View style={styles.footerSubContainer}>
                    <Image source={require('../../../assets/417.png')} style={styles.footerBtns} />
                    <Text style={styles.footerLabel}>Home</Text>
                </View>
                <View style={styles.footerSubContainer}>
                    <Image source={require('../../../assets/418.png')} style={styles.footerBtns} />
                    <Text style={styles.footerLabel}>Statement history</Text>
                </View>
                <View style={styles.footerSubContainer}>
                    <Image source={require('../../../assets/419.png')} style={styles.footerBtns} />
                    <Text style={styles.footerLabel}>Offers</Text>
                </View>
                <View style={styles.footerSubContainer}>
                    <Image source={require('../../../assets/420.png')} style={styles.footerBtns} />
                    <Text style={styles.footerLabel}>Profile</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF2F5"
    },
    personalContainer: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    topTextContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    profileText: {
        marginLeft: 20,
        fontWeight: "800",
        fontSize: 17,
        color: "#000"
    },
    topImage: {
        height: 20,
        width: 20,
        resizeMode: "stretch"
    },
    topImageContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageMainContainer: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 13
    },
    loanContainer: {
        alignSelf: "flex-end",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10
    },
    loanBtnContainer: {
        padding: 10,
        borderRadius: 13,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center"
    },
    loanTxt: {
        marginLeft: 20,
        fontWeight: "bold"
    },
    content: {
        flex: 1,
    },
    footerContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 20,
        borderColor: "#F0F0F04D"
    },
    footerSubContainer: {
        alignItems: "center"
    },
    footerBtns: {
        width: 20,
        height: 20,
        resizeMode: "stretch"
    },
    footerLabel: {
        fontWeight: "600",
        fontSize: 12,
        marginTop: 4
    },
    loanCategory: {
        flex: 1,
        marginTop: 50,
        backgroundColor: "#EEF2F5",
        padding: 15
    },
    categoryBtn: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "white",
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    categLabel: {
        marginLeft: 5,
        fontWeight: "600",
        fontSize: 14
    }
});

export default Home;
