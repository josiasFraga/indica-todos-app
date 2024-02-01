import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {callApi} from '@services/api';
import AlertHelper from '@components/Alert/AlertHelper';
import CONFIG from '@constants/configs';
import NetInfo from "@react-native-community/netinfo";
import { getUniqueId } from 'react-native-device-info';

function* changePasswordUnauthenticated({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você só pode fazer fazer uma alteração de senha quando estiver com conexão a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - MUDANDO SENHA USUÁRIO');
	console.log(payload.submitValues);
	
	let data = new FormData();
	let dados = payload.submitValues;
	let step = payload.step;
	let action = "send-code";

	if ( step == 1 ){ 
		action = "verify-code";
	}
	else if ( step == 2 ){
		action = "change-password";
	}

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/change-password/' + action + '.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [REQUIDIÇÃO ENVIADA - MUDA SENHA USUÁRIO]', response);

		if ( response.data.status == 'ok' ) {
			yield payload.callback_success();
		} else {
			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}
		yield payload.setSubmitting(false);

	} catch ({message, response}) {
		console.error('[SAGA] - [MUDA SENHA USUÁRIO]', { message, response });
		yield AlertHelper.show('error', 'Erro', message);
		yield payload.setSubmitting(false);
	}
}

function* checkSignatureStatus({payload}) {

	console.log('verificando a assinatura do usuário');

	const networkStatus = yield NetInfo.fetch();

	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Sem conexão com a internet.',
		  );

		  yield payload.callback_error();
		  return true;
	}
	
	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/users/signature-status.json',
			method: 'GET',
			//params: params
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				
				if ( response.data.data == 'ACTIVE' || response.data.data == 'TRIAL' ) {
					yield payload.callback_success();
				} else {
					yield AlertHelper.show('warning', 'Problemas com assinatura', 'Existem problemas com a sua assinatura. Entre em contato com o Indica Todos para resolvê-los.');					
					yield logout({payload: {}});
					yield payload.callback_error();
				}
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield logout({payload: {}});
				yield payload.callback_error();
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', 'Ocorreu um erro ao verificar o status da sua assinatura');
			yield logout({payload: {}});
			yield payload.callback_error();

		}

	} catch ({message, response}) {

		yield logout({payload: {}});
		yield payload.callback_error();			

	}

}

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

				yield AlertHelper.show('error', 'Erro',  response.data.message);
			}
		}
		yield payload.setSubmitting(false);

	} catch ({message, response}) {
		console.error('[SAGA] - [CADASTRANDO USUÁRIO]', { message, response });
		yield AlertHelper.show('error', 'Erro', message);
		yield payload.setSubmitting(false);
	}
}

function* registerBusinessTrigger({payload}) {

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
			endpoint: CONFIG.url+'/users/add-my-business.json',
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

				yield AlertHelper.show('error', 'Erro',  response.data.message);
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

			if ( response.data.status == "ok" ) {
				yield put({
					type: 'LOGIN_SUCCESS',
					payload: true,
				});
	
				console.log('[SAGA] - TOKEN ' + response.data.token);
	
				yield AsyncStorage.setItem('bearerToken', response.data.token);
				yield AsyncStorage.setItem('userType', response.data.type);
				yield AsyncStorage.setItem('servicesExist', response.data.services_exist);
				yield AsyncStorage.setItem('bearerTokenValidade', String(response.data.validation));
	
				yield payload.callback_success(response.data.type == 'servide_provider' && response.data.services_exist == '0');

			} else if ( response.data.status == "erro" && response.data.error == "invalid_signature" ) {
				AlertHelper.show('warning', 'Erro', 'Existem problemas com seu pagamento. Por favor, entre em contato com o Indica Todos para resolvê-los.');

			}

		} else {
			AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOGIN_FAILED',
				payload: true,
			});

		}
		yield payload.setSubmitting(false);

	} catch ({message, response}) {

		if ( response.status && response.status == 401 ) {

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

function* endRegisterTrigger({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você só pode finalizar um cadastro quando estiver com conexão a internet.',
		  );
		  yield payload.setSubmitting(false);
		  return true;
	}

	//const notifications_id = yield JSON.parse(yield AsyncStorage.getItem('oneSignalToken'))?.userId;

	console.log('[SAGA] - FINALIZANDO CADASTRO DO PRESTADOR');
	console.log(payload.submitValues);
	
	let data = new FormData();
	let dados = payload.submitValues;
	//dados.notificacao_token = notifications_id;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/users/end_provider_register.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [CADASTRANDO PRESTADOR]', response);

		if ( response.data.status == 'ok' ) {
			yield payload.callback_success();
		} else {
			if ( response.data.error && response.data.error.email ) {
				yield AlertHelper.show('warning', 'Atenção',  'O email que você está tentando cadastrar já está sendo usado por outro usuário.');

			} else {

				yield AlertHelper.show('error', 'Erro',  response.data.message);
			}
		}
		yield payload.setSubmitting(false);

	} catch ({message, response}) {
		yield payload.setSubmitting(false);
		console.error('[SAGA] - [CADASTRANDO PRESTADOR]', { message, response });
		yield AlertHelper.show('error', 'Erro', message);
	}
}

