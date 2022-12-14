import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React, {Component} from 'react'
import Post from '../../components/Post/Post'
import {db} from '../../firebase/config'
// import Camara from '../../components/Camara/Camara'
import Comments from '../Comments/Comments'
class Home extends Component {
  constructor(){
    super()
    this.state={
      allPosts:[],
      loading: true
    }
  }

  componentDidMount(){
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .onSnapshot(docs => {
      let publicaciones = []
      docs.forEach(doc => {
        publicaciones.push({
          id:doc.id,
          data:doc.data()
        })
      })


    this.setState({
      allPosts: publicaciones,
      loading: false
    })

    })
  }

  render(){
    return (
      <>
        <View style={styles.container3}>
          {!this.state.loading ? 
          <>
          <FlatList
            style={styles.container2}
            data={this.state.allPosts}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Post id={item.id} data={item.data} />}
          />
          <View>
            <Text>Cantidad de Posts: {this.state.allPosts.length}</Text>
          </View>
          </>
          : <Text>loading</Text>}
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    justifyContent:'right',
    alignItems:'right',
      color: '#34434D',
  fontSize: 80,
  fontWeight:  'bold',
  
  
  },
  container2:{
    width: '90%',
    
  },
  container3:{
    flex:5,
    alignItems:'center',

  },
  image:{
    height: 300
  },
  post:{

  }
  
})

export default Home