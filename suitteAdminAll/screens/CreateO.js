import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function CreateO() {
  const [selectedOption, setSelectedOption] = useState('');
  const translateY = useRef(new Animated.Value(0)).current;
  const [selectedTable, setSelectedTable] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    Animated.timing(translateY, {
      toValue: -330,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handleTableSelect = (tableNumber) => {
    setSelectedTable(tableNumber);
  
    // Animación para desplazar la vista hacia arriba al seleccionar una mesa
    Animated.timing(translateY, {
      toValue: -330,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  
  return (
      
        <View style={styles.container}>      
          <Text style={styles.title}>CREAR ORDEN</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, selectedOption === 'table' && styles.selectedButtonTable]}
              onPress={() => handleOptionChange('table')}
            >
              <Text style={styles.buttonText}>Mesa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, selectedOption === 'delivery' && styles.selectedButtonDelivery]}
              onPress={() => handleOptionChange('delivery')}
            >
              <Text style={styles.buttonText}>Domicilio</Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedOption === 'table' && (
              <View style={styles.mesaTitleContainer}>
                <Text style={styles.title}>Seleccione la mesa para su orden</Text>
                <View style={styles.cardsContainer}>
                  {Array.from({ length: 12 }, (_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.card,
                        selectedTable === index + 1 ? styles.selectedCard : styles.hiddenCard,
                      ]}
                      onPress={() => handleTableSelect(index + 1)}
                    >
                      <Text style={styles.cardText}>Mesa {index + 1}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            {selectedOption === 'delivery' && (
              <View>
                {/* Contenido específico para la opción "Domicilio" */}
                <Text>Contenido para Domicilio</Text>
              </View>
            )}
          </View>


        </View>
  );
}

const styles = StyleSheet.create({
  selectedCard: {
    backgroundColor: 'green', // O el color que desees para resaltar la mesa seleccionada
  },
  cardText: {
    textAlign: 'center',
  },
  
  mesaTitleContainer: {
    alignItems: 'center',  // Centra los elementos horizontalmente
  },  
  container: {
    flex: 1,
    alignItems: 'center',

  },
  containerx: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  selectedButtonTable: {
    backgroundColor: 'red',
  },
  selectedButtonDelivery: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contM: {
    display:'block'
  },
   cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
});
