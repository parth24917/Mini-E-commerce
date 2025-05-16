import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Minus, Plus } from 'lucide-react-native';
import { fetchProductById } from '@/utils/api';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import ErrorView from '@/components/ErrorView';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, removeFromCart } = useCart();
  const colorScheme = useColorScheme();
  
  const isDarkMode = colorScheme === 'dark';
  const productId = typeof id === 'string' ? parseInt(id) : -1;
  
  useEffect(() => {
    const loadProduct = async () => {
      if (productId < 0) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }
      
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      if (isInCart(product.id)) {
        removeFromCart(product.id);
      }
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            color={star <= Math.round(rating) ? '#F59E0B' : '#E2E8F0'}
            fill={star <= Math.round(rating) ? '#F59E0B' : 'none'}
          />
        ))}
      </View>
    );
  };
  
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={[styles.loadingText, { color: isDarkMode ? '#94a3b8' : '#64748b' }]}>
          Loading product details...
        </Text>
      </View>
    );
  }
  
  if (error || !product) {
    return <ErrorView message={error || 'Product not found'} onRetry={() => router.back()} />;
  }
  
  const alreadyInCart = isInCart(product.id);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerLeft: () => (
            <Button
              icon={<ArrowLeft size={24} color={isDarkMode ? '#f8fafc' : '#0f172a'} />}
              onPress={() => router.back()}
              style={styles.backButton}
            />
          ),
          headerTitle: 'Product Details',
          headerStyle: {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          },
          headerTintColor: isDarkMode ? '#f8fafc' : '#0f172a',
        }}
      />
      
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={[styles.detailsContainer, { backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }]}>
          <Text style={[styles.category, { color: isDarkMode ? '#94a3b8' : '#64748b' }]}>
            {product.category}
          </Text>
          
          <Text style={[styles.title, { color: isDarkMode ? '#f8fafc' : '#0f172a' }]}>
            {product.title}
          </Text>
          
          <View style={styles.ratingContainer}>
            {renderRatingStars(product.rating.rate)}
            <Text style={[styles.ratingText, { color: isDarkMode ? '#94a3b8' : '#64748b' }]}>
              ({product.rating.count} reviews)
            </Text>
          </View>
          
          <Text style={[styles.price, { color: isDarkMode ? '#f8fafc' : '#0f172a' }]}>
            ${product.price.toFixed(2)}
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={[styles.description, { color: isDarkMode ? '#cbd5e1' : '#334155' }]}>
            {product.description}
          </Text>

          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityLabel, { color: isDarkMode ? '#f8fafc' : '#0f172a' }]}>
              Quantity
            </Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={[styles.quantityButton, { backgroundColor: isDarkMode ? '#334155' : '#f1f5f9' }]}
                onPress={decrementQuantity}
              >
                <Minus size={20} color={isDarkMode ? '#f8fafc' : '#0f172a'} />
              </TouchableOpacity>
              <Text style={[styles.quantityText, { color: isDarkMode ? '#f8fafc' : '#0f172a' }]}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={[styles.quantityButton, { backgroundColor: isDarkMode ? '#334155' : '#f1f5f9' }]}
                onPress={incrementQuantity}
              >
                <Plus size={20} color={isDarkMode ? '#f8fafc' : '#0f172a'} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Button
            title={alreadyInCart ? `Update Cart - $${(product.price * quantity).toFixed(2)}` : `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}`}
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    padding: 0,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  image: {
    width: '80%',
    height: '100%',
  },
  detailsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20,
    flex: 1,
  },
  category: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3B82F6',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    marginBottom: 40,
  },
});