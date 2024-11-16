import { Tag } from "antd";

export const columns = [
  {
    title: 'Filename',
    dataIndex: 'filename',
    key: 'filename',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags) => (
      <>
        {tags?.map((tag, index) => (
          <Tag color="blue" key={index}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
];
