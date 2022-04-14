import api from './api';
import IpositionData from '../types/position.type';

class PositionDataService {
    getPositionsAll() {
        return api.get<any>('positions');
      }
}

export default new PositionDataService();