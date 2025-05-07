export interface IPagination<DataType> {
  data: DataType[];
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}
