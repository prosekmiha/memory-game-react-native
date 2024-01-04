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



  useEffect(() => {
    loadScore()
  }, [])

  const loadScore = async () => {
    const getScore = await AsyncStorage.getItem('bestScore');
    if(JSON.parse(getScore)) {
      setBestScore(JSON.parse(getScore));
    }
  }

  const saveScore = async (turns) => {
    if(bestScore > turns){
      setBestScore(turns)
      await AsyncStorage.setItem('bestScore', JSON.stringify(turns));
    }  

  }

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 20,
  },
  bottomRow: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    justifyContent: 'space-around',
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
    letterSpacing: 0.25,
    color: '#417d69',
    textTransform: 'uppercase',
  },

  
});
