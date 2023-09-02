
import { takeEvery, takeLatest, put, all } from 'redux-saga/effects'
import axios from 'axios'
import { FETCH_HOME_MULTI_DATA } from './constants'
import { changeBannersAction, changeRecommendAction } from './actionCreators'

function* fetchHomeMultiData(action) {
    const res = yield axios.get("http://123.207.32.32:8000/home/multidata");
    const banner = res.data.data.banner.list;
    const recommends = res.data.data.recommend.list;
    // yield put(changeBannersAction(banner));
    // yield put(changeRecommendAction(recommends));
    yield all([
        yield put(changeBannersAction(banner)),
        yield put(changeRecommendAction(recommends))
    ])
}
function* mySaga() {
    // takeLatest: 一次只能监听一个对应的action,如果有多个，会取消其他，保留最后一个监听
    // takeEvery: 每一个都会被执行
    yield takeLatest(FETCH_HOME_MULTI_DATA, fetchHomeMultiData)

    // 如果要监听多个 action
    yield all([
        // ...action
    ])
}

export default mySaga