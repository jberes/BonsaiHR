import { FetchApi } from './fetch-api-service';
import { PeopleType } from '../models/BambooSales/people-type';

class BambooSalesService {
  public getPeopleList = async (): Promise<PeopleType[]> => {
    return await FetchApi.fetchApiResponse<PeopleType[]>('https://excel2json.io/api/share/f089be16-2144-4467-00d5-08dd632d8d2c', []);
  }
}
export const bambooSalesService: BambooSalesService = new BambooSalesService();
