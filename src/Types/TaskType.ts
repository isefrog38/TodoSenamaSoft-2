import {RequestStatusType} from "../Redux-Store/App-reducer";
import {TaskType} from "./TodolistType";

export type TaskTypeWithStatusEntity = TaskType & { entityTaskStatus: RequestStatusType };
