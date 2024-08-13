import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({ text, completed, onComplete, onDelete }) => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={onComplete} style={styles.itemLeft}>
                <View style={completed ? styles.checkmark : styles.square}>
                    {completed && <Text style={styles.checkmarkText}>✓</Text>}
                </View>
                <Text style={[styles.itemText, completed && styles.itemTextCompleted]}>{text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    checkmark: {
        width: 24,
        height: 24,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    itemText: {
        maxWidth: '80%',
    },
    itemTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#A9A9A9',
    },
    deleteButton: {
        marginLeft: 15,
    },
    deleteText: {
        fontSize: 18,
        color: '#FF0000',
    },
});

export default Task;
