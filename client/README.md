<div align="center">
<img src="./F1.svg" alt="" style="margin-top: 30px; width: 300px;" />
</div><br />

# DRIVERS - SINGLE PAGE APPLICATION - REST API

##  Tecnologías usadas: 

**Javascript**, **React**, **Redux**, **Nodejs**, **Express**, **PostgresSQL** y **Sequelize**.
<br />

---
## **📖 ENUNCIADO GENERAL**

Este proyecto usa una REST API para 

-  Buscar corredores de Formula 1.
-  Visualizar la información de los mismos.
-  Utilizar Filtos combinados con ordenamiento.
-  Ingresar nuevos corredores de F1.

### **🖱 FRONT-END**

**📍 LANDING PAGE |** La aplicación comienza con una landing que llevará a la **`home page`**.
  
![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/landing.png)

<br />

**📍 HOME PAGE |** La página principal mostrará los corredores que existen en la API:

![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/homepage.png)

En la parte inferior se verá el paginado de la homepage, que muestra 9 corredores por página:

![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/paginado.png)

SearchBar: un input de búsqueda para encontrar corredores por nombre.

![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/busqueda.png)

Una barra para filtrar y ordenar a los corredores.

![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/filtrado.png)

<br />

**📍 DETAIL PAGE |** Esta página muestra la información específica de un corredor:

-  Forename and surname.
-  Nationality.
-  Date of Birth.
-  Description.
-  Teams.
-  Id.

![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/detail.png)


<br />

**📍 FORM PAGE |**: en esta vista se encontrará el formulario para ingresar un nuevo corredor.

Este formulario **tiene sus ingresos validados completamente con JavaScript**.

-  Forename.
-  Surname.
-  Image URL.
-  Nationality.
-  Date of Birth.
-  Descritption.
-  Teams.
-  Create new driver.

![image](https://github.com/MoniMcI/pi-drivers/blob/main/client/src/assets/createdriver.png)

<br />

---

