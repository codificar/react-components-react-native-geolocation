import Geolocation from 'react-native-geolocation-service';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {
	Platform
} from "react-native";

function checkLocation(messages) {
  LocationServicesDialogBox.forceCloseDialog();
  if (Platform.OS !== 'ios') {
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
  watchLocation(onSuccess, messages = { text: "Habilite o GPS", yes: "Habilitar", no: "Não Habilitar" }, options = { showLocationDialog: false, enableHighAccuracy: true, timeout: 1000 }, onError = checkLocation) {
    const watchID =Geolocation.watchPosition(position => {
      onSuccess(position)
    }, error => {
      onError(messages)
    },
      options
    )
    return watchID
  },

  getCurrentLocation(onSuccess, messages = { text: "Habilite o GPS", yes: "Habilitar", no: "Não Habilitar" }, options = { showLocationDialog: false, enableHighAccuracy: true, timeout: 1000}, onError = checkLocation) {
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