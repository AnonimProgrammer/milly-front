export {
  activateTable,
  createTable,
  deactivateTable,
  generateTableQr,
  listTables,
  updateTableLabel,
} from "./tableApi";
export { mapTableResponse } from "./mappers";
export type {
  CreateTableRequest,
  TableQrResponse,
  TableResponse,
  TableStatus,
  UpdateTableLabelRequest,
} from "./types";
