import { BaseService } from '../baseService';


export const tmdbService = {
  async searchMovies(query: string) {
    const response = await BaseService.getData(query);
    return response;
  },
}