'use strict'

import {AsyncStorage} from 'react-native';

global.AppState = {
	load: async (success) => {
		var currentUser = await AsyncStorage.getItem('currentUser');
    AppState.currentUser = JSON.parse(currentUser)
		success()
	},
	set: (key, value, callback) => {
		AppState[key] = value
		AsyncStorage.setItem(key, JSON.stringify(value), callback)
	},
	remove: (key, callback) => {
		delete AppState[key]
		AsyncStorage.removeItem(key, callback)
	}
}
