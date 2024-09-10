import axios from 'axios';

export const createContent = async (content) => {
    try {
        const response = await axios.post('http://localhost:3000/content', content);
        return response.data;
    } catch (error) {
        console.error('Error creating content:', error);
        throw error;
    }
};

export const getContents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/content');
        return response.data;
    } catch (error) {
        console.error('Error creating content:', error);
        throw error;
    }
};

export const deleteContent = async (itemId) => {
    try {
        const response = await axios.delete(`http://localhost:3000/content/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating content:', error);
        throw error;
    }
};

export const updateContent = async (itemIdU, updateContent) => {
    try {
        const response = await axios.put(`http://localhost:3000/content/${itemIdU}`, updateContent);
        return response.data;
    } catch (error) {
        console.error('Error creating content:', error);
        throw error;
    }
};