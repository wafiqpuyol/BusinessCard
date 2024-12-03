import { View, Text, StyleSheet, Image } from 'react-native'
import MaterialIcon from "@expo/vector-icons/MaterialIcons"
import { CameraView } from 'expo-camera'
import { useCamera } from '@/hooks/useCamera'
import { Video } from "expo-av"

export const Camera = () => {
    const { permission, picture, cameraAngle, cameraRef,
        flipCamera, takePhoto, saveMedia, mode, toggleMode,
        startRecording, stopRecording, video, isRecording } = useCamera()

    const handleSaveMediaOnPress = () => {
        console.log(picture, video);
        if (picture) {
            saveMedia(picture)
        }
        if (video) {
            saveMedia(video)
        }
    }

    const handlePress = () => {
        isRecording ? stopRecording() : takePhoto()
    }

    if (picture || video) {
        return <View style={{ flex: 1 }}>
            {/* <SafeAreaView edges={["bottom"]}> */}
            <View style={styles.saveImageIcon}>
                <MaterialIcon name="save" size={50} color="white" onPress={handleSaveMediaOnPress} />
            </View>
            {/* </SafeAreaView> */}
            {picture && <Image style={styles.image} source={{ uri: picture }} />}
            {video && <Video style={styles.image} source={{ uri: video }} />}
        </View>
    }

    if (!permission) {
        return <View>
            <Text>Camera Loading</Text>
        </View>
    }


    return (
        <CameraView ref={cameraRef} facing={cameraAngle} style={styles.camera} mode={mode}>
            <View style={styles.clickPhoto}>
                <View>
                    <Text selectable={mode === "picture"} style={[styles.text, { left: -35 }, mode === "picture" && styles.selectedText]} onPress={() => toggleMode("picture")}>Photo</Text>
                    <Text selectable={mode === "video"} style={[styles.text, { left: 50 }, mode === "video" && styles.selectedText]} onPress={() => toggleMode("video")}>Video</Text>
                </View>
                <MaterialIcon
                    name={mode === "picture" ? "camera" : "videocam"}
                    size={65}
                    color={mode === "picture" ? "white" : "red"}
                    onPress={handlePress}
                    onLongPress={startRecording}
                />
            </View>
            <MaterialIcon style={styles.flipCamera} name="camera-front" size={50}
                color="white" onPress={flipCamera} />
        </CameraView >
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
    },
    image: {
        width: "100%",
        flex: 1
    },
    saveImageIcon: {
        padding: 10,
    },
    text: { fontSize: 20, color: "white", position: "absolute", bottom: 30, },
    selectedText: { backgroundColor: "#111344dd", padding: 5, borderRadius: 5, }
})