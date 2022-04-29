import {api} from '../../app/api'
import {setAll, appendOne, updateOne, destroyOne, ResponseData, ResponseCompletedData, ResponseNameData} from './slice'

export function list(): any {
    return async (dispatch: any): Promise<any> => {
        try {
            await api.get('/api/todos')
                .then(res => dispatch(setAll(res.data)))
            
        } catch (e) {
            return console.error(e);
        }
    }
}

export function create(data:ResponseNameData): any {
    return async (dispatch: any): Promise<any> => {
        try {
            await api.post('/api/todos', data)
                .then(res => dispatch(appendOne(res.data)))
        } catch (e) {
            return console.error(e)
        }
    }
}

export function update(id: number, data: ResponseCompletedData): any {
    return async (dispatch: any): Promise<any> => {
        try {
            await api.put(`/api/todos/${id}`, data)
                .then(res => dispatch(updateOne(res.data)))
        } catch (e) {
            console.error(e)
        }
    }
}

export function destroy(id:number): any {
    return async (dispatch: any): Promise<any> => {
        try {
            await api.delete(`/api/todos/${id}`)
                .then(res => dispatch(destroyOne(res.data)))
        } catch (e) {
            return console.error(e)
        }
    }
}

export default {
    list,
    create,
    update,
    destroy
}
