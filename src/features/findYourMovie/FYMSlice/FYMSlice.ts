import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { DetailMovie } from '../../movie/types';

interface MovieDescription {
  description: string;
}
const findYourMovieSlice = createSlice({
  name: 'description',
  initialState: {
    movie: {},
    input: {
      currentDescription: '',
    },
  },
  reducers: {
    setFoundMovie: (state, action: PayloadAction<DetailMovie>) => {
      state.movie = action.payload;
    },
    setCurrentDescription: (state, action: PayloadAction<MovieDescription>) => {
      state.input.currentDescription = action.payload.description;
    },
    clearFindYourMovieState: (state) => {
      state.movie = {};
      state.input.currentDescription = '';
    },
  },
});

export const { setFoundMovie, setCurrentDescription, clearFindYourMovieState } =
  findYourMovieSlice.actions;
export const selectFoundMovie = (state: RootState) => state.fym.movie;
export const selectDescription = (state: RootState) => state.fym.input;
export default findYourMovieSlice.reducer;
