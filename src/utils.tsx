export function getParameterFromUrl(url, parameterName) {
    const urlParts = url.split('/');
    const paramIndex = urlParts.indexOf(parameterName);
    if (paramIndex !== -1 && paramIndex + 1 < urlParts.length) {
      return urlParts[paramIndex + 1];
    }
    return null;
}

/**
 * 导出文章数据
 *
 * @param posts 文章列表
 * @returns 导出后的 CSV 文件
//  */
// const exporter = posts => {
//   const data = posts.map(post => ({
//       ...post,
//       backlinks: lodashGet(post, 'backlinks', []).map(
//           backlink => backlink.url
//       ),
//   }));
//   return jsonExport(data, (err, csv) => downloadCSV(csv, 'posts'));
// };