import { View, Text, StyleSheet } from 'react-native'
import { Link } from "expo-router"
import React from 'react'

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Link style={styles.navLinks} href={"/camera"}>Camera</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: { textAlign: 'center', fontSize: 40 },
  navLinks: { textAlign: 'center', textDecorationLine: "underline" },
})