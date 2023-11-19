Projeto Despensa Digital



## Pra não ter erro incializando o projeto do zero (expo)

- Node version
    - Now using node v16.20.2 (npm v8.19.4)

- Criando base
    npx create-expo-app despensa_digital

- Testando execução
    cd despensa_digital
    npx expo start

- Instalação GoogleSignIn
    https://react-native-google-signin.github.io/docs/setting-up/expo
- Instalação firebasae
    https://rnfirebase.io/

- Vai ser preciso logar na hora do build final
    - https://docs.expo.dev/develop/development-builds/create-a-build/#login-to-your-expo-account

- Problena build do EAS
    > No matching client found for package name 'com.anonymous.despensa_digital'
    . troquei tudo por com.despensadigital

- Rebuildar APP
    npx expo prebuild --clean --platform android

## Como executar (expo)