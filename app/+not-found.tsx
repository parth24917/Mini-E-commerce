import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.link}>
          <Text style={styles.text}>Go to home screen </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    backgroundColor: 'purple',
    padding: 45,
    borderRadius: 10,

  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    
  },
});
