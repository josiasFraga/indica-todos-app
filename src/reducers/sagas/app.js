import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {callApi} from '@services/api';
import AlertHelper from '@components/Alert/AlertHelper';
import CONFIG from '@constants/configs';
import NetInfo from "@react-native-community/netinfo";
import { getUniqueId } from 'react-native-device-info';

function* registerTrigger({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você só pode fazer um cadastro quando estiver com conexão a internet.',
		  );
		  return true;
	}

	//const notifications_id = yield JSON.parse(yield AsyncStorage.getItem('oneSignalToken'))?.userId;

	console.log('[SAGA] - CADASTRANDO USUÁRIO');
	console.log(payload.submitValues);
	
	let data = new FormData();
	let dados = payload.submitValues;
	//dados.notificacao_token = notifications_id;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/users/add.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [CADASTRANDO USUÁRIO]', response);

		if ( response.data.status == 'ok' ) {
			yield payload.callback_success();
		} else {
			if ( response.data.error && response.data.error.email ) {
				yield AlertHelper.show('warning', 'Atenção',  'O email que você está tentando cadastrar já está sendo usado por outro usuário.');

			} else {

				yield AlertHelper.show('error', 'Erro',  response.data.msg);
			}
		}
		yield payload.setSubmitting(false);

	} catch ({message, response}) {
		console.error('[SAGA] - [CADASTRANDO USUÁRIO]', { message, response });
		yield AlertHelper.show('error', 'Erro', message);
		yield payload.setSubmitting(false);
	}
}

function* login({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você só pode logar quando seu dispositivo quando estiver conectado a internet.',
		  );
		  return true;
	}


	console.log('[SAGA] - LOGANDO');
	console.debug(payload.submitValues);
	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/auth/login.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [LOGANDO]', response);

		if ( response.status == 200 ) {
			yield put({
				type: 'LOGIN_SUCCESS',
				payload: true,
			});

			console.log('[SAGA] - TOKEN ' + response.data.token);

			yield AsyncStorage.setItem('bearerToken', response.data.token);
			yield AsyncStorage.setItem('userType', response.data.type);
			yield AsyncStorage.setItem('servicesExist', response.data.services_exist);
			yield AsyncStorage.setItem('bearerTokenValidade', String(response.data.validation));

			yield payload.callback_success();

		} else {
			AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOGIN_FAILED',
				payload: true,
			});

		}
		yield payload.setSubmitting(false);

	} catch ({message, response}) {

		if ( response.status == 401 ) {

			AlertHelper.show('error', 'Erro', 'Login e/ou senha inválidos!');
			yield put({
				type: 'LOGIN_FAILED',
				payload: true,
			});
			yield payload.setSubmitting(false);
			return false;
		}
		console.error('[SAGA] - [LOGANDO]', { message, response });

		AlertHelper.show('error', 'Erro', message);
		yield put({
			type: 'LOGIN_FAILED',
			payload: true,
		});
		yield payload.setSubmitting(false);
	}
}

function* loadUserLocation({payload}) {

	console.log('carregando localização do usuário');

	const networkStatus = yield NetInfo.fetch();

	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Sem conexão com a internet.',
		  );
		  return true;

	}
	
	const deviceId = yield getUniqueId();

	const params = {
		device_id: deviceId
	};

	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/user-locations/last.json',
			method: 'GET',
			params: params
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_USER_LOCATION_SUCCESS',
					payload: response.data.data == null ? {} : response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_USER_LOCATION_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_USER_LOCATION_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD USER LOCATION]', {message, response});
			yield put({
				type: 'LOAD_USER_LOCATION_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* saveUserLocation({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - SALVANDO LOCALIZAÇÃO DO USUÁRIO');
	console.log(payload.submitValues);

	const deviceId = yield getUniqueId();
	
	let data = new FormData();
	let dados = payload.submitValues;
	dados.device_id = deviceId;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/user-locations/add.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [CADASTRANDO LOCALIZAÇÃO DO USUÁRIO]', response);

		if ( response.data.status == 'ok' ) {

			yield payload.callback_success();
		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [CADASTRANDO LOCALIZAÇÃO DO USUÁRIO]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}
}

