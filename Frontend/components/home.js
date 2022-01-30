import React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, Pressable, TextInput} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import List from './list'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import GroceryList from './listElements/GroceryList'
import 'core-js/es6/symbol'; import 'core-js/fn/symbol/iterator';



let customFonts = {
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Poppins' : require('../assets/fonts/Poppins-Medium.ttf')
  };

class home extends React.Component{
    state = {
        fontsLoaded: false,
        selectedList: 0,
        selectListCounter: 0,
        data:[],
        viewList:[

        ],
        currentList:[
        ],
        listOpen : false,
        isEditing: false,
        todos2D:[],
        currentTodo:{}
        ,
        timer: false,

      };
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }
    
     handleSelectedList=(num)=>{

        this.setState({selectedList : num});
        let copy = this.state.data;
        if(this.state.listOpen)
        {
            for(var i = 0; i < copy.length; i++)
            {
              if(copy[i].date === this.state.currentTodo.date) //if switched off tab, we need to save that tabs info
              {
                let cur = this.state.currentTodo.todos;
                let copy2D = this.state.todos2D;
                copy2D[i] = cur;
                this.setState({todos2D: copy2D});
              }
            }
        }
        for(var i = 0; i < copy.length; i++)
        {
            if(copy[i].index === num)
            {
              this.setState({currentList: copy[i]})
              this.setState({listOpen: true})
              var row = {date: copy[i].date, todos: this.state.todos2D[i]}
              this.setState({currentTodo: row}) // when clicking on new tab, set currentTodo to new tab name and todos to cur
              console.log(this.state.currentTodo)
            }
        }

     } 
     addListButtons =(_date, _index)=>{
      this.setState({selectListCounter: ++_index})
      var num = "";
      var check = false;
      let copy = this.state.data;
      for(var i = 0; i < copy.length; i++)
      {
        if(copy[i].date === _date)
        {
            check = true;
            break;
        }
      }
      if(check)
      {
        for(var i = 0; i < copy.length; i++)
        {
          if(copy[i].date.substring(0,8) === _date)
          {
            if(copy[i].date.length == 8)
            {
                num = "1"
            }
            else{
              var num = copy[i].date.split("#")[1];
              var num = parseInt(num);
              num++;
            }
          }
        }
      }
      if(num != "")
      {
        _date += (" #" + num);
      }
      let newRow = {date: _date, index : _index};
      this.setState({
        data: [...this.state.data, newRow]
      });
      let todosRow = []
      this.setState({
        todos2D: [...this.state.todos2D, todosRow]
      })
      
     }
     updateState(data) {
      
      if(!this.state.timer)
      {
        var date = this.state.currentTodo.date;
        let row = {date: date, todos: data}
        this.setState({
        currentTodo: row 
      })
      }
    }
     getDate(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var year = yyyy.toString().slice(-2);
      today = mm + '/' + dd + '/' + year;
      return today;
     }
     updateName = (text) => {
        let copy = this.state.data;
        let row = this.state.currentList;
        for(var i = 0; i < copy.length; i++)
        {
          if(copy[i] === row)
          {
              copy[i].date = text;
          }
        }
        this.setState({data: copy});
     }
    render()
    {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          }
        let listButtons = this.state.data.map((item) => {
          return (
            <View>
                <Pressable style = {{paddingRight: 10,}} onPress = {() => this.handleSelectedList(item.index)}>
                  <List key = {item} date = {item.date} color = {this.state.selectedList === item.index ? "#36454F" :"#7393B3"}></List>
                </Pressable>
            </View>
            
          )
        });
        return(

            <View style = {homeStyles.container}>
              <View style = {homeStyles.left}>
                <Text style = {homeStyles.titleText}>Shopping List</Text>
                <View style = {{display:"flex", flexDirection:"row"}}>
                  <Text style = {homeStyles.subTitleText}>My Lists</Text>
                  <Pressable onPress = {() => this.addListButtons(this.getDate(), this.state.selectListCounter)}>
                    <Feather name= "plus-circle" color= "black" size={35} style = {{paddingRight: 20}}/>
                  </Pressable>
                </View>



                <ScrollView horizontal = {true} showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
                  {listButtons}
                </ScrollView>


                {this.state.listOpen && 
                <View style = {{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", paddingTop: 10}}>
                  {this.state.isEditing ? 
                  <TextInput autoFocus style = {{textAlign:"center",  fontSize: 30, fontFamily: "Poppins", paddingRight: 10}}
                  onChangeText = {(text) => this.updateName(text)}
                  onBlur={() => this.setState({ isEditing: false })}
                  >
                    {this.state.currentList.date}
                  </TextInput> :
                  <Text style = {{textAlign:"center",  fontSize: 30, fontFamily: "Poppins", paddingRight: 10}}>
                    {this.state.currentList.date}
                  </Text>}
                  <Pressable onPress = {() => this.setState({isEditing: true})}>
                    {this.state.isEditing ? <FontAwesome name = "pencil" color = "black" size = {35}/> :                   
                      <FontAwesome name = "pencil" color = "#a9a9a9" size = {35}/>
                    }
                  </Pressable>
                </View>}
              </View>
              {this.state.listOpen && <GroceryList key={this.state.currentTodo.date} todos = {this.state.currentTodo.todos} updateParentState={this.updateState.bind(this)}/>}

            </View>
        )
    }
}
export default home;


// StyleSheet for Home Page
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const homeStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        zIndex: -1,
        height: "100%"
    },
    left: {
      marginLeft: width / 11,
      backgroundColor: "#f5f5f5",
      overflow: 'hidden'
    },
    titleText: {
        marginTop: height / 12,
        fontSize : 40,
        fontFamily: "Poppins",
        fontWeight: '700',
        color: "black",
        overflow:'hidden',
        paddingBottom: 20,
    },
    subTitleText:{
      fontSize: 30,
      paddingBottom: 10,
      flex : 1,
    },
    listContainer : {
      display: "flex",
      flexDirection: "row",
    },
    myList : {
      paddingRight: 10,
    }
});