import axios from 'axios';

class CepDataService {
    getCep(data: any) {
        return axios.get<any>(`https://viacep.com.br/ws/${data}/json/`);
      }
}

export default new CepDataService();