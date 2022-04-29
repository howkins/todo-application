import { createSlice } from '@reduxjs/toolkit';

export interface ResponseNameData {
    name: string,
}
export interface ResponseCompletedData {
    completed: boolean,
}
export interface ResponseData extends ResponseCompletedData, ResponseNameData {
    id: number,
    created_at: Date,
    updated_at: Date
}
export interface TodoState {
    list: Array<ResponseData>;
    loading: boolean;
}

const initialState: TodoState = {
    list: [],
    loading: false
};

const completed = (a:any, b:any) => {
    return (a.completed - b.completed) || (new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.list = action.payload.sort(completed)
            state.loading = true
        },
        appendOne: (state, action) => {
            state.list = [...state.list, action.payload].sort(completed)
            state.loading = true
        },
        updateOne: (state, action) => {
            state.list = state.list.map(data => {
                if (data.id == action.payload.id) {
                    data = action.payload
                }
                return data
                
            }).sort(completed)
            state.loading = true
        },
        destroyOne: (state, action) => {
            state.list = state.list.filter(data => data.id != action.payload.id).sort(completed)
            state.loading = true
        },
    },
});

export const { setAll, appendOne, updateOne, destroyOne } = todoSlice.actions;


export default todoSlice.reducer;
