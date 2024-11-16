import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Upload, List, Tag, Flex } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateMediaOrder } from './ducks/slice';
import { mediaList as mediaThunk, mediaUpload } from './ducks/thunks';
import { useNavigate } from 'react-router-dom';
import { logout } from 'modules/auth/ducks/slice';
import MediaViewModal from './ViewMediaModal';

const MediaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [form] = Form.useForm(); 
  const { mediaList, error } = useSelector((state) => state.media);

  useEffect(() => {
    dispatch(mediaThunk());
  }, [dispatch]);


  const handleUpload = async (values) => {
    if (fileList.length === 0) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    const file = fileList[0].originFileObj;
    formData.append('file', file);
    formData.append('tags', values.tags);
    formData.append('filetype', file.type);
    const resultAction = dispatch(mediaUpload(formData));
    if (mediaUpload.fulfilled.match(resultAction)) {
      dispatch(mediaThunk());
      form.resetFields();
      setFileList([]);
    }
  };


  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
 
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(mediaList);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    dispatch(updateMediaOrder(reorderedItems));
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <h2>Media Management</h2>
      <Flex>
        <Button type="link" htmlType="button" onClick={handleLogout}>
            logout
          </Button>
      </Flex>
      
      <Form form={form} layout="vertical" onFinish={handleUpload}>
        <Form.Item
          name="file"
          label="Upload Media"
          rules={[{ required: true, message: 'Please upload a media file' }]}
        >
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[{ required: true, message: 'Please add tags' }]}
        >
          <Input placeholder="Enter comma-separated tags" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="media-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {mediaList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <Flex
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} 
                      justify='space-between'
                    >
                      <Flex>{item.filename}</Flex>
                      <Flex>{item.Tags?.map((tag, index) => (
                          <Tag color="blue" key={index}>
                            {tag?.tag}
                          </Tag>
                        ))}
                      </Flex>
                      <Flex>
                      <Button type="link" htmlType="button" onClick={() => {setSelectedMedia(item.id)}}>
                        View
                      </Button>
                      </Flex>
                    </Flex>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <MediaViewModal mediaId={selectedMedia} visible={selectedMedia} onClose={() => {setSelectedMedia(null)} } />
    </div>
  );
};

export default MediaPage;
