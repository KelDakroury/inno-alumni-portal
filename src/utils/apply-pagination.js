/**
 * Applies pagination to a list of documents.
 * @param {Array} documents - List of documents to paginate.
 * @param {number} page - Current page number (0-indexed).
 * @param {number} rowsPerPage - Number of rows per page.
 * @returns {Array} Paginated list of documents.
 */
export function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
