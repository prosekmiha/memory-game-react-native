<<<<<<< HEAD
import { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, DevSettings, Dimensions, Modal  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './components/Card';



export default function App() {
  const emojis = [
    	{ "emoji": "🥰", matched: false },
      { "emoji": "🥰", matched: false },
      { "emoji": "🤪", matched: false },
      { "emoji": "🤪", matched: false },
      { "emoji": "😍", matched: false },
      { "emoji": "😍", matched: false },
      { "emoji": "😁", matched: false },
      { "emoji": "😁", matched: false },
      { "emoji": "😈", matched: false },
      { "emoji": "😈", matched: false },
      { "emoji": "🤑", matched: false },
      { "emoji": "🤑", matched: false },
      { "emoji": "😜", matched: false },
      { "emoji": "😜", matched: false },
      { "emoji": "🤨", matched: false },
      { "emoji": "🤨", matched: false },
      { "emoji": "👽", matched: false },
      { "emoji": "👽", matched: false },
      { "emoji": "🤯", matched: false },
      { "emoji": "🤯", matched: false },
      { "emoji": "💩", matched: false },
      { "emoji": "💩", matched: false },
      { "emoji": "🤩", matched: false },
      { "emoji": "🤩", matched: false },
      { "emoji": "😎", matched: false },
      { "emoji": "😎", matched: false },
      { "emoji": "🤢", matched: false },
      { "emoji": "🤢", matched: false },
      { "emoji": "🤫", matched: false },
      { "emoji": "🤫", matched: false },
      { "emoji": "😬", matched: false },
      { "emoji": "😬", matched: false },
      { "emoji": "🥳", matched: false },
      { "emoji": "🥳", matched: false },
      { "emoji": "😵", matched: false },
      { "emoji": "😵", matched: false },
      { "emoji": "🤥", matched: false },
      { "emoji": "🤥", matched: false },
      { "emoji": "🤤", matched: false },
      { "emoji": "🤤", matched: false },
      { "emoji": "🤙", matched: false },
      { "emoji": "🤙", matched: false }
  ]


  const [shufEmojis, setShufEmojis] = useState(emojis.sort(() => (Math.random() > .5) ? 2 : -1));
  const [cards, setCards] = useState(shufEmojis);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [bestScore, setBestScore] = useState(999);


=======
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, Button, FlatList, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function App() {

  

  const [note, setNote] = useState({ text: '', date: '' });
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
>>>>>>> 599ef49 (first commit)

  const [noteColor, setNoteColor] = useState([
  '#fc8691', '#fcc98d', '#fcfc9a', '#a0fab4', '#98d0fa', '#fc8691', '#fcc98d', '#fcfc9a', '#a0fab4', '#98d0fa'

]);

 
  const styles = getStyles();

  useEffect(() => {
<<<<<<< HEAD
    loadScore()
=======
    loadNotes()
    
>>>>>>> 599ef49 (first commit)
  }, [])

  const loadScore = async () => {
    const getScore = await AsyncStorage.getItem('bestScore');
    if(JSON.parse(getScore)) {
      setBestScore(JSON.parse(getScore));
    }
    const colorModeLoad = await AsyncStorage.getItem('colorMode');
    colorModeLoad ? setColorMode(colorModeLoad) : setColorMode('Dark Mode')
    

  }

<<<<<<< HEAD
  const saveScore = async (turns) => {
    if(bestScore > turns){
      setBestScore(turns)
      await AsyncStorage.setItem('bestScore', JSON.stringify(turns));
    }  
=======
  const saveNote = async () => {
    const newNotes = [note, ...notes];
    if(note.text){
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
        setNotes(newNotes);
        setFilteredNotes(newNotes)    
        setNote({ text: '', date: ' '});
        
      } catch (e) {
        console.log(e)
      }  
    }
    
  }

  const deleteNoteAlert = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteNote(index),
        },
      ],
    
    );
>>>>>>> 599ef49 (first commit)

  }
  
  const deleteNote = async (index) => {

    const newNotes = [...notes];
    newNotes.splice(index, 1);

    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    } catch (e) {
      console.log(e)
    }

    setNotes(newNotes);
    setFilteredNotes(newNotes);
    
  };


  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [editedItem, setEditedItem] = useState(0);

