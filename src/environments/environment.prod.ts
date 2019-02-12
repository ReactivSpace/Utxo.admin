const BASE_URL =
  'http://utxoloadbalancer-587945723.us-east-2.elb.amazonaws.com:81/';

export const environment = {
  production: true,
  Base_URL: BASE_URL,

  // Auth
  Login: `${BASE_URL}auth/login`,
  Register: `${BASE_URL}auth/register`,
  forgetPassword: `${BASE_URL}auth/forgotPasswordMail`,
  VerifyCode: `${BASE_URL}auth/verifyForgotCode`,
  ChangePassword: `${BASE_URL}auth/ChangePassword`,

  // users
  GetAllUsers: `${BASE_URL}user/getAll`,
  UserDetail: `${BASE_URL}user/Read`,
  LatestUsers: `${BASE_URL}users/lastRegistered`,

  // Balances
  ServerBalance: `${BASE_URL}fullNodeBalance`,
  UsersBalance: `${BASE_URL}account/getUsersBalance`,
  AllBalances: `${BASE_URL}account/GetBalances`,

  // Coins
  GetAllCoins: `${BASE_URL}coin/getAll`,

  // Transactions
  GetAllTransaction: `${BASE_URL}transaction/getAll`,
  PendingTransaction: `${BASE_URL}transactions/Pending`,
  Reject: `${BASE_URL}transactions/reject`,
  Approve: `${BASE_URL}transactions/approve`,
  ActionTransaction: `${BASE_URL}sendTransaction`,

};
