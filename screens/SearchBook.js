import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

export default class SearchBook extends React.Component {
    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', textAlign: 'center'}}>
                <Text>Search For A Book</Text>
            </View>
        )
    }
}