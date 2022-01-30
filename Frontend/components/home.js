import React from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, Pressable, TextInput, TouchableOpacity} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import List from './list'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import GroceryList from './listElements/GroceryList'
import axios from 'axios';


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
        needUpdate: false,
        priceData: [],
        locationData:[],
        submitted:[

        ],

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

                let submit = this.state.currentTodo.submitted;
                let copySubmit = this.state.submitted;
                copySubmit[i] = submit;
                this.setState({submitted: copySubmit})
                
              }
            }
        }
        for(var i = 0; i < copy.length; i++)
        {
            if(copy[i].index === num)
            {
              this.setState({currentList: copy[i]})
              this.setState({listOpen: true})
              var row = {date: copy[i].date, todos: this.state.todos2D[i], submitted: this.state.submitted[i]}
              this.setState({currentTodo: row}) // when clicking on new tab, set currentTodo to new tab name and todos to cur
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
      this.setState({
        currentList: newRow
      })
      let todosRow = []
      this.setState({
        todos2D: [...this.state.todos2D, todosRow]
      })
      let submitRow = false;
      this.setState({
        submitted: [...this.state.submitted, submitRow]
      })
      
     }
     updateState(data) {
      
      if(!this.state.timer)
      {
        var date = this.state.currentTodo.date;
        var submit = this.state.currentTodo.submitted
        let row = {date: date, todos: data, submitted: submit}
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
        let copyCurr = this.state.currentTodo;
        copyCurr.date = text;
        this.setState({data: copy});
        this.setState({currentTodo : copyCurr});
     }
     formatData = () => {
       console.log(this.state.currentTodo)
       let copy = this.state.data;
       let name = this.state.currentList.date;
       let array = []

        this.setState({needUpdate: true})
        let x = this.state.currentTodo.todos;
        for(var i = 0; i < Object.keys(x).length; i++)
        {
            array.push(x[i].value)
        }
        this.setState({needUpdate: false})
        var date = this.state.currentTodo.date;
        var data = this.state.currentTodo.todos
        var row = {date: date, todos: data, submitted: true};
        this.setState({currentTodo:row})
       let ans = 
       {name : name,
        username: "username",
        groceryList : array
      }
      axios.post("https://us-central1-vernal-bonfire-303320.cloudfunctions.net/get-cheapest-prices", ans).then(res => {
        this.setState({locationData: res.data.stores})
         this.setState({priceData: res.data.prices})})

      console.log(this.state.priceData);
      console.log(this.state.locationData);
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
                <View style = {{paddingTop: 20}}>
                  <Text style = {{
                    alignSelf: "center", paddingBottom: 10, fontSize: 30, right: 15, 
                    fontFamily: "Poppins", textDecorationLine: "underline", color: "midnightblue"
                    }}>Name</Text>
                <View style = {{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                  {this.state.isEditing ? 
                  <TextInput autoFocus style = {{textAlign:"center",  fontSize: 25, fontFamily: "Poppins", paddingRight: 10}}
                  onChangeText = {(text) => this.updateName(text)}
                  onBlur={() => this.setState({ isEditing: false })}
                  >
                    {this.state.currentList.date}
                  </TextInput> :
                  <Text style = {{textAlign:"center",  fontSize: 25, fontFamily: "Poppins", paddingRight: 10}}>
                    {this.state.currentList.date}
                  </Text>}
                  <Pressable onPress = {() => this.setState({isEditing: true})}>
                    {this.state.isEditing ? <FontAwesome name = "pencil" color = "black" size = {35}/> :                   
                      <FontAwesome name = "pencil" color = "#a9a9a9" size = {35}/>
                    }
                  </Pressable>
                </View></View>}
              </View>
              {this.state.listOpen && <GroceryList key={this.state.needUpdate ? "FORCE" : this.state.currentTodo.date} 
              todos = {this.state.currentTodo.todos} updateParentState={this.updateState.bind(this)} prices = {this.state.priceData}
              location = {this.state.locationData} submitted = {this.state.currentTodo.submitted}/>}
              {this.state.listOpen && <View style = {{height: 70, backgroundColor:"#f5f5f5"}}>
                <TouchableOpacity style = {{position: "absolute", bottom: 10, alignSelf: "center"}} onPress = {()=> this.formatData()} >
                <Text style = {{fontSize: 30, fontFamily: "Poppins", padding: 2, paddingLeft: 10, paddingRight: 10,
                borderWidth: 2, borderRadius: 25}}>Submit</Text>
              </TouchableOpacity>
              </View>}

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