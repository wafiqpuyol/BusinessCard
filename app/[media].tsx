import { View, Image } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { deleteAsync, documentDirectory } from "expo-file-system"
import MaterialIcon from "@expo/vector-icons/MaterialIcons"

export default function imageRender() {
    const { media } = useLocalSearchParams()
    const deleteImage = async () => {
        console.log(documentDirectory);
        await deleteAsync(documentDirectory! + media)
        router.back()
    }

    return (
        <View style={{ flex: 1, }}>
            <Stack.Screen options={{
                headerRight: () => (
                    <View style={{ gap: 10, flexDirection: 'row' }}>
                        <MaterialIcon
                            onPress={deleteImage}
                            name="delete"
                            size={26}
                            color="crimson"
                        />
                    </View>
                ),
            }} />
            <Image source={{ uri: documentDirectory! + media }} style={{ width: "100%", height: "100%" }} />
        </View>
    )
}