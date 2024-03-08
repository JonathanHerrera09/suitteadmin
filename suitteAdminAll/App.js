// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import Bell from './screens/Bell';
import Delivery from './screens/Delivery';
import CreateO from './screens/CreateO';

const App = () => {
  const [selectedContent, setSelectedContent] = useState('HomeScreen');

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'HomeScreen':
        return <HomeScreen />;
      case 'Add':
        return <CreateO />;
      case 'Bell':
        return <Bell />;
      case 'Delivery':
        return <Delivery />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>{renderContent()}</View>
      <Footer onContentChange={handleContentChange} selectedContent={selectedContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Alinea los elementos verticalmente
  },
  contentContainer: {
    flex: 1,
  },
});

export default App;
