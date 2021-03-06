import api from './api';
import IpackageData from '../types/package.type';
import IalterpositionData from '../types/alterposition.type';

class PackageDataService {
    getPackagesAll() {
        return api.get<any>('packages');
    }

    getPackage(id: any) {
        return api.get(`/packages/${id}/view`);
    }
    createPackage(data: IpackageData) {
        return api.post<IpackageData>("/packages/create", data);
    }

    updatePackage(data: IpackageData, id: any) {
        return api.put<any>(`/packages/${id}/update`, data);
    }

    alterStatusPackage(data: IalterpositionData, id: any){
        return api.put<any>(`/packages/${id}/updatePackagePosition`, data);
    }

    deletePackage(id: any) {
        return api.delete<any>(`/packages/${id}/delete`);
    }
}

export default new PackageDataService();