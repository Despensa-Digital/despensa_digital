import { Avatar, PaperProvider, Text } from "react-native-paper";
import { View } from 'react-native';
import * as React from 'react';

const ProfileAvatar = ({profileKey, name, photo}) => {


    const photoDefault = require('../../../Assets/ProfileThumbnail/palmirinha.png');

    return(
        <View style={{margin: 5}} key={profileKey}>
            {/* Caso as fotos não venham com background, alterar o background color */}
            {photo && photo ? (
            <Avatar.Image source={{ uri: photo }} style={{ backgroundColor: 'yellow' }} size={70} />
            ) : (
            <Avatar.Image source={photoDefault} style={{ backgroundColor: 'yellow' }} size={70} />
            )}
            {/* <Avatar.Image source={{uri: photo}} style={{backgroundColor: 'yellow'}} size={70}/> */}
            <Text variant="titleSmall" style={{textAlign:'center'}}>{name}</Text>
        </View>
      
 
    );
}

export default ProfileAvatar;