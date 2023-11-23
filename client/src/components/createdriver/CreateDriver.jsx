import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import style from './CreateDriver.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTeams } from '../../redux/actions/actions';
import f1 from "../../assets/f1-createdriver.png";

const CreateDriver = () => {

  const dispatch = useDispatch()
  const allTeams = useSelector((state) => state.teams)
 

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if(allTeams.length===0){
    dispatch(getTeams());
  }
  }, [dispatch, allTeams.length])


  const [form, setForm] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: [],
     });

  // Errores en el formulario
  const [errors, setErrors] = useState({
    forename: true,
    surname: true,
    nationality: true,
    image: true,
    dob: true,
    description: true,
    teams: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();


<<<<<<< HEAD
    axios.post('http://localhost:3001/drivers', form)
=======
    axios.post('https://pi-drivers.onrender.com/drivers', form)
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658
      .then((res) => {
        setSuccessMessage('New Driver created successfully');
        setErrorMessage('');
      })
      .catch((err) => {
        setErrorMessage("Error: Driver could not be created" );
        setSuccessMessage('');
      });

    setForm({
      forename: '',
      surname:'',
      nationality:'',
      description: '',
      image: '',
      dob: '',
      teams: [],
    });
  }
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...form, 
      [e.target.name]: e.target.value,
    }))
  }


  const validate = (form) => {
    let errors = {}

    if (!form.forename) {
      errors.forename = 'Insert a valid forename';
    } else if (!/^[a-zA-Z\s]+$/.test(form.forename)) {
      errors.forename = 'The name must only contain letters and spaces';
    } else if (form.forename.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.forename = 'The name is too long. Maximum length is 50 characters.';
    }
    if (!form.surname) {
      errors.surname = 'Insert a valid surname';
    } else if (!/^[a-zA-Z\s]+$/.test(form.surname)) {
      errors.surname = 'The name must only contain letters and spaces';
    } else if (form.surname.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.surname = 'The name is too long. Maximum length is 50 characters.';
    }    
    
    if (!form.nationality) {
      errors.nationality = 'Insert a valid nationality';
    } else if (!/^[a-zA-Z\s]+$/.test(form.nationality)) {
      errors.nationality = 'The nationality must only contain letters and spaces';
    } else if (form.nationality.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.nationality = 'The name is too long. Maximum length is 50 characters.';
    } 

    if (!form.description) {
      errors.description = 'Insert a valid description'
    } else if (form.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    if (!form.image) {
      errors.image = 'Insert a date of birth'
    } else if (!form.image.startsWith('https://') && !form.image.startsWith('http://')){
       errors.image = 'Insert a valid URL image' 
    }

    if (!form.dob) {
      errors.dob = 'Insert a valid date of birth';
    } else {
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  
      // Compara la fecha de nacimiento con la fecha mínima permitida
      if (new Date(form.dob) > minDate) {
        errors.dob = 'You must be at least 18 years old.';
      }
    }

    if (!form.teams || form.teams.length === 0) {
      errors.teams = 'Select at least one team';
    } else {
      errors.teams = '';
    }
    

    return errors;
  }
  

  const handleTeamSelection = (e) => {
    const selectedTeamOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({
      ...form,
      teams: selectedTeamOptions,
    });

    setErrors({
      ...errors,
      teams: selectedTeamOptions.length === 0 ? 'Select at least one team' : '',
    });
  };

  const removeSelectedTeam = (indexToRemove) => {
    const updatedSelectedTeams = [...form.teams];
    updatedSelectedTeams.splice(indexToRemove, 1);
    setForm({
      ...form,
      teams: updatedSelectedTeams,
    });
  };
  
  return (
    <div className={style.fatherContainer}>
      <div>
        <h2 className={style.title}>Create New Driver</h2>
      </div>
      <div className={style.container}>
        <div className={style.sidebar}>
          <img src={f1} alt="Create Driver Logo" className={style.logo} /> 
        </div>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
               <div className={style.formLabel}> <label>Forename: </label></div>
                <input 
                  type="text"
                  name="forename"
                  onChange={handleInputChange}
                  value={form.forename}
                />
            </div>
              {
                errors.forename && (<p className={style.errorMessage}>{errors.forename}</p>)
              }            
             <div className={style.formGroup}>
               <div className={style.formLabel}><label className={style.formLabel}>Surname: </label></div>
                <input 
                  type="text"
                  name="surname"
                  onChange={handleInputChange}
                  value={form.surname}
                />
              </div>
              {
                errors.surname && (<p className={style.errorMessage}>{errors.surname}</p>)
              }            
              <div className={style.formGroup}>
                <div className={style.formLabel}><label>Image URL: </label></div>
                <input 
                  type="text"
                  name="image"
                  onChange={handleInputChange}
                  value={form.image}
                />
              </div>
              {
                errors.image && (<p className={style.errorMessage}>{errors.image}</p>)
              }
             <div className={style.formGroup}>
               <div className={style.formLabel}><label>Nationality: </label></div>
                <input 
                  type="text"
                  name="nationality"
                  onChange={handleInputChange}
                  value={form.nationality}
                />
              </div>
              {
                errors.nationality && (<p className={style.errorMessage}>{errors.nationality}</p>)
              } 
              <div className={style.formGroup}>
                 <div className={style.formLabel}><label>Date of Birth: </label></div>
                <input 
                  type="date"
                  name="dob"
                  onChange={handleInputChange}
                  value={form.dob}
                />
              </div>
              {
                errors.dob && (<p className={style.errorMessage}>{errors.dob}</p>)
              }              
              <div className={style.formGroup}>
              <div className={style.formLabel}><label>Description: </label></div>
                <textarea 
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  value={form.description}
                />
              </div>
              {
                errors.description && (<p className={style.errorMessage}>{errors.description}</p>)
              }    

          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label>Teams</label>
            </div>
            <select name="teams" value={form.teams} onChange={(e) => handleTeamSelection(e)} multiple>
              {allTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <span className={style.errorMessage}>{errors.teams}</span>
          </div>
          <div className={style.selectedTeams}>
          {form.teams.map((teamName, index) => (
              <div key={index} className={style.selectedTeam}>
                <span>{teamName}</span>
                <button
                  type="button"
                  className={style.removeTeamButton}
                  onClick={() => removeSelectedTeam(index)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>

          <button type="submit"className={style.button}  disabled={Object.values(errors).some((error) => error)} >Create New Driver</button>              
          </form>
        </div>  

      </div>

      {successMessage && (
        <div className={style.alertSuccess}>{successMessage}</div>
      )}
      {errorMessage && (
        <div className={style.alertError}>{errorMessage}</div>
      )}      
    </div> 

  )
}

export default CreateDriver;