<<<<<<< HEAD
  const handleChoice = (card) => {
    choiceOne ? choiceOne != card && setChoiceTwo(card) : setChoiceOne(card);
  }

  const checkMatch = () => {   
    if(choiceOne && choiceTwo) {    
      if(choiceOne.emoji === choiceTwo.emoji){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.emoji === choiceOne.emoji) {
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
      }
      setTurns(turns + 1);
      resetTurn();
      
    }
  }



  const endGame = () => {
    saveScore(turns)
  }
 
  useEffect(() => {
    setTimeout(checkMatch, 450);
    cards.every(card => card.matched) && endGame();

  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  const resetGame = () => {
    resetTurn();
    setTurns(0);
    setCards(shufEmojis);
    setShufEmojis(emojis.sort(() => (Math.random() > .5) ? 2 : -1))
  }

  return (  
    <View style={styles.container}>
      <StatusBar/>     
      <View style={styles.gameContainer}>
        <Text style={styles.title}>Move counter: {turns}</Text>
        <View style={styles.game}>
          {
          cards.map((emoji, index) => {
              return (   
                <TouchableOpacity style={styles.card} key={index}>
                  <Card key={index} index={index} emoji={emoji} handleChoice={handleChoice} flipped={emoji === choiceOne || emoji === choiceTwo || emoji.matched}/>          
                </TouchableOpacity>         
              )
            })
          }
        </View>
        <View style={styles.bottomRow}>
          <Pressable style={styles.button} onPress={() => resetGame()}>
            <Text style={styles.buttonText}>Reset game</Text>
          </Pressable>
          <Text style={styles.text}>Best score: {bestScore == 999 ? <Text></Text> : bestScore}</Text>
        </View>
      </View>
=======
  const Item = ({item, index}) => (
      

      <View style={[styles.note, { backgroundColor: noteColor[index > 9 ? index % 10 : index]}]} >   
        <Text style={styles.item}>{item.text}</Text>  
        <View style={styles.deleteBtnRow}>
          <Text style={styles.date}>{item.date}</Text>  
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather  onPress={() => {setIndex(index), setModalVisible(true), setInputText(item.text)}} name="edit" size={25} color="black" />
            <AntDesign onPress={() => deleteNoteAlert(index)} name="delete" size={25} color="black" />
          </View>
        </View> 
      </View>

  );

  const handleEditItem = async (newText) => {
    filteredNotes[index].text = newText;
    await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes))
    setFilteredNotes(filteredNotes)
  }


  const handleFilter = (text) => {

    if(text) { 
      let filteredNote = notes.filter((note) => note.text.toLowerCase().includes(text.toLowerCase()))
      setFilteredNotes(filteredNote);
    } else {
      setFilteredNotes(notes);
    }
  }

    const [colorMode, setColorMode] = useState();

    const themeColorMode = async () => {
      colorMode == 'Light Mode' ? setColorMode('Dark Mode') : setColorMode('Light Mode');
      colorModeBtnPosition == 'flex-end' ? setColorModeBtnPosition('flex-start') : setColorModeBtnPosition('flex-end')
      await AsyncStorage.setItem('colorMode', colorMode == 'Dark Mode' ? 'Light Mode' : 'Dark Mode')
    }
    const [colorModeBtnPosition, setColorModeBtnPosition] = useState('flex-end');
 
  return (
    
    <View style={[styles.container, { backgroundColor: colorMode == 'Dark Mode' ? 'black' : 'white' }]}> 
      <StatusBar backgroundColor={ colorMode == 'Dark Mode' ? 'black' : 'white' } style={colorMode == 'Dark Mode' ? 'light' : 'dark'}/>


      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colorMode != 'Dark Mode' ? 'black' : 'white' }]}>Notes</Text>
        <TouchableOpacity onPress={() => themeColorMode()} style={[styles.colorModeBtnView, { alignItems: colorModeBtnPosition, borderColor: colorMode != 'Dark Mode' ? 'black' : 'white' }]}>
          <View style={[styles.colorModeBtnCircle, { borderColor: colorMode != 'Dark Mode' ? 'black' : 'white' }]}>
            <FontAwesome5 style={{ position: 'absolute' }} name="moon" size={18} color="white" />
            <Feather style={{ position: 'absolute', display: colorMode == 'Dark Mode' ? 'none' : 'flex' }} name="sun" size={18} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.search}>
        <TextInput style={{ fontSize: 14 }} placeholder='Search notes' onChangeText={(text) => handleFilter(text)}/>
      </View>
      
      <View style={[styles.notes , { backgroundColor: colorMode == 'Dark Mode' ? 'black' : 'white' }]}>         
        <View style={styles.newNote}>       
          <TextInput style={styles.newNoteText} placeholder='New note text' value={note.text} onChangeText={(text) => setNote({ ...note, text: text, date: new Date().toLocaleDateString() })} multiline/>
          <TouchableOpacity>
            <Text style={styles.saveBtn} onPress={saveNote}><FontAwesome name="save" size={25} color="black" /></Text>
          </TouchableOpacity>       
        </View>
        <FlatList style={styles.flatlist} data={filteredNotes} renderItem={Item} contentContainerStyle={{ paddingBottom: 150 }} /> 
      </View>

      <Modal animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
        <View style={styles.modal}>
          <View style={[styles.modalView, { backgroundColor : noteColor[index > 9 ? index % 10 : index]}]}>   
            <View style={styles.textInput}>
              <TextInput
                style={styles.textEditInput}
                onChangeText={(text) => setInputText(text)}
                defaultValue={filteredNotes[index]?.text}
                editable = {true}
                multiline = {true}
                
                />
            </View>
            <View style={styles.editTextBtnRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)} 
                underlayColor={'#f1f1f1'}>
                <MaterialCommunityIcons name="close-box-outline" size={45} color="black" />
              </TouchableOpacity>    
              <TouchableOpacity onPress={() => {handleEditItem(inputText); setModalVisible(false)}} 
                underlayColor={'#f1f1f1'}>
                <MaterialCommunityIcons name="checkbox-outline" size={45} color="black" />
              </TouchableOpacity>
            </View>
          </View> 
        </View>          
      </Modal> 
      
