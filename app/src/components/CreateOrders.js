import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  Image, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
/* import ModalPicker from 'react-native-modal-picker'; */
import axios from 'axios';

/* 
const endpoint = 'http://localhost:8000/api';
const endpoint2 = 'http://localhost:8000/assets/';
*/
const endpoint = 'https://e1dd-190-108-76-187.ngrok-free.app/api';
const endpoint2 = 'https://e1dd-190-108-76-187.ngrok-free.app/assets/';

export default function CreateOrders() {
  const [description, setDescription] = useState('');
  const [numbercart, setNumberCart] = useState(0);
  const [tipoServicio, setTipoServicio] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedTipoServicio, setSelectedTipoServicio] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [displayStyle, setDisplayStyle] = useState('none');
  const [totalPrice, setTotalPrice] = useState(0);

  const headers = {
    'Content-Type': 'application/json',
  };
  
  const credentials = {
    withCredentials: true
  };

  const store = async (e) => {
    e.preventDefault();
    const order = await axios.post(`${endpoint}/demo/product`,{
      typeService: selectedTipoServicio,
      description: description, 
      price: totalPrice, 
      product:selectedProducts
    }, {
      headers: headers,
      ...credentials
    });
    
    // Aquí deberías manejar la lógica de almacenamiento
  };

  useEffect(() => {
    const getServiceBy = async () => {
      const resp = await axios.get(`${endpoint}/demo/products`, {
        headers: headers,
        ...credentials
      });            
      setTipoServicio(resp.data.typeService);            
    };
    
    const getProductById = async () => {
      const resp = await axios.get(`${endpoint}/demo/products`, {
        headers: headers,
        ...credentials
      });
      setProducts(resp.data.products);            
    };

    getProductById();
    getServiceBy();
  }, [0]);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  const handleSearch = () => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear Orden</Text>
      
      <View style={styles.formContainer}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de servicio</Text>
          <Picker
            selectedValue={selectedTipoServicio}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTipoServicio(itemValue)
            }>
            {tipoServicio.map((tipo) => (
              <Picker.Item key={tipo.id} label={tipo.name} value={tipo.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nota</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Buscar producto...</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar producto..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
        />
        
            <View style={styles.resultContainer}>
            {searchResults.map(product => (
                <TouchableOpacity
                key={product.id}
                style={styles.productItem}
                onPress={() => handleProductClick(product)}
                >
                <Image
                    source={{ uri: `${endpoint2}${product.img}` }}
                    style={styles.productImage}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                </TouchableOpacity>
            ))}
            </View>
        
        <TouchableOpacity style={styles.button} onPress={store}>
          <Text style={styles.buttonText}>Confirmar Orden</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '95%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    marginBottom: 5,
    height:'10%',
  },
  resultContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productItem: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
});
