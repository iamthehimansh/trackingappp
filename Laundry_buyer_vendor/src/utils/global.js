import { StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils';
const globalCss = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    btncontainer : {
        width : windowWidth / 1.4,
        borderRadius : 20,
        height : 50,
        overflow : 'hidden',
        marginTop : 20
    },
    btnbackground : {
       width : '100%',
       height : '100%', 
       borderRadius : 20,
       alignItems : 'center',
       justifyContent : 'center',
       
      },
      btntext : {
          fontSize : 18,
          fontFamily : 'TitilliumWeb-Bold',
          color : '#FFFFFF'
      }
})

export default globalCss;