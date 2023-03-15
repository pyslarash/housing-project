import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from 'recharts';

const WeatherPredictionChart = ({ data }) => {
    return (
        <ResponsiveContainer width="90%" height={300} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Temperature" stroke="#1b90ce" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

export default WeatherPredictionChart;