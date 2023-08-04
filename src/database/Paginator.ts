interface PaginationInfo {
  currentPage: Number;
  pageSize: Number;
  totalItems: Number;
  pages: Number;
  hasNext: Boolean;
  hasPrev: Boolean;
}

export class Paginator {
  static async paginate(queryBuilder, req) {
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pagiSize) || 10;

    const offset = (page - 1) * pageSize;

    const records = await queryBuilder.skip(offset).take(pageSize).getMany();
    const totalItems = await queryBuilder.getCount();

    const pages = Math.ceil(totalItems / pageSize);
    const currentPage = offset / pageSize + 1;

    const hasNext = currentPage < totalItems;
    const hasPrev = currentPage > 1;

    const paginationInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalItems,
      pages,
      hasNext,
      hasPrev,
    };
    return { records, paginationInfo };
  }
}
