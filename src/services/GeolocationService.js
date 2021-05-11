import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {
	Platform
} from "react-native";
import RNSettings from "react-native-settings";

function showAndroidCheckLocation(messages) {
  if (Platform.OS !== 'ios') {
    LocationServicesDialogBox.forceCloseDialog();
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: messages.text,
      ok: messages.yes,
      cancel: messages.no,
      enableHighAccuracy: false,
      showDialog: true,
      openLocationServices: true,
      preventOutSideTouch: true,
      preventBackClick: true,
      providerListener: true
    }).catch((error) => {      
    });
  }
}

module.exports = {  
  async checkLocation() {
    const response = await RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((result) => {        
      if (result == RNSettings.ENABLED) {          
       return true
      } else {
       return false
      }
    });
    return response
  },
  watchLocation(onSuccess, messages = { text: "Habilite o GPS", yes: "Habilitar", no: "Não Habilitar" }, options = { showLocationDialog: false, enableHighAccuracy: true, timeout: 1000 }, onError = showAndroidCheckLocation) {
    const watchID =Geolocation.watchPosition(position => {
      onSuccess(position)
    }, error => {
      onError(messages)
    },
      options
    )
    return watchID
  },

  getCurrentLocation(onSuccess, messages = { text: "Habilite o GPS", yes: "Habilitar", no: "Não Habilitar" }, options = { showLocationDialog: false, enableHighAccuracy: true, timeout: 1000}, onError = showAndroidCheckLocation) {
    const watchID =Geolocation.getCurrentPosition(position => {
      onSuccess(position)
    }, error => {
      onError(messages)
    },
      options
    )
    return watchID
  },
  
  stopObservingLocation() {
    Geolocation.stopObserving();
  }
}