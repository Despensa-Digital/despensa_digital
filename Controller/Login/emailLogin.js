import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { emailSignIn } from '../../Model/Firebase/emailSignIn';
import {View} from 'react-native';
import { signOut } from '../../Model/Firebase/signOut';

const EmailLogin = (email, password)  => {

    console.log('emailLogin:' + email + password);
    
    emailSignIn(email, password);
    
}

export { EmailLogin }