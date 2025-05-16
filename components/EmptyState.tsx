import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShoppingCart, ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';
import Button from './Button';

interface EmptyStateProps {
  icon: 'shopping-cart' | 'shopping-bag';
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  buttonLink,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'shopping-cart':
        return <ShoppingCart size={64} color="#94a3b8" />;
      case 'shopping-bag':
        return <ShoppingBag size={64} color="#94a3b8" />;
      default:
        return <ShoppingCart size={64} color="#94a3b8" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Button
          title={buttonText}
          onPress={() => router.push(buttonLink)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6',
  },
});

export default EmptyState;