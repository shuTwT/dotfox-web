import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getMyProcessListApi = (params?: object) => {
  return http.request<TableResult>("get", "/api/task/my-process", {
    params
  });
};

export const stopProcessApi = (data: object) => {
  return http.request<Result>("post", "/api/task/stop-process", { data });
};

export const revokeProcessApi = (data: object) => {
  return http.request<Result>("post", "/api/task/revoke-process", { data });
};

export const getTodoListApi = (params?: object) => {
  return http.request<Result>("get", "/api/task/todo", {
    params
  });
};

export const getFinishedListApi = (params?: object) => {
  return http.request<Result>("get", "/api/task/finished", {
    params
  });
};

export const getFlowRecordApi = (params?: object) => {
  return http.request<Result>("get", "/api/task/flow-record", {
    params
  });
};

export const getFlowFormDataApi = (params?: object) => {
  return http.request<Result>("get", "/api/task/flow-form-data", {
    params
  });
};

export const getProcessVariablesApi = (id: number, params?: object) => {
  return http.request<Result>("get", "/api/task/process-variables/" + id, {
    params
  });
};

export const taskCompleteApi = (data: object) => {
  return http.request<Result>("post", "/api/task/complete", { data });
};

export const taskRejectApi = (data: object) => {
  return http.request<Result>("post", "/api/task/reject", { data });
};

export const taskReturnApi = (data: object) => {
  return http.request<Result>("post", "/api/task/return", { data });
};

export const taskReturnListApi = (data: object) => {
  return http.request<Result>("post", "/api/task/return-list", { data });
};

export const taskRemoveApi = (params?: object) => {
  return http.request<Result>("delete", "/api/task/delete", {
    params
  });
};

export const taskClaimApi = (data: object) => {
  return http.request<Result>("post", "/api/task/claim", { data });
};

export const taskUnClaimApi = (data: object) => {
  return http.request<Result>("post", "/api/task/un-claim", { data });
};

export const taskDelegateApi = (data: object) => {
  return http.request<Result>("post", "/api/task/delegate-task", { data });
};

export const taskResolveApi = (data: object) => {
  return http.request<Result>("post", "/api/task/resolve-task", { data });
};

export const taskAssignApi = (data: object) => {
  return http.request<Result>("post", "/api/task/assign-task", { data });
};

export const taskAddMultiInstanceExecutionApi = (data: object) => {
  return http.request<Result>(
    "post",
    "/api/task/add-multi-instance-execution",
    { data }
  );
};

export const taskDeleteMultiInstanceExecutionApi = (data: object) => {
  return http.request<Result>(
    "post",
    "/api/task/delete-multi-instance-execution",
    { data }
  );
};

export const tasNextFlowNodeApi = (data: object) => {
  return http.request<Result>("post", "/api/task/next-flow-node", { data });
};

export const taskNextFlowNodeStartApi = (data: object) => {
  return http.request<Result>("post", "/api/task/next-flow-node-start", {
    data
  });
};

export const getTaskDiagramApi = (id: number, params?: object) => {
  return http.request<Result>("get", "/api/task/diagram/" + id, {
    params
  });
};

export const getTaskFlowViewerApi = (
  proInsId: number,
  executionId: number,
  params?: object
) => {
  return http.request<Result>(
    "get",
    `/api/task/flow-viewer/${proInsId}/${executionId}`,
    {
      params
    }
  );
};

export const getTaskFlowXmlAndNodeApi = (params?: object) => {
  return http.request<Result>("get", "/api/task/flow-xml-and-node", {
    params
  });
};

export const getTaskFlowTaskFormApi = (params?: object) => {
  return http.request<Result>("get", "/api/task/flow-task-form", {
    params
  });
};
