import React, { useEffect, useState } from "react";
import { Table, Image } from "react-bootstrap";

const FightRow = ({ fightId }) => {
  const [fight, setFight] = useState(null);

  useEffect(() => {
    fetch(`https://cjirank-production.up.railway.app/api/fights/${fightId}`)
      .then((res) => res.json())
      .then((data) => setFight(data))
      .catch((err) => console.error("Erro ao buscar luta:", err));
  }, [fightId]);

  if (!fight) return <p>Carregando luta...</p>;

  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          {/* Lutador 1 */}
          <td className="image text-center">
            <a href={fight.fighter_one_profile} target="_blank" rel="noopener noreferrer">
              <Image src={fight.fighter_one_image} width={100} height={100} rounded />
              <p>{fight.fighter_one_name}</p>
            </a>
          </td>

          {/* Resultado */}
          <td className="text-center">
            {fight.winner_id === fight.fighter_one ? (
              <span className="badge bg-success text-white">WIN</span>
            ) : (
              <span className="badge bg-danger text-white">LOSS</span>
            )}
          </td>

          {/* Lutador 2 */}
          <td className="image text-center">
            <a href={fight.fighter_two_profile} target="_blank" rel="noopener noreferrer">
              <Image src={fight.fighter_two_image} width={100} height={100} rounded />
              <p>{fight.fighter_two_name}</p>
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default FightRow;