>>>>>>> 599ef49 (first commit)
    </View>
  );
}

const getStyles = () => StyleSheet.create({
  container: {
<<<<<<< HEAD
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a3c2f',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  gameContainer: {
    position: 'relative',
    height: '90%',
    width: '95%',
    maxWidth: 550,
    backgroundColor: '#0d614b',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 6,
  },
  game: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    aspectRatio: '6/7'
=======
    height: '100%',
    width: '100%',
    maxWidth: 1000,
    alignItems: 'center',
    padding: 5,
    paddingTop: 30,
    margin: 'auto',
  },
  titleRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  title: {
    fontSize: 35,
    color: 'white',  
  },
  search: {
    backgroundColor: '#e3e3e3',
    width: '99%',
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  notes: {
    width: '100%',
    height: '100%',
    padding: 2,
    paddingBottom: 20,
  },
  note: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 100,
    paddingTop: 15,
    borderRadius: 15,
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: 'center',
  },
  newNote: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'lightblue',
    width: '100%',
    minHeight: 70,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  newNoteText: {
    width: '88%',
    fontSize: 14,
  },
  saveBtnRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: 3,
    marginTop: 5,
>>>>>>> 599ef49 (first commit)
  },
  card: {
    position: 'relative',
    width: '15%',
    aspectRatio: '1/1'
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
<<<<<<< HEAD
    marginBottom: 20,
=======
    textAlign: 'center',
    
>>>>>>> 599ef49 (first commit)
  },
  bottomRow: {
    display: 'flex',
<<<<<<< HEAD
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    justifyContent: 'space-around',
=======
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    marginTop: 5,
    paddingBottom: 10,
>>>>>>> 599ef49 (first commit)
  },
  text: {
    fontSize: 16,   
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 6,
    backgroundColor: '#0a3c2f',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
<<<<<<< HEAD
    letterSpacing: 0.25,
    color: '#417d69',
    textTransform: 'uppercase',
  },
=======
    borderRadius: 10,
    textAlign: 'center'

  },
  editBtn: {
    width: 60,
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 10,
    textAlign: 'center'
  },
  modal: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    
  },
  modalView: {
    display: 'flex',
    height: 300,
    width: '96%',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    width: '95%',
    height: '80%',
    padding: 10,
    paddingTop: 20,
    paddingLeft: 20,
  },

  editTextBtnRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%'
  },
  editTextBtn: {

    width: 100,
    height: 40,
    margin: 20,
    fontWeight: 'bold',
    margin: 'auto',
    textAlign: 'center',
    fontSize: 15,
    padding: 8,
    
  },
  item: {
    fontSize: 16,
  },
  colorModeBtnView: {
    position: 'relative',
    borderWidth: 1.5,
    height: 35,
    width: 55,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 3,
    paddingRight: 3,

  },
  colorModeBtnCircle: {
    position: 'relative',
    borderWidth: 1,
    width: 27,
    height: 27,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

>>>>>>> 599ef49 (first commit)

  
});
