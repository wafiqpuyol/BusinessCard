import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";

export const useCamera = () => {
    const [side, setSide] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions()
    const [picture, setPicture] = useState<string | null>(null)
    const cameraRef = useRef<CameraView | null>(null)

    useEffect(() => {
        if (permission && !permission.granted && !permission.canAskAgain) {
            requestPermission()
        }
    }, [permission])

    const flipCamera = () => {
        setSide(side === "back" ? "front" : "back")
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setPicture(photo?.uri ?? null)
        }
    }

    return { side, permission, picture, cameraRef, flipCamera, takePhoto }
}