import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';

export default function CartScreen() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const renderCartItem = ({ item }) => <CartItem item={item} />;
  
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };
  
  if (cartItems.length === 0) {
    return (
      <EmptyState 
        icon="shopping-cart"
        title="Your cart is empty"
        message="Browse our products and add items to your cart"
        buttonText="Start Shopping"
        buttonLink="/home"
      />
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>$0.00</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${getTotalPrice().toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button 
                title="Proceed to Checkout" 
                onPress={handleCheckout} 
                style={styles.checkoutButton}
              />
              <Button 
                title="Clear Cart" 
                onPress={clearCart} 
                style={styles.clearButton} 
                textStyle={styles.clearButtonText}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 16,
  },
  footerContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#0f172a',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 16,
    color: '#0f172a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
  },
  buttonContainer: {
    gap: 12,
  },
  checkoutButton: {
    backgroundColor: '#3B82F6',
  },
  clearButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  clearButtonText: {
    color: '#64748b',
  },
});