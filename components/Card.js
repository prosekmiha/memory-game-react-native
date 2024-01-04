import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Pressable } from 'react-native'

export default function App({ emoji, index, handleChoice, flipped }) {

    const clickHandle = () => {
        handleChoice(emoji)
    }

    return (
        <>
            <Pressable onPress={() => clickHandle(index)}>
                <View key={index} style={styles.card}>
                    <View style={!flipped ? styles.closed : styles.opened} />
                    <Text style={styles.emoji}>{emoji.emoji}</Text>
                </View>
            </Pressable>
        </>

    )
};

const styles = StyleSheet.create({
    emoji: {
        fontSize: 30,   
    },
    card: {
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',    
    },
    closed: {
        position: 'absolute',
        width: '100%',
        aspectRatio: '1/1',
        backgroundColor: '#417d69',
        zIndex: 99,           
    },
    opened: {
        position: 'absolute',
        width: '100%',
        aspectRatio: '1/1',
        display: 'none',       
    }

});