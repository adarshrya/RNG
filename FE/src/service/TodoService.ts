import { TodoCreateInput } from "../dto/Todo";
import http from "../http-common";

export async function getAllTodo() {
    return http.get<Array<TodoCreateInput>>("/todo");

}

