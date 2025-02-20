import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const FighterStatsChart = ({ fighterId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`https://cjirank.vercel.app/api/fighters/${fighterId}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Erro ao buscar estatísticas:', error));
  }, [fighterId]);

  if (!stats) return <p>Carregando...</p>;

  const chartData = {
    labels: ['Vitórias por Submissão', 'Vitórias por Decisão', 'Derrotas por Submissão', 'Derrotas por Decisão', 'Empates'],
    datasets: [
      {
        data: [
          stats.win_submission,
          stats.win_decision,
          stats.loss_submission,
          stats.loss_decision,
          stats.draw
        ],
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384', '#FF9F40', '#9966FF'],
      },
    ],
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default FighterStatsChart;
