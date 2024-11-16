import React, { useEffect, useState } from 'react';
import { Modal, Spin, Tag } from 'antd';
import axiosInstance from '../../config/axiosConfig';
import { API_BASE_URL } from 'config/constant';

const MediaViewModal = ({ visible, onClose, mediaId }) => {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);

  const fetchMediaDetails = async () => {
    setLoading(true);
    try {
      
      const response = await axiosInstance.get(`/files/${mediaId}`);
      setMedia(response.data?.file);

      await axiosInstance.post(`/files/${mediaId}/increment-view`);
    } catch (error) {
      console.error('Error fetching media details:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchMediaFile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/files/${mediaId}/file`, {
        responseType: 'blob', 
      });
      
      const blobUrl = URL.createObjectURL(response.data);
      setMediaUrl(blobUrl);
    } catch (error) {
      console.error('Error fetching media file:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && mediaId) {
      fetchMediaDetails();
      fetchMediaFile();
    }
  }, [visible, mediaId]);

  return (
    <Modal
      visible={visible}
      title="Media Details"
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        media && (
          <div>
            <h2>{media.filename}</h2>
            <p><strong>File Type:</strong> {media.filetype}</p>
            <p><strong>SharedLink:</strong> {`${API_BASE_URL}files/shared/${media.shareableToken}`}</p>
            <p><strong>Tags:</strong> 
              {media.Tags?.map((tag, index) => (
                <Tag color="blue" key={index}>
                  {tag?.tag}
                </Tag>
              ))}</p>
            <p><strong>View Count:</strong> {media.viewCount}</p>
            {mediaUrl && (
              <div>
                {mediaUrl.endsWith('.mp4') || mediaUrl.startsWith('video/') ? (
                  <video controls style={{ width: '100%' }}>
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={mediaUrl}
                    alt="Media"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                  />
                )}
              </div>
            )}
          </div>
        )
      )}
    </Modal>
  );
};

export default MediaViewModal;
