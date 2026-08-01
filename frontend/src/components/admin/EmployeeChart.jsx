import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const EmployeeChart = ({ employees }) => {
  // Department wise employee count
  const departmentCount = {};

  employees.forEach((emp) => {
    departmentCount[emp.department] =
      (departmentCount[emp.department] || 0) + 1;
  });

  const chartData = Object.keys(departmentCount).map((department) => ({
    department,
    total: departmentCount[department],
  }));

    return (
      
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-5">Employee Overview</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="department" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#4F46E5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeChart;
