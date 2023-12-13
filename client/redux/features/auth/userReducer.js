import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
  builder.addCase("loginRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("logingSucess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuth = true;
  });
  builder.addCase("loginFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
  builder.addCase("registerRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("registerSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuth = true; // Isso pode depender da lógica do seu aplicativo
  });
  builder.addCase("registerFail", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });
});
