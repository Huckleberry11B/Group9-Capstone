import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { createWorker } from 'tesseract.js';

class ScreenshotOCR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extractedText: '',
      editedText: '' 
    };
  }

  captureScreenshot = async () => {
    try {
      const uri = await captureRef(this.myRef, {
        format: 'png',
        quality: 0.8,
      });
      console.log('Screenshot captured:', uri);
      this.performOCR(uri);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      Alert.alert('Error', 'Failed to capture screenshot');
    }
  };

  handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;
      
      const uri = URL.createObjectURL(file);
      console.log('Image uploaded:', uri);
      this.performOCR(uri);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  performOCR = async (uri) => {
    try {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(uri);
      console.log('Extracted text:', text);
      this.setState({ 
        extractedText: text,
        editedText: text 
      });
      await worker.terminate();
    } catch (error) {
      console.error('Error performing OCR:', error);
      Alert.alert('Error', 'Failed to perform OCR');
    }
  };

  handleTextChange = (event) => {
    this.setState({ editedText: event.target.value });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View ref={ref => (this.myRef = ref)}>
          <Text>This is the content you captured</Text>
        </View>
        <Button title="Capture Screenshot" onPress={this.captureScreenshot} />
        <input type="file" accept="image/*" onChange={this.handleFileUpload} />
        <textarea
          value={this.state.editedText}
          onChange={this.handleTextChange}
          style={{ marginTop: 20, width: '80%', height: 200 }}
        />
      </View>
    );
  }
}

export default ScreenshotOCR;
