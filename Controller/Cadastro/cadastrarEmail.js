import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';

import { emailSignUp } from '../../Model/Firebase/emailSignUp';


const cadastrarEmail = (name, email, password)  => {

    emailSignUp(name, email, password);  
}

export { cadastrarEmail }