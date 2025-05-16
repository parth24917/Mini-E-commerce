import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleAlert as AlertCircle } from 'lucide-react-native';
import Button from './Button';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <AlertCircle size={48} color="#ef4444" />
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <Button
          title="Try Again"
          onPress={onRetry}
          style={styles.retryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 16,
    color: '#0f172a',
    textAlign: 'center',
    marginVertical: 16,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#3B82F6',
  },
});

export default ErrorView;