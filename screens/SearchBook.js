import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native'

import db from '../config.js';

export default class SearchBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allTransactions: [],
            lastVisibleTransaction: null,
            search: ""
        }
    }

    fetchMoreTransactions = async () => {
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")
        
        if(enteredText[0].toUpperCase() === "B") {
            const query = await db.collection('transactions').where('bookId', '==', text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc) => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastVisibleTransaction: doc,
                })
            })
        } else if(enteredText[0].toUpperCase() === "S") {
            const query = await db.collection("transactions").where('bookId', '==', text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc) => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        }
    }

    searchTransactions = async (text) => {
        var enteredText = text.split("")

        if(enteredText[0].toUpperCase() === "B") {
            const transaction = await db.collection('transactions').where('bookId', '==', text).get()
            transaction.docs.map((doc) => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        } else if(enteredText[0].toUpperCase() === "S") {
            const transaction = await db.collection('transactions').where('bookId', '==', text).get()
            transaction.docs.map((doc) => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        }
    }

    componentDidMount = async () => {
        const query = await db.collection('transactions').limit(10).get()
        query.docs.map((doc) => {
            this.setState({
                allTransactions: [],
                lastVisibleTransaction: doc
            })
        })
    }

    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', textAlign: 'center'}}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchInput} placeholder="Enter Book Id" 
                    onChangeText={(text) => {this.setState({search: text})}}
                    />
                    <TouchableOpacity style={styles.searchBtn} onPress={() => {this.searchTransactions(this.state.search)}}><Text>Search</Text></TouchableOpacity>
                </View>

                <FlatList data={this.state.allTransactions}
                renderItem={({item}) => (
                    <View style={{borderBottomWidth: 3}}>
                        <Text>{"Book Id: " + item.bookId}</Text>
                        <Text>{"Student Id: " + item.studentId}</Text>
                        <Text>{"Transaction Type: " + item.transactionType}</Text>
                        <Text>{"Date: " + item.date.ToDate()}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.fetchMoreTransactions}
                onEndReachedThreshold={0.7}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        height: 40, 
        width: 'auto',
        borderWidth: 0,
        alignItems: 'center', 
        backgroundColor: 'white',
        marginTop: 100
    },
    searchInput: {
        borderWidth: 2,
        height: 50,
        width: 300,
        paddingLeft: 10,
        borderRadius: 5 
    },
    searchBtn: {
        borderWidth: 1, 
        height: 50,
        width: 100,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        marginLeft: 20,
        borderRadius: 5
    }
})