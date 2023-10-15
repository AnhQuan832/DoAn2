// export const API_URL = 'http://localhost:8080/api/v1';
const API_URL = 'https://doan02-be-production.up.railway.app/api/v1/';



export const AUTH_API = {
  'AUTHENTICATE': {
    'END_POINT': {
      'LOGIN': API_URL + 'auth/authenticate',
      'REGISTER': API_URL + 'auth/userRegister',
      'GG_LOGIN': API_URL + 'auth/authenticateGoogleUser'
    },
    'STATUS': {
      'SYSTEM_ERROR': '0_1_f',
      'CREATED_ACCOUNT_SUCCESSFUL': '1_1_s',
      'ACCOUNT_EXISTED': '1_2_f',
      'ACCOUNT_LOCKED': '1_3_f',
      'ACCOUNT_INACTIVE': '1_4_f',
      'ACCOUNT_NOT_FOUND': '1_5_f',
      'BAD_CREDENTIAL': '1_6_f',
      'AUTHENTICATE_SUCCESSFUL': '1_7_s',
    }
  }
}
