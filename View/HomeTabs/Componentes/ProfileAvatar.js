import { Avatar, PaperProvider, Text } from "react-native-paper";
import { View } from 'react-native';
import * as React from 'react';

const ProfileAvatar = ({profileKey, name, photo}) => {
    
    return(
        <View style={{margin: 5}} key={profileKey}>
            {/* Caso as fotos não venham com background, alterar o background color */}
            <Avatar.Image source={photo} style={{backgroundColor: 'yellow'}} size={70}/>
            <Text variant="titleSmall" style={{textAlign:'center'}}>{name}</Text>
        </View>
      
 
    );
}

export default ProfileAvatar;