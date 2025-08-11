import toast from 'react-hot-toast';
import Axios from './Axios';

const uploadImageService = async (file, setLoading) => {
    try {
        setLoading(true);
        const { data } = await Axios.post('/upload', file);
        setLoading(false);
        toast.success('Upload hình ảnh thành công ');
        return data;
    } catch (error) {
        setLoading(false);
        toast.error('Có lỗi xảy ra trong quá trình upload hình ảnh');
    }
};

export { uploadImageService };
