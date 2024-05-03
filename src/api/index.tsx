import { request } from "./axios";

export async function postLogin(auth: { email: string, password: string, conPassword?: string }) {
  try {
    return await request.post(`/user/auth`, auth);
  } catch (error: any) {
    return error.response
  }
}

export async function postAdLogin(auth: { email: string, password: string, conPassword?: string }) {
  try {
    return await request.post(`/user/ad-auth`, auth);
  } catch (error: any) {
    return error.response
  }
}

export async function getCategoryList() {
  return await request.get('/categories/list');
}

export async function getCategory(id: any) {
  try {
    return await request.get(`/categories/editcategorylist/${id}`);
  } catch (error) {
    console.log(error)
  }
}

export async function postAddCategory(data: any) {
  try {
    return await request.post('/categories/addcategory', data);
  } catch (error: any) {
    return error.response
  }
}

export async function postEditCategory(id: any, data: any) {
  try {
    return await request.post(`/categories/editcategory/${id}`, data);
  } catch (error: any) {
    return error.response
  }
}

export async function postDeleteCategory(id: any) {
  try {
    return await request.post(`/categories/removecategory/${id}`);
  } catch (error: any) {
    return error.response
  }
}

export async function postOtpLogin(number: string) {
  let mobileNumber = { mobileNumber: number }
  return await request.post(`/user/otp_registration`, mobileNumber);
}

export async function postUpdateUserWallet(amount: number, type: string) {
  let walletAmount = { wallet: amount, type }
  return await request.post(`/user/updateuserwallet`, walletAmount);
}

export async function getUserWallet() {
  return await request.get('/user/wallet');
}

export async function getQuizList() {
  try {
    return await request.get('/quiz/list');
  } catch (error: any) {
    console.log(error.response)
  }
}

export async function postAddQuiz(data: any) {
  try {
    return await request.post('/quiz/addquiz', data);
  } catch (error: any) {
    return error.response
  }
}

export async function getQuiz(id: any) {
  return request.get(`/quiz/editquizlist/${id}`);
}
export async function postEditQuiz(id: any, data: any) {
  return request.post(`/quiz/editquiz/${id}`, data);
}

export async function postDeleteQuiz(id: any) {
  return request.post(`/quiz/removequiz/${id}`);
}


export async function getQuestionList(quizeId: string | undefined) {
  try {
    return await request.get(`/question/list/${quizeId}`);
  } catch (error) {
    console.log(error)
  }
}
export async function postAddQuestionexcel(data: any) {
  try {
    console.log(data)
    return await request.post(`/question/addquestionexcel`, data);
  } catch (error:any) {
    return error.response
  }
}
export async function postAddQuestion(data: any) {
  return request.post('/question/addquestion', data);
}

export async function getQuestion(id: any) {
  return request.get(`/question/editquestionlist/${id}`);
}
export async function postEditQuestion(id: any, data: any) {
  return request.post(`/question/editquestion/${id}`, data);
}

export async function postDeleteQuestion(id: any) {
  return request.post(`/question/removequestion/${id}`);
}