import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
    name: 'trainerName',
    initialState: '',
    reducers: {
        setTrainerNameGlobal: (state, action) => action.payload
    }
})

export const {setTrainerNameGlobal} = trainerNameSlice.actions

export default trainerNameSlice.reducer