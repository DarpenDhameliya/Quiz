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
  try {
    return await request.get('/categories/list');
  } catch (error: any) {
    return error.response
  }
}

export async function getCategory(id: any) {
  try {
    return await request.get(`/categories/editcategorylist/${id}`);
  } catch (error: any) {
    return error.response
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


export async function postUpdateUserWallet(amount: number, type: string) {
  try {
    return await request.post(`/user/updateuserwallet`, { wallet: amount, type });
  } catch (error: any) {
    return error.response
  }
}

export async function getUserWallet() {
  try {
    return await request.get('/user/wallet');
  } catch (error: any) {
    return error.response

  }
}

export async function getQuizList() {
  try {
    return await request.get('/quiz/list');
  } catch (error: any) {
    return error.response
  }
}

export async function postAddQuiz(data: any) {
  try {
    const response = await request.post('/quiz/addquiz', data);
    return response
  } catch (error: any) {
    return error.response

  }
}

export async function postEditQuiz(id: any, data: any) {
  try {
    const response = await request.post(`/quiz/editquiz/${id}`, data);
    return response;
  } catch (error: any) {
    return error.response
  }
}

export async function postDeleteQuiz(id: any) {
  try {
    const response = await request.post(`/quiz/removequiz/${id}`);
    return response
  } catch (error: any) {
    return error.response
  }
}

export async function getQuestionList(quizeId: string | undefined) {
  try {
    const response = await request.get(`/question/list/${quizeId}`);
    return response
  } catch (error: any) {
    return error.response
  }
}

export async function getFilteredQuestionList(data: string, byQuiz?: boolean, page?: number) {
  try {
    const response = await request.get(`/question/filteredlist/${byQuiz}/?data=${data}&page=${page}`);
    return response;
  } catch (error: any) {
    return error.response
  }
}

export async function getQuizDetailsForQuestion(id: string) {
  try {
    return await request.get(`/quiz/list/${id}`);
  } catch (error: any) {
    return error.response
  }
}

export async function postAddQuestionexcel(data: any) {
  try {
    return await request.post(`/question/addquestionexcel`, data);
  } catch (error: any) {
    return error.response
  }
}

export async function postAddQuestion(data: any) {
  try {
    return await request.post('/question/addquestion', data);
  } catch (error: any) {
    return error.response
  }
}

export async function getQuestion(id: any) {
  try {
    return await request.get(`/question/editquestionlist/${id}`);
  } catch (error: any) {
    return error.response
  }
}
export async function postEditQuestion(id: any, data: any) {
  try {
    return request.post(`/question/editquestion/${id}`, data);
  } catch (error: any) {
    return error.response
  }
}

export async function postDeleteQuestion(id: any) {
  try {
    return request.post(`/question/removequestion/${id}`);
  } catch (error: any) {
    return error.response
  }
}

export async function getWebDetail() {
  try {
    return await request.get(`/web/list`);
  } catch (error: any) {
    return error.response
  }
}

export async function postAddWebDetail(data: any) {
  try {
    return await request.post('/web/addwebdata', data);
  } catch (error: any) {
    return error.response
  }
}

export async function postEditWebDetail(id: any, data: any) {
  try {
    return await request.post(`/web/editwebdata/${id}`, data);
  } catch (error: any) {
    return error.response
  }
}

export async function postDeleteWebDetail(id: any) {
  try {
    return await request.post(`/web/removewebdata/${id}`);
  } catch (error: any) {
    return error.response
  }
}