function* loadServiceCategories({payload}) {

	console.log('carregando categorias');

	const networkStatus = yield NetInfo.fetch();

	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Sem conexão com a internet.',
		  );
		  return true;

	}


	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/service-categories/index.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_SERVICE_CATEGORIES_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_SERVICE_CATEGORIES_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_SERVICE_CATEGORIES_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD SERVICE CATEGORIES]', {message, response});
			yield put({
				type: 'LOAD_SERVICE_CATEGORIES_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* loadServiceProviders({payload}) {

	console.log('carregando prestadores');

	const networkStatus = yield NetInfo.fetch();

	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Sem conexão com a internet.',
		  );
		  return true;

	}

	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/service-providers/index.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_SERVICE_PROVIDERS_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_SERVICE_PROVIDERS_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_SERVICE_PROVIDERS_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD SERVICE PROVIDERS]', {message, response});
			yield put({
				type: 'LOAD_SERVICE_PROVIDERS_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* saveVisit({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - SALVANDO VISITA A PÁGINA DO PRESTADOR');
	console.log(payload);
	
	let data = new FormData();
	let dados = payload;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/service-provider-visits/add.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [CADASTRANDO VISITA]', response);

		if ( response.data.status == 'ok' ) {

			//yield payload.callback_success();
		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [CADASTRANDO VISITA]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}
}

function* logout({payload}) {
	
	yield AsyncStorage.removeItem('bearerToken');
	yield AsyncStorage.removeItem('userType');
	yield AsyncStorage.removeItem('servicesExist');

	if ( payload.callbackSuccess ) {
		yield payload.callbackSuccess();
	}


}

function* loadUserData({payload}) {

	console.log('carregando dados de usuario');

	const networkStatus = yield NetInfo.fetch();

	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Sem conexão com a internet.',
		  );
		  return true;

	}

	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/users/me.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_USER_DATA_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_USER_DATA_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_USER_DATA_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD USER DATA]', {message, response});
			yield put({
				type: 'LOAD_USER_DATA_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* changePassword({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - ALTERANDO A SENHA DO USUÁRIO');
	console.log(payload);
	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/users/change-password.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [ALTERANDO SENHA]', response);
		yield payload.setSubmitting(false);

		if ( response.data.status == 'ok' ) {

			yield payload.callback_success();
		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [ALTERANDO SENHA]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}
		yield payload.setSubmitting(false);
	}
}

function* saveProfilePhoto({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - ALTERANDO A FOTO DO USUÁRIO');
	var { photo } = payload;
	
	let data = new FormData();
	data.append('photo', photo);

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/users/change-photo.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [ALTERANDO FOTO]', response);
		//yield payload.setSubmitting(false);

		if ( response.data.status == 'ok' ) {
		
			yield AlertHelper.show('success', 'Tudo certo', 'Sua foto foi alterada com sucesso!');

			yield payload.callback_success();
		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [ALTERANDO FOTO]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}
}

export default function* () {
	yield takeLatest('REGISTER_TRIGGER', registerTrigger);
	yield takeLatest('LOGIN_TRIGGER', login);
	yield takeLatest('SAVE_USER_LOCATION',	saveUserLocation);
	yield takeLatest('LOAD_USER_LOCATION',	loadUserLocation);
	yield takeLatest('LOAD_SERVICE_CATEGORIES',	loadServiceCategories);
	yield takeLatest('LOAD_SERVICE_PROVIDERS',	loadServiceProviders);
	yield takeLatest('SAVE_VISIT',	saveVisit);
	yield takeLatest('LOAD_USER_DATA',	loadUserData);
	yield takeLatest('CHANGE_PASSWORD',	changePassword);
	yield takeLatest('SAVE_PROFILE_PHOTO',	saveProfilePhoto);
	yield takeLatest('LOGOUT',	logout);
}