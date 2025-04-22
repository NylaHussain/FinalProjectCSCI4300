import connectMongoDB from '../../config/mongodb.ts';
import Splash from '../components/splash';

export default function Home() {
  connectMongoDB();
  
  return (
    <Splash></Splash>
  );
}
