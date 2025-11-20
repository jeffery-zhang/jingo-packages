type ColumnType<T = string> = {
  key: T
  name: string
}

export function Table<T extends any>({ columns, data }: { columns: ColumnType<keyof T>[]; data: T[] }) {
  return (
    <div className='overflow-auto'>
      <table className='table'>
        <thead>
          <tr>
            {columns.map(({ key, name }) => (
              <th key={key as string}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`row_${index}`}>
              {columns.map(({ key }) => (
                <td key={key as string}>{item[key] as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type ParamDataType = {
  name: string
  type: string
  default: string
  description: string
}

export function ParamTable({ data }: { data: ParamDataType[] }) {
  return (
    <Table
      columns={[
        { key: 'name', name: 'Name' },
        { key: 'type', name: 'Type' },
        { key: 'default', name: 'Default' },
        { key: 'description', name: 'Description' },
      ]}
      data={data}
    />
  )
}

type OutputDataType = {
  name: string
  type: string
  description: string
}

export function OutputTable({ data }: { data: OutputDataType[] }) {
  return (
    <Table
      columns={[
        { key: 'name', name: 'Name' },
        { key: 'type', name: 'Type' },
        { key: 'description', name: 'Description' },
      ]}
      data={data}
    />
  )
}
