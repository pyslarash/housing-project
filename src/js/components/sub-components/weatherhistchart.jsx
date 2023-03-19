import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from 'recharts';

const WeatherHistoricChart = ({ data }) => {
  return (
    <ResponsiveContainer width="90%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
        <YAxis yAxisId="left" type="number" domain={['auto', 'auto']} tickCount={10} />
        <Tooltip
          formatter={(value, name, props) => `${props.payload.Temperature.toFixed(1)} °F`}
          labelFormatter={(unixTime) => new Date(unixTime).toLocaleString()}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Temperature" stroke="#1b90ce" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherHistoricChart;
