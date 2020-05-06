import { call, takeEvery, put } from 'redux-saga/effects';
import * as types from '../types/petOwners';
import * as actions from '../actions/petOwners';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function* fetchPetOwners(action) {
    console.log(action);
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/owners/`,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            },
        );
        if (response.status === 200) {
            const owners = yield response.json();
            entities = {};
            order = [];

            owners.map( owner => {
                entities = {
                    ...entities, 
                    [owner.id]: owner
                }
                order = [
                    ...order, 
                    owner.id
                ]
            });
            yield put(actions.completeFetchingPetOwners(entities, order));
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failFetchingPetOwners(non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failFetchingPetOwners('Error'));
    }
}

function* addPetOwner(action) {
    console.log(action);
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/owners/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers:{
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 200) {
            const owner = yield response.json();
            yield put(actions.completeAddingPetOwner(action.payload.oldId, owner));
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failAddingPetOwner(actions.payload.oldId, non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failAddingPetOwner('Error'));
    }
}

function* removePetOwner(action) {
    console.log(action);
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/owners/${action.payload.id}`,
            {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                },
            },
        );
        if (response.status === 200) {
            yield put(actions.completeRemovingPetOwner());
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failRemovingPetOwner(actions.payload.id, non_field_errors[0]));
        }
    } catch (error) {
        yield put(actions.failRemovingPetOwner(actions.payload.id, 'Error'));
    }
}

export function* watchPetOwnerFetchingStarted() {
    yield takeEvery(
        types.PET_OWNERS_FETCH_STARTED,
        fetchPetOwners,
    );
}

export function* watchPetOwnerCreation() {
    yield takeEvery(
        types.PET_OWNER_ADD_STARTED,
        addPetOwner,
    );
}

export function* watchPetOwnerDestruction() {
    yield takeEvery(
        types.PET_OWNER_REMOVE_STARTED,
        removePetOwner,
    );
}