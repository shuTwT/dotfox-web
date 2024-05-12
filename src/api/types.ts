export type Result<T = any> = {
  code: number;
  success: boolean;
  data?: T;
};

export type ArrayResult = Result<any[]>;

export type TableData = {
  /** 列表数据 */
  list: Array<any>;
  /** 总条目数 */
  total: number;
  /** 每页显示条目个数 */
  pageSize?: number;
  /** 当前页数 */
  currentPage?: number;
};

export type TableResult = Result<TableData>;

/**
 * ServerInfo
 */
export interface ServerInfo {
  cpuInfo: CpuInfo;
  diskInfos: DiskInfo[];
  jvmInfo: JvmInfo;
  memoryInfo: MemoryInfo;
  systemInfo: SystemInfo;
}

/**
 * CpuInfo
 */
export interface CpuInfo {
  cpuNum: number;
  free: number;
  sys: number;
  total: number;
  used: number;
  wait: number;
}

/**
 * DiskInfo
 */
export interface DiskInfo {
  dirName: string;
  free: string;
  sysTypeName: string;
  total: string;
  typeName: string;
  usage: number;
  used: string;
}

/**
 * JvmInfo
 */
export interface JvmInfo {
  free: number;
  home: string;
  inputArgs: string;
  max: number;
  name: string;
  runTime: string;
  startTime: string;
  total: number;
  usage: number;
  used: number;
  version: string;
}

/**
 * MemoryInfo
 */
export interface MemoryInfo {
  free: number;
  total: number;
  usage: number;
  used: number;
}

/**
 * SystemInfo
 */
export interface SystemInfo {
  computerIp: string;
  computerName: string;
  osArch: string;
  osName: string;
  userDir: string;
}
