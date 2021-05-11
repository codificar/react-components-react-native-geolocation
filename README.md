# react-native-geolocation
Componente para gerenciar o estado do GPS.

## Install
add in package.json:
```bash
"react-native-geolocation": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/react-native-geolocation.git",
```

execute the command:
```bash
$ yarn
or
$ npm install 
```
## On Android

```java
import android.content.IntentFilter;
import io.rumors.reactnativesettings.RNSettingsPackage;
import io.rumors.reactnativesettings.receivers.GpsLocationReceiver;
import io.rumors.reactnativesettings.receivers.AirplaneModeReceiver;

  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); 
	
	// #### ADD THIS ##### ->
    registerReceiver(new GpsLocationReceiver(), new IntentFilter("android.location.PROVIDERS_CHANGED"));
    registerReceiver(new AirplaneModeReceiver(), new IntentFilter("android.intent.action.AIRPLANE_MODE"));
  }
```
```
 cd android/
 ./gradlew clean  
 cd ..
 react-native run-android
```

## Basic Usage GeolocationStatus

```javascript
import { GeolocationStatus} from "react-native-geolocation"

   <GeolocationStatus
		title="Habilite seu GPS"
		subtitle="Para usar o app habilite seu GPS"
		btntext="Habilitar"
		icon="map-marker-check-outline"
		goWithoutText="Continuar sem GPS"
		image={images.free_map}
		showGoWithout={!hasRequest}

		onEnableLocation={() => onEnableLocation()}
		onDisableLocation={() => onDisableLocation()}
		onPressModalButton={() => onPressModalButton()}
		onPressGoWithoutButton={() => onPressGoWithoutButton()}
    />

```

## Basic Usage GeolocationService

```javascript
import { GeolocationService} from "react-native-geolocation"
	myLocation() {
		GeolocationService.getCurrentLocation(
			(position) => {
				console.log("latitude ", position.coords.latitude)
				console.log("longitude ", position.coords.longitude)		
			},			
			{ 
				text: strings("map_screen.active_gps_msg"), 
				yes: strings("map_screen.active_gps"),  
				no: strings("map_screen.running_out_of")
			}
		)
	}

	watchLocation() {
		const watchID = GeolocationService.watchLocation(
			(position) => {
				console.log("latitude ", position.coords.latitude)
				console.log("longitude ", position.coords.longitude)		
			},			
			{ 
				text: strings("map_screen.active_gps_msg"), 
				yes: strings("map_screen.active_gps"),  
				no: strings("map_screen.running_out_of")
			}
		)
	}

	checkLocation() {
		const response = GeolocationService.checkLocation()
		console.log("Locations is enable ? ", response);
	}

```

# GeolocationStatus
## Properties

| Prop  | Default  | Type | isRequired | Description
| :------------ |:---------------:| :---------------:|:---------------:|--
| title | "Habilite seu GPS" | `string` |  | Modal Text Title. |
| subtitle | "Para usar o app habilite seu GPS" | `string` |  | Modal bustitle. |
| btntext | "Habilitar" | `string` |  | Modal Button Text. |
| icon | " | `map-marker-check-outline` |  | Modal icon. |
| goWithoutText | "Continuar sem GPS" | `string` | | Modal Image. |
| image | " | `Image` | ✔️ | Modal Image. |
| showGoWithout | false | `boolean` | | Show Go Without Button. |

## Events
| Name  
| :------------ 
| onEnableLocation 
| onDisableLocation 
| onPressModalButton 
| onPressGoWithoutButton 