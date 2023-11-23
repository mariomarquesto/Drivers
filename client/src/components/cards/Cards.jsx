import Card from '../card/Card';
import style from './Cards.module.css';

export default function Cards({drivers}) {

   return (
      <div className={style.container}>
        { drivers.map((driver) => (
          <Card className={style.card} 
            key={driver.id} // clave unica
            id={driver.id}
            forename={driver.forename}
            surname={driver.surname}
            teams={driver.Teams || driver.teams}
            image={driver.image.url ? driver.image.url : driver.image}
            dob={driver.dob}
<<<<<<< HEAD
            nationality={driver.nationality}
=======
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
          />
        ))}
      </div>
  );
}

