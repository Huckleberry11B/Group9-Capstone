import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { createWorker } from 'tesseract.js';

class ScreenshotOCR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extractedText: ''
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

  performOCR = async (uri) => {
    try {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(uri);
      console.log('Extracted text:', text);
      this.setState({ extractedText: text });
      await worker.terminate();
    } catch (error) {
      console.error('Error performing OCR:', error);
      Alert.alert('Error', 'Failed to perform OCR');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View ref={ref => (this.myRef = ref)}>
          <Text>This is the content you want to capture</Text>
        </View>
        <Button title="Capture Screenshot" onPress={this.captureScreenshot} />
        <Text style={{ marginTop: 20, textAlign: 'center' }}>{this.state.extractedText}</Text>
      </View>
    );
  }
}

export default ScreenshotOCR;
