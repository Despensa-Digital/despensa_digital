
import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar,Text } from 'react-native-paper';

const MessageSnackBar = ({visible, setVisible, message, icon}) =>{
    return(
        <Snackbar
            style={{ position: 'absolute', left: 0, right: 0, bottom: 10, marginLeft:10 }}
            visible={visible}
            onDismiss={()=> setVisible(false)}
            duration={Snackbar.DURATION_SHORT}
            action={{
                icon: icon
            }}
        >
            <Text 
                style={{
                    color:'white'
                }}
            >{message}</Text>
        </Snackbar>
    )
}

export default MessageSnackBar;