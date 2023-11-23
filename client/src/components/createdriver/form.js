import axios from 'axios';
import { useState, useEffect } from "react";
import style from "./CreateDriver.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/actions";
import f1 from "../../assets/f1-createdriver.png";


function CreateDriver() {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.teams);
  const [selectedTeams, setSelectedTeams] = useState([]);

  

  useEffect(() => {
    if (allTeams.length === 0) {
      dispatch(getTeams());
    }
  }, [dispatch, allTeams.length]);

  const [input, setInput] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: "",
  });

  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validate = (fieldName, value) => {
    const newErrors = { ...errors };
  
    if (fieldName === "forename") {
      const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
      if (!value || value.trim() === "") {
        newErrors[fieldName] = "Forename is required";
      } else if (!nameRegex.test(value)) {
        newErrors[fieldName] = "Invalid characters in the forename";
      } else {
        newErrors[fieldName] = "";
      }
    }

 
    const isValid = Object.values(newErrors).every((error) => error === "");
    setErrors(newErrors);
  console.log("newerrors: ", newErrors);
    
    setIsFormValid(isValid);
    console.log("isformvalid ", isFormValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
     validate();


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamsArray = input.teams;
    const driverData = {
      ...input,
      teams: teamsArray,
    };


    axios.post("https://pi-drivers.onrender.com/drivers", driverData)
      .then(response => {
        alert("New driver successfully created")
      })
      .catch(error => {
        
        if (error.response && error.response.status === 409) {
          console.error("Error en el form status:", error.response.status)
          alert("El piloto ya existe. Por favor, elija un nombre diferente.");
        } else {
          console.error("Error al guardar los datos:", error);
        }
      });
  };

  const handleTeamsChange = (e) => {
    const { name, options } = e.target;
    const selectedTeamNames = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTeamNames.push(options[i].value);
      }
    }
    setInput({
      ...input,
      [name]: selectedTeamNames.join(", "),
    });
    setSelectedTeams(selectedTeamNames);
    validate(name, selectedTeamNames.join(", "));
  };

  const renderTeamOptions = () => {
    return (
      <select name="teams" value={input.teams} onChange={handleTeamsChange} multiple>
        {allTeams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    );
  };

  const renderSelectedTeams = () => {
    return (
      <div className={style.selectedTeams}>
        {selectedTeams.map((teamName, index) => (
          <div key={index} className={style.selectedTeam}>
            <span>{teamName}</span>
            <button
              className={style.removeTeamButton}
              onClick={() => removeSelectedTeam(index)}
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
    );
  };

  const removeSelectedTeam = (index) => {
    const updatedSelectedTeams = [...selectedTeams];
    updatedSelectedTeams.splice(index, 1);
    setSelectedTeams(updatedSelectedTeams);
    setInput({
      ...input,
      teams: updatedSelectedTeams.join(", "),
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
            <div className={style.formLabel}>
              <label htmlFor="forename">Forename</label>
            </div>
            <input name="forename" value={input.forename} onChange={handleChange} />   
          </div>
          <span className={style.errorMessage}>{errors.forename}</span>  

          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="Surname">Surname</label>
            </div>              
            <input name="surname" value={input.surname} onChange={handleChange} />
          </div>
          <span className={style.errorMessage}>{errors.surname}</span>

          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="Image">Image URL</label>
            </div>
            <input name="image" value={input.image} onChange={handleChange} />
          </div>
          <span className={style.errorMessage}>{errors.image}</span>

          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="Nationality">Nationality</label>
            </div>
            <input name="nationality" value={input.nationality} onChange={handleChange} />
          </div>
          <span className={style.errorMessage}>{errors.nationality}</span>

          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="dob">Date of Birth</label>
            </div>
              <input
                type="date"
                name="dob"
                value={input.dob}
                onChange={handleChange}
              />
          </div>
          <span className={style.errorMessage}>{errors.dob}</span>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="description">Description</label>
            </div>
            <textarea
              name="description"
              value={input.description}
              onChange={handleChange}
            />
          </div>
          <span className={style.errorMessage}>{errors.description}</span>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="teams">Teams</label>
            </div>
              {renderTeamOptions()}
          </div>
          <span className={style.errorMessage}>{errors.teams}</span>
          {renderSelectedTeams()}

          <button
            type="submit"
            className={`${style.submitButton} ${!isFormValid ? style.disabledButton : ""}`}
            disabled={!isFormValid}
          >
            Submit
          </button>
            {console.log("DISABLED NOT:", !isFormValid)}

        </form>
      </div>
    </div>
  </div>
  );
}

export default CreateDriver;




import axios from 'axios';
import { useState, useEffect } from "react";
import style from "./CreateDriver.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions/actions";
import f1 from "../../assets/f1-createdriver.png";


function CreateDriver() {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.teams);
  const [selectedTeams, setSelectedTeams] = useState([]);
  

  useEffect(() => {
    if (allTeams.length === 0) {
      dispatch(getTeams());
    }
  }, [dispatch, allTeams.length]);

  const [input, setInput] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: "",
  });

  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: "",
  });



  const validate = (input, name) => {

    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;


    if(name==="forename"){
      if(input.forename==="") setErrors({...errors, forename:"Forename is required"})
      else if(input.forename.length>=10) setErrors({...errors, forename: "Forename too long"})
      else if(!nameRegex.test(input.forename)) setErrors({...errors, forename: "Invalid characters"})
      else setErrors({...errors, forename:""})
    }
    if(name==="surname"){
      if(input.surname==="") setErrors({...errors, surname:"Surname is required"})
      else if(input.surname.length>=10) setErrors({...errors, surname: "Surname too long"})
      else if(!nameRegex.test(input.surname)) setErrors({...errors, surname: "Invalid characters"})
      else setErrors({...errors, surname:""})
    }
    if(name==="nationality"){
      if(input.nationality==="") setErrors({...errors, nationality:"Nationality is required"})
      else if(input.nationality.length>=10) setErrors({...errors, nationality: "Nationality too long"})
      else if(!nameRegex.test(input.nationality)) setErrors({...errors, nationality: "Invalid characters"})
      else setErrors({...errors, nationality:""})
    }      
    if(name==="description"){
      if(input.description==="") setErrors({...errors, description:"Description is required"})
      else if(input.description.length<=10) setErrors({...errors, description: "Description too short"})
      else setErrors({...errors, description:""})
    }   
    if(name==="dob"){
      if(input.dob==="") setErrors({...errors, dob:"Date is required"})
      if(!dateRegex.test(input.dob)) setErrors({...errors, dob: "Invalid characters"})
      else setErrors({...errors, dob:""})
    }     
    if (name === "image") {
      if (input.image === "") setErrors({ ...errors, image: "Image URL is required" });
      else if (!urlRegex.test(input.image)) setErrors({ ...errors, image: "Invalid image URL format" });
      else setErrors({ ...errors, image: "" });
    }  


 
  };

  const handleChange = (event) => {
    event.preventDefault()

    if(event.target.name === "teams"){
      const selectedTeamNames = [];
      for (let i = 0; i < event.target.options.length; i++) {
        if (event.target.options[i].selected) {
          selectedTeamNames.push(event.target.options[i].value);
        }
      }
     
      setInput({
        ...input,
        [event.target.name]: selectedTeamNames.join(", "),
      });
      return
    }
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    
    validate(
      {
      ...input,
      [event.target.name]: event.target.value},
      event.target.name
    )
  };

  const removeSelectedTeam = (index) => {
    const updatedSelectedTeams = [...selectedTeams];
    updatedSelectedTeams.splice(index, 1);
    setSelectedTeams(updatedSelectedTeams);
    setInput({
      ...input,
      teams: updatedSelectedTeams.join(", "),
    });
  };



 const handleSubmit = (event) => {
    event.preventDefault();
    const teamsArray = input.teams;
    const driverData = {
      ...input,
      teams: teamsArray,
};

    axios.post("https://pi-drivers.onrender.com/drivers", driverData)
      .then(response => {
        alert("New driver saved correctly")
      })
      .catch(error => {
        alert("Error: Driver could not be saved")
      });
  };



  return (
    <div className={style.fatherContainer}>
      {console.log(input)}
      {console.log("Errors:", errors)}
    <div>
      <h2 className={style.title}>Create New Driver</h2>
    </div>
    <div className={style.container}>
      <div className={style.sidebar}>
        <img src={f1} alt="Create Driver Logo" className={style.logo} /> 
      </div>
      <div className={style.formContainer}>   

      {/* /// form */}   
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label>Forename</label>
            </div>
            <input type="text" name="forename" value={input.forename} onChange={handleChange}  />
            <span className="error-message">{errors.forename}</span>
          </div>        
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label>Surname</label>
            </div>              
            <input type="text" name="surname" value={input.surname} onChange={handleChange}  />
            <span>{errors.surname}</span>
          </div>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label>Image URL</label>
            </div>
            <input type="text" name="image" value={input.image} onChange={handleChange} />
            <span>{errors.image}</span>
          </div>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label >Nationality</label>
            </div>
            <input type="text" name="nationality" value={input.nationality} onChange={handleChange}  />
            <span>{errors.nationality}</span>
          </div>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label>Date of Birth</label>
            </div>
              <input
                type="text"
                name="dob"
                value={input.dob}
                onChange={handleChange}
              />
            <span>{errors.dob}</span>
          </div>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="description">Description</label>
            </div>
            <textarea
              name="description"
              value={input.description}
              onChange={handleChange}
            />
            <span>{errors.description}</span>
          </div>
          <div className={style.formGroup}>
            <div className={style.formLabel}>
              <label htmlFor="teams">Teams</label>
            </div>
            <select name="teams" value={input.teams} onChange={handleChange} multiple>
              {allTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
              <div className={style.selectedTeams}>
                {selectedTeams.map((teamName, index) => 
                    (<div key={index} className={style.selectedTeam}><span>{teamName}</span>
                      <button className={style.removeTeamButton} onClick={() => removeSelectedTeam(index)} >
                        &#10005;
                      </button>
                     </div>
                    ))}
              </div>
            </select>            
            <span>{errors.teams}</span>
          </div>

          <div className={style.formGroup}>
          <button

          >
            Submit
          </button>
         
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default CreateDriver;
