
const Driver = require('../models/Driver');

const deleteDriverHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Intentar encontrar el conductor por su ID
    const driverToDelete = await Driver.findByPk(id);

    if (!driverToDelete) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }

    // Eliminar el conductor
    await driverToDelete.destroy();

    res.status(200).json({ message: 'Conductor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar conductor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = deleteDriverHandler;
