import api from './api';
import IprofileData from '../types/profile.type';

class ProfileDataService {
    getProfile() {
        return api.post<IprofileData>('profile');
      }
}

export default new ProfileDataService();