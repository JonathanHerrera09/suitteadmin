import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

/* const endpoint = 'http://localhost:8000/api/login'; */
/* const endpoint =process.env.REACT_APP_API_URL+'/login'; */
const endpoint ='https://e580-190-108-76-184.ngrok-free.app/api/login';

const LoginForm = () => {
  const [kitchen, setKitchen] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const log = async () => {
    try {
      /* console.log('uno'); */
      const headers = {
        'Content-Type': 'application/json',
      };
      const credentials = {
        withCredentials: true
      };
      const login = await axios.post(endpoint, {
        kitchen: kitchen,
        user: user,
        password: pass,
      }, {
        headers: headers,
        ...credentials
      });
      if (login.data) {
        console.log(login.data);
        AsyncStorage.setItem('kitchen', login.data.kitchen);
        navigate('/'+login.data.kitchen);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

  return (
    <>
    <ImageBackground source={require('../../assets/loginF.jpg')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={kitchen}
            onChangeText={text => setKitchen(text)}
            placeholder="Cocina"
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={user}
            onChangeText={text => setUser(text)}
            placeholder="Usuario"
            placeholderTextColor="#fff"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={pass}
            onChangeText={text => setPass(text)}
            placeholder="Contraseña"
            secureTextEntry={true}
            placeholderTextColor="#fff"
          />
        </View>
        <TouchableOpacity onPress={log} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize: 20,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#ff6811b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    /* alignItems: 'center', */
  },
});

export default LoginForm;
