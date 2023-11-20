import React, { useState, useEffect } from 'react';
import {View} from 'react-native';
import { emailSignUp } from '../../Model/Firebase/emailSignUp';

const cadastrarEmail = (name, email, password)  => {
    console.log("emailSignUp")
    emailSignUp(name, email, password);  
}

export { cadastrarEmail }