import { useStore } from '../../store/useStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function Statistics() {
  const stats = useStore(state => state.stats);

  const data = stats.length > 0 ? stats : [
    { date: 'Mon', hours: 2.5 },
    { date: 'Tue', hours: 3.2 },
    { date: 'Wed', hours: 1.5 },
    { date: 'Thu', hours: 4.0 },
    { date: 'Fri', hours: 2.8 },
    { date: 'Sat', hours: 5.5 },
    { date: 'Sun', hours: 3.0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(-5)} // simple format just for display if it's yyyy-mm-dd
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="hours" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