function* loadDashboardData({payload}) {

	console.log('carregando dados da dashboard do prestador');

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
			endpoint: CONFIG.url + '/service-providers/dashboard.json',
			method: 'GET',
			//params: params
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_DASHBOARD_DATA_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_DASHBOARD_DATA_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_DASHBOARD_DATA_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD DASHBOARD DATA]', {message, response});
			yield put({
				type: 'LOAD_DASHBOARD_DATA_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
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

				if ( response.data.data == null && payload.callbackNotFind ) {
					payload.callbackNotFind();
				}
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
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
				yield AlertHelper.show('error', 'Erro', response.data.message);
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

function* loadServiceSubCategories({payload}) {

	console.log('carregando subcategorias');

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
			endpoint: CONFIG.url + '/service-subcategories/index.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_SERVICE_SUBCATEGORIES_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_SERVICE_SUBCATEGORIES_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_SERVICE_SUBCATEGORIES_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD SERVICE SUBCATEGORIES]', {message, response});
			yield put({
				type: 'LOAD_SERVICE_SUBCATEGORIES_FAILED',
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
				yield AlertHelper.show('error', 'Erro', response.data.message);
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

	yield put({
		type: 'LOAD_USER_DATA_FAILED',
		payload: {},
	});

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
				yield AlertHelper.show('error', 'Erro', response.data.message);
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

function* loadMeasurementUnits({payload}) {

	console.log('carregando unidades de medida');

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
			endpoint: CONFIG.url + '/measurement-units/index.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_MEASUREMENT_UNITS_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_MEASUREMENT_UNITS_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_MEASUREMENT_UNITS_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD MEASUREMENT UNITS]', {message, response});
			yield put({
				type: 'LOAD_MEASUREMENT_UNITS_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* loadBusinessData({payload}) {

	console.log('carregando dados empresariais');

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
			endpoint: CONFIG.url + '/service-providers/load-data.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_BUSINESS_DATA_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_BUSINESS_DATA_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_BUSINESS_DATA_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD BUSINESS DATA]', {message, response});
			yield put({
				type: 'LOAD_BUSINESS_DATA_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* saveBusinessData({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - SALVANDO DADOS DO PRESTADOR');
	console.log(payload);
	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/service-providers/save-data.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [SALVANDO DADOS DO PRESTADOR]', response);

		if ( response.data.status == 'ok' ) {
			yield AlertHelper.show('success', 'Tudo Certo',  response.data.message);

			yield payload.callback_success();
		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

		payload.setSubmitting(false);

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [SALVANDO DADOS DO PRESTADOR]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}

		payload.setSubmitting(false);
	}
}

function* loadMyServices({payload}) {

	console.log('carregando serviços');

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
			endpoint: CONFIG.url + '/services/index.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_MY_SERVICES_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_MY_SERVICES_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_MY_SERVICES_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD SERVICES]', {message, response});
			yield put({
				type: 'LOAD_MY_SERVICES_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* saveServices({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - SALVANDO SERVIÇOS');
	console.log(payload);
	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/services/save-data.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [SALVANDO SERVIÇOS]', response);

		if ( response.data.status == 'ok' ) {
			yield AlertHelper.show('success', 'Tudo Certo',  response.data.message);

			yield payload.callback_success();
		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

		payload.setSubmitting(false);

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [SALVANDO SERVIÇOS]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}

		payload.setSubmitting(false);
	}
}

function* loadServices({payload}) {

	console.log('carregando serviços');

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
			endpoint: CONFIG.url + '/services/by-provider.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_SERVICES_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_SERVICES_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_SERVICES_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD SERVICES]', {message, response});
			yield put({
				type: 'LOAD_SERVICES_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* saveRating({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - SALVANDO AVALIAÇÃO');
	console.log(payload);
	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/service-providers/save-rating.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [SALVANDO AVALIAÇÃO]', response);

		if ( response.data.status == 'ok' ) {
			yield AlertHelper.show('success', 'Tudo Certo',  response.data.message);

			yield payload.callback_success();
		} else if ( response.data.status == 'warning' ) {
			yield AlertHelper.show('warning', 'Antenção',  response.data.message);

		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

		payload.setSubmitting(false);

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [SALVANDO AVALIAÇÃO]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}

		payload.setSubmitting(false);
	}
}

function* loadReviews({payload}) {

	console.log('carregando avaliações');

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
			endpoint: CONFIG.url + '/service-providers/reviews.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_REVIEWS_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_REVIEWS_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_REVIEWS_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD REVIEWS]', {message, response});
			yield put({
				type: 'LOAD_REVIEWS_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

function* deleteUserAccount({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você está sem conexão com a internet.',
		  );
		  return true;
	}

	console.log('[SAGA] - EXCLUINDO CONTA');
	console.log(payload);


	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/users/delete-account.json',
			method: 'POST',
			//data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [EXCLUINDO CONTA]', response);

		if ( response.data.status == 'ok' ) {
			yield AlertHelper.show('success', 'Tudo Certo',  response.data.message);

			yield payload.callback_success();
		} else if ( response.data.status == 'warning' ) {
			yield AlertHelper.show('warning', 'Antenção',  response.data.message);

		} else {

			yield AlertHelper.show('error', 'Erro',  response.data.message);
		}

	} catch ({message, response}) {
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.error('[SAGA] - [EXCLUINDO CONTA DE USUÁRIO]', { message, response });
			yield AlertHelper.show('error', 'Erro', message);
			
		}

	}
}

function* loadPhotoGallery({payload}) {

	console.log('carregando galeria de fotos');

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
			endpoint: CONFIG.url + '/service-provider-photos/index.json',
			method: 'GET',
			params: payload
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
					type: 'LOAD_PHOTO_GALLERY_SUCCESS',
					payload: response.data.data,
				});
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.message);
				yield put({
					type: 'LOAD_PHOTO_GALLERY_FAILED',
					payload: {},
				});
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOAD_PHOTO_GALLERY_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.log(response);
		if (response.data && response.data.code == 401) {
			yield logout({payload: {}});
		} else {
			console.warn('[ERROR : LOAD PHOTO GALLERY]', {message, response});
			yield put({
				type: 'LOAD_PHOTO_GALLERY_FAILED',
				payload: {},
			});
			yield AlertHelper.show('error', 'Erro', message);
			
		}
	}

}

