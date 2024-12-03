import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { copyAsync, documentDirectory } from "expo-file-system"
import path from "path"


export const useCamera = () => {
    const [cameraAngle, setCameraAngle] = useState<CameraType>("back");
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions()
    const [picture, setPicture] = useState<string | null>(null)
    const [video, setVideo] = useState<string | null>(null)
    const [mode, setMode] = useState<"picture" | "video">("picture")
    const cameraRef = useRef<CameraView | null>(null)

    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission()
        }
    }, [permission])

    const flipCamera = () => {
        setCameraAngle(cameraAngle === "back" ? "front" : "back")
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setPicture(photo?.uri ?? null)
        }
    }

    const saveMedia = async (fileUri: string) => {
        const fileName = path.parse(fileUri).base
        console.log("==>", fileName)
        await copyAsync({
            from: fileUri,
            to: documentDirectory + fileName
        })
        setPicture(null)
        setVideo(null)
        setIsRecording(false)
        router.push("/")
    }

    const toggleMode = (modeName: "picture" | "video") => {
        setMode(modeName)
    }

    const startRecording = async () => {
        if (cameraRef.current) {
            console.log("record started");
            setIsRecording(true)
            const res = await cameraRef.current.recordAsync({ maxDuration: 5 });
            setVideo(res?.uri ?? null)
            console.log(res);
            setIsRecording(false);
        }
    }

    const stopRecording = async () => {
        if (cameraRef.current) {
            cameraRef.current.stopRecording()
            console.log("Stop recording");
        }
    }

    return { cameraAngle, permission, picture, cameraRef, flipCamera, takePhoto, saveMedia, mode, toggleMode, startRecording, stopRecording, video, isRecording, setIsRecording }
}