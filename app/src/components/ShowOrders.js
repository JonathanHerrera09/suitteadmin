import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

/* const endpoint = 'http://localhost:8000/api';
const endpoint2 = 'http://localhost:8000/assets'; */
const endpoint = 'https://e1dd-190-108-76-187.ngrok-free.app/api';
const endpoint2 = 'https://e1dd-190-108-76-187.ngrok-free.app/assets/';

export default  function ShowOrders (props) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {navigation}=props;

  const goToEdith=()=>{
    navigation.navigate("Edith");
  }
  const getAllProducts = async () => {
    try {
      const resp = await axios.get(`${endpoint}/demo/products`);
      setProducts(resp.data.orders);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${endpoint}/demo/product/${id}`);
      getAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openModal = (product) => {
    product.products =JSON.parse(product.products);
    setSelectedProduct(product);
    setModalVisible(true);
  };
 
  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    
    <SafeAreaView>
     {/*  <Text style={styles.title}>Ordenes</Text> */}
      <ScrollView>
      {products.map((item) => (
        <Card key={item.id} containerStyle={styles.card}>
          <Text>ID: {item.id}</Text>
          <Text>Mesa o domicilio: {item.type_service_name}</Text>
          <Text>Valor a pagar: {item.price}</Text>
          <Text>Estado: {item.status_name}</Text>
          <View style={styles.buttonsContainer}>
            
            <Button title="Editar" onPress={goToEdith} />
            <Button title="Eliminar" onPress={() => deleteProduct(item.id)} />
            <Button title="Ver detalles" onPress={() => openModal(item)} />
          </View>
        </Card>
      ))}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Detalles del Producto</Text>
              
              <ScrollView>
              {selectedProduct && (
                <>
                  <Text>ID: {selectedProduct.id}</Text>
                  <Text>Mesa o domicilio: {selectedProduct.type_service_name}</Text>
                  <Text>Valor a pagar: {selectedProduct.price}</Text>
                  <Text>Estado: {selectedProduct.status_name}</Text>
                  
                    <View style={styles.productsGrid}>
                      {selectedProduct && selectedProduct.products && Array.isArray(selectedProduct.products) ? (
                        selectedProduct.products.map((product) => (
                          <View key={product.id} style={styles.productItem}>
                            <Text>Nombre: {product.name}</Text>
                            <Text>Precio: {product.price}</Text>
                          </View>
                        ))
                      ) : (
                        <Text>No hay productos disponibles</Text>
                      )}
                    </View>
                </>
              )}
              </ScrollView>
              <Button title="Cerrar" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
      {/* <NavigationTab/> */}
    </SafeAreaView>
    
  );  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  card: {
    marginBottom: 1,
    width: '100%',
    marginBottom: 0,
    marginRight: '20%',
    marginLeft: '0%',
    shadowOpacity: 2, // Opacidad de la sombra
    shadowRadius: 5, // Radio de la sombra
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    height:'30%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Offset de la sombra
    shadowOpacity: 1, // Opacidad de la sombra
    shadowRadius: 5, // Radio de la sombra
    elevation: 5, // Solo para Android
  },
  modalContent: {
    alignItems: 'center',
  },
  
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productItem: {
    width: '50%', // Para que dos elementos ocupen 1x1 de un 2x2 grid
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

