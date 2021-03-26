import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import RNSettings from "react-native-settings";
import { DeviceEventEmitter } from "react-native";

import React, { useState, useEffect } from "react";

import { Colors, Fonts, Size } from "../themes";

export default function GeolocationStatus({
  title,
  subtitle,
  icon,
  image = null,
  btntext,
  onEnableLocation,
  onDisableLocation,
  onPressModalButton,
  onPressGoWithoutButton,
  showGoWithout = false,
  goWithoutText = ""
}) {
  const [gpsEvent, setGpsEvent] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [gpsStatus, setGpsStatus] = useState(null);

  useEffect(() => {;
    if (gpsStatus === null) {
      RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((result) => {        
        if (result == RNSettings.ENABLED) {          
          setGpsStatus(true)
          onEnableLocation()
        } else {
          setGpsStatus(false)
          onDisableLocation()
        }
      });
    }
    if (gpsEvent === null) {
      const event = DeviceEventEmitter.addListener(
        RNSettings.GPS_PROVIDER_EVENT,
        onChangeGps
      );
      setGpsEvent(event);
    }
  }, []);

  const onChangeGps = async (e) => {
    if (e[RNSettings.LOCATION_SETTING] === RNSettings.ENABLED) {
      setGpsStatus(true)
      await onEnableLocation();
      return;
    }
    setGpsStatus(false)
    await onDisableLocation();
    setShowModal(true)
  };

  const goWithout = async () => {
    await onPressGoWithoutButton()
    setShowModal(false)
  };
  return (
    <>
      <Modal isVisible={gpsStatus === false && gpsStatus !== null && showModal === true}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Icon name={icon} size={36}></Icon>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.subtitle}>{subtitle}</Text>
              <Image style={styles.image} source={image} />
            </View>
            <View style={styles.footer}>
              {
                showGoWithout ? 
                  <TouchableOpacity style={styles.btn} onPress={goWithout}>
                    <Text style={styles.txtButtonRegister}>{goWithoutText}</Text>
                  </TouchableOpacity>
                  :
                  <>
                  
                  </>
              }
              <TouchableOpacity style={styles.btn} onPress={onPressModalButton}>
                <Text style={styles.txtButtonRegister}>{btntext}</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: 0,
    flexGrow: 1,
    flex: 1,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: Size.normalize(10),
    padding: Size.normalize(10),
    borderRadius: Size.normalize(10),
  },
  title: {
    ...Fonts.style.h4,
    textAlign: "center",
    color: "#000000",
  },
  subtitle: {
    ...Fonts.style.des,
    color: "#333",
    textAlign: "center",
    marginBottom: Size.normalize(30),
  },
  txtButtonRegister: {
    fontSize: 14,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold"
  },
  btn: {
    width: Size.normalize(90),
    height: 40,
    marginLeft: 10,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: Colors.primaryColor,
  },
  image: {
    height: Size.normalize(185),
    width: Size.normalize(185),
  },
  header: {
    alignItems: "center",
    paddingTop: Size.normalize(16),
    marginBottom: Size.normalize(10),
  },
  body: {
    flex: 4,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: Size.normalize(20),
  },
  footer: {
    flex: 1 / 3,
    flexDirection: "row",
    alignSelf: "center",
  },
});
