import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcon from "@expo/vector-icons/MaterialIcons"
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { useCamera } from '@/hooks/useCamera'

export  const Camera = () =>{
    const { permission, picture, side, cameraRef, flipCamera, takePhoto } = useCamera()

    if (picture) {
        return <View>
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: picture }} />
        </View>
    }

    if (!permission) {
        return <View>
            <Text>Camera Loading</Text>
        </View>
    }

    return (
        <CameraView ref={cameraRef} facing={side} style={styles.camera}>
            <MaterialIcon style={styles.clickPhoto} name="camera" size={65} color="white" onPress={takePhoto} />
            <MaterialIcon style={styles.flipCamera} name="camera-front" size={50} color="white" onPress={flipCamera} />
        </CameraView>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    clickPhoto: {
        position: "absolute",
        bottom: 30,
        left: 150,
    },
    flipCamera: {
        position: "absolute",
        top: 90,
        right: 50,
    }
})