import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import { Link } from "expo-router"
import React, { useCallback, useState } from 'react'
import MaterialIcon from "@expo/vector-icons/MaterialIcons"
import { readDirectoryAsync, documentDirectory } from "expo-file-system"
import { useFocusEffect } from 'expo-router'
import { Video, ResizeMode } from "expo-av"
import { ImageFileExtension, VideoFileExtension } from "@/constants/Media"

interface IMedia {
  name: string,
  path: string,
  type: "image" | "video"
}

export default function index() {
  const [image, setImage] = useState<IMedia[] | []>([])

  useFocusEffect(useCallback(() => {
    setImage([])
    loadFiles()
  }, []))

  const loadFiles = async () => {
    const files = await readDirectoryAsync(documentDirectory!);
    console.log(files);
    files.map(file => {
      if (ImageFileExtension.includes(file.split(".")[1])) {
        setImage(prev => [...prev, { name: file, path: documentDirectory + file, type: "image" }])
      } if (VideoFileExtension.includes(file.split(".")[1])) {
        setImage(prev => [...prev, { name: file, path: documentDirectory + file, type: "video" }])
      }
    })
  }

  console.log("files ==>", image);

  return (
    <View style={styles.container}>
      {
        (image.length > 0)
          ?
          <FlatList
            data={image}
            numColumns={3}
            contentContainerStyle={{ gap: 1 }}
            columnWrapperStyle={{ gap: 1 }}
            refreshing={false}
            onRefresh={loadFiles}
            renderItem={({ item }) => (
              <Link href={`/${item.name}`} asChild>
                <Pressable style={{
                  flex: 1,
                  maxWidth: '33.3%',
                }}>
                  {
                    item.type === "image" ?
                      <Image source={{ uri: item.path }} style={styles.image} />
                      :
                      <Video
                        source={{ uri: item.path }}
                        style={styles.image}
                        resizeMode={ResizeMode.COVER}
                        useNativeControls
                        shouldPlay
                        isLooping
                      />
                  }
                </Pressable>
              </Link>
            )}
          />
          :
          <Text style={styles.text}>No Images Found</Text>
      }

      <Link style={styles.navLinks} href={"/camera"} asChild>
        <Pressable style={styles.cameraIcon}>
          <MaterialIcon name="photo-camera" size={65} color="violet" />
        </Pressable>
      </Link>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: { textAlign: 'center', fontSize: 40 },
  navLinks: { textAlign: 'center', textDecorationLine: "underline" },
  cameraIcon: {
    position: "absolute",
    bottom: 30,
    left: 300,
  },
  image: {
    aspectRatio: 3 / 4,
    borderRadius: 5,
  }
})