# react-native-generic
A generic component to react native

## Install
add in package.json:
```bash
"PROJECTNAME": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/PROJECTNAME.git",
```

## Usage

```javascript

import GenericComponent from "react-native-generic";

<GenericComponent
	route={'localhost:8000/libs/generic/test'}
	providerId={this.state.providerId}
	token={this.state.token}
/>


```

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| route | '' | `string` | rota para pegar o relatorio de saques|
| providerId | - | `number` | id do prestador |
| providerId | - | `string` | token do prestador |