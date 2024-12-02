import { View, StyleSheet } from 'react-native'
import { Camera } from "./Camera"
export default function index() {

    return (
        <View style={styles.container}>
            <Camera />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111"
    },
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