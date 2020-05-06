import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchSayHappyBirthday } from './happyBirthday';
import { watchPetOwnerFetchingStarted, watchPetOwnerCreation, watchPetOwnerDestruction } from './petOwner';


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSayHappyBirthday),
    fork(watchPetOwnerFetchingStarted),
    fork(watchPetOwnerCreation),
    fork(watchPetOwnerDestruction),
  ]);
}


export default mainSaga;
