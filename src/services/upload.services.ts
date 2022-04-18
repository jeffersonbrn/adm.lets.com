import api from './api';

class UploadDataService {

    uploadsPackage(data: any, id: any) {
        return api.post<any>(`/packages/${id}/uploadFile`, data);
    }
}

export default new UploadDataService();