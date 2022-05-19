import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    API_URL: 'http://52.91.121.162:3000/api/v1',
    APP_NAME: 'popo de vaca',
  };
});
