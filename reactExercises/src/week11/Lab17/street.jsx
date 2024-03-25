// note - using a functional component here
import TrafficLight from './trafficlight';
import './theme.css';
const Street = () => (
 <div className="flex-container">
 <TrafficLight street="Garen"/>
 <TrafficLight street="Ikezian" />
 <TrafficLight street="info3139"/>
 </div>
);
export default Street;