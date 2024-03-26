export function useColumnsTranslator(data) {
  const newColumns = [{ type: 'selection', fixed: 'left' }]
  data.forEach((item, index) => {
    newColumns.push({
      title: item.fldAlais,
      key: item.queryFldName,
      otherProperties: item.otherProperties || {},
      width: 150,
      ellipsis: { tooltip: true },
    })
  })
  return [newColumns]
}

export function useTableDataTranslator(data) {
  const newTableData = []
  if (data.length > 0) {
    data.forEach((item, index) => {
      newTableData.push({
        id: index,
        ...item,
      })
    })
  }

  return [newTableData]
}