export default function* () {
	yield takeLatest('CHANGE_PASSWORD_UNAUTHENTICATED', changePasswordUnauthenticated);
	yield takeLatest('CHECK_SIGNATURE_STATUS', checkSignatureStatus);
	yield takeLatest('REGISTER_TRIGGER', registerTrigger);
	yield takeLatest('REGISTER_BUSINESS_TRIGGER', registerBusinessTrigger);
	yield takeLatest('LOGIN_TRIGGER', login);
	yield takeLatest('LOAD_DASHBOARD_DATA',	loadDashboardData);
	yield takeLatest('SAVE_USER_LOCATION', saveUserLocation);
	yield takeLatest('LOAD_USER_LOCATION', loadUserLocation);
	yield takeLatest('LOAD_SERVICE_CATEGORIES',	loadServiceCategories);
	yield takeLatest('LOAD_SERVICE_SUBCATEGORIES', loadServiceSubCategories);
	yield takeLatest('LOAD_SERVICE_PROVIDERS', loadServiceProviders);
	yield takeLatest('SAVE_VISIT',	saveVisit);
	yield takeLatest('LOAD_USER_DATA', loadUserData);
	yield takeLatest('CHANGE_PASSWORD', changePassword);
	yield takeLatest('SAVE_PROFILE_PHOTO', saveProfilePhoto);
	yield takeLatest('LOGOUT', logout);
	yield takeLatest('LOAD_MEASUREMENT_UNITS', loadMeasurementUnits);
	yield takeLatest('END_REGISTER_TRIGGER', endRegisterTrigger);
	yield takeLatest('LOAD_BUSINESS_DATA', loadBusinessData);
	yield takeLatest('SAVE_BUSINESS_DATA', saveBusinessData);
	yield takeLatest('LOAD_MY_SERVICES', loadMyServices);
	yield takeLatest('SAVE_SERVICES', saveServices);
	yield takeLatest('LOAD_SERVICES', loadServices);
	yield takeLatest('SAVE_RATING',	saveRating);
	yield takeLatest('LOAD_REVIEWS', loadReviews);
	yield takeLatest('LOAD_PHOTO_GALLERY', loadPhotoGallery);
	yield takeLatest('DELETE_USER_ACCOUNT', deleteUserAccount);
	
